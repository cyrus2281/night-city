import { Config, Context } from "@netlify/functions";
import {
  getOpenAIResponse,
  LLM_MESSAGE,
  MAX_ALLOWED_CONVERSATION,
} from "./open-ai";

const COOKIE_KEY = "night-city-session";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
};

interface UserData {
  ip: string;
  latitude: number;
  longitude: number;
  lastTalkedAt: number;
  count: number;
}

export default async (req: Request, context: Context) => {
  function log(type = "info", ...messages) {
    const logs =
      `[${new Date().toISOString()}]` +
      `[${type.toUpperCase()}]` +
      `[${context.ip}]`;
    console.info(logs, ...messages);
  }

  if (req.method.toUpperCase() === "OPTIONS") {
    return new Response("OK", {
      headers: CORS_HEADERS,
    });
  }

  // Check method type
  if (req.method.toUpperCase() !== "POST") {
    log("error", "Invalid method");
    return new Response("Invalid method", {
      status: 405,
      headers: CORS_HEADERS,
    });
  }

  // Missing body
  if (!req.body) {
    log("error", "Invalid request body");
    return new Response("Invalid request body", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  // Validating request body (Checking for messages array)
  let messages: LLM_MESSAGE[] = [];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages");
    }
  } catch (error) {
    log("error", "Error parsing request body:", error.message);
    return new Response("Invalid request body", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  // Setting a new cookie with user data in base64 format
  const setCookie = (userData) => {
    const userDataBase64 = btoa(JSON.stringify(userData));
    context.cookies.set(COOKIE_KEY, userDataBase64);
  };

  // Fetching user data from cookie
  let userData: UserData;
  const cookie = context.cookies.get(COOKIE_KEY);
  if (cookie) {
    try {
      userData = JSON.parse(atob(cookie));
      if (
        !userData?.count ||
        !userData?.lastTalkedAt ||
        isNaN(userData.count)
      ) {
        throw new Error("Invalid user data");
      }
      userData.count += 1;
      log("info", "Returning user:", userData);
    } catch (error) {
      log("error", "Invalid user cookie, rejecting user: ", error.message);
      return new Response("Invalid user session", {
        status: 400,
        headers: CORS_HEADERS,
      });
    }
  } else {
    // User IP + GEO location + Conversation count
    userData = {
      ip: context.ip,
      latitude: context.geo.latitude,
      longitude: context.geo.longitude,
      lastTalkedAt: Date.now(),
      count: 1,
    };
    log("info", "New user", userData);
  }

  // If a calendar day has passed since the last conversation,
  // reset the conversation count. (Comparison format: YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];
  const lastTalkedDateFormatted = new Date(userData.lastTalkedAt)
    .toISOString()
    .split("T")[0];
  if (currentDate !== lastTalkedDateFormatted) {
    userData.count = 1;
  }

  // Check if user has reached the conversation limit
  const userConversationCount = userData.count;
  if (userConversationCount > MAX_ALLOWED_CONVERSATION) {
    log("error", "User reached conversation limit");
    return new Response("Conversation limit reached", {
      status: 429,
      headers: CORS_HEADERS,
    });
  }

  // Update user data cookie
  setCookie({
    ...userData,
    lastTalkedAt: Date.now(),
  });

  // User ID used for tracking the user by OpenAI
  const userId = `${userData.ip}-${userData.latitude}-${userData.longitude}`;
  const userInput = messages[messages.length - 1].content;

  try {
    // OpenAI API request
    const llmResponse = await getOpenAIResponse(
      userId,
      messages,
      userConversationCount
    );
    const responseString = JSON.stringify(llmResponse);
    log(
      "info",
      "### User Input:\n",
      userInput,
      "\n### OpenAI response:\n",
      responseString
    );
    // Return OpenAI response
    return new Response(responseString, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    log("error", "OpenAI API error", error.message);
    return new Response("Error occurred while making LLM Call", {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
};

export const config: Config = {
  path: "/api/v1/ai-chat",
};
