import { Config, Context } from "@netlify/functions";
import {
  OPENAI_OTHER_PROPS,
  OPENAI_SYSTEM_MESSAGE,
  OPENAI_URL,
} from "./open-ai";

const COOKIE_KEY = "night-city-session";
const MAX_ALLOWED_CONVERSATION = 10;
const OPENAI_API_KEY = Netlify.env.get("OPENAI_API_KEY");

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

  // Check method type
  if (req.method.toUpperCase() !== "POST") {
    log("error", "Invalid method");
    return new Response("Invalid method", { status: 405 });
  }

  // Missing body
  if (!req.body) {
    log("error", "Invalid request body");
    return new Response("Invalid request body", { status: 400 });
  }

  // Check for OpenAI API key
  if (!OPENAI_API_KEY) {
    log("error", "OpenAI API key not found");
    return new Response("Missing sever configuration, please try again later", {
      status: 500,
    });
  }

  // Validating request body (Checking for messages array)
  let messages: { content: string; role: string }[] = [];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages");
    }
  } catch (error) {
    log("error", "Error parsing request body:", error.message);
    return new Response("Invalid request body", { status: 400 });
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
      return new Response("Invalid user session", { status: 400 });
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
    return new Response("Conversation limit reached", { status: 429 });
  }

  // Update user data cookie
  setCookie({
    ...userData,
    lastTalkedAt: Date.now(),
  });

  // User ID used for tracking the user by OpenAI
  const userId = `${userData.ip}-${userData.latitude}-${userData.longitude}`;

  try {
    // OpenAI API request
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        ...OPENAI_OTHER_PROPS,
        user: userId,
        messages: [
          {
            role: "system",
            content: OPENAI_SYSTEM_MESSAGE,
          },
          ...messages,
        ],
      }),
    });

    // OpenAI API response
    const data = await response.json();
    const llmAnswer = data.choices[0].message;
    log(
      "info",
      "User Input:",
      messages[messages.length - 1].content,
      "- OpenAI response:",
      llmAnswer
    );
    // Return OpenAI response
    return new Response(JSON.stringify({ message: llmAnswer }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    log("error", "OpenAI API error", error.message);
    return new Response("Error occurred while making LLM Call", {
      status: 500,
    });
  }
};

export const config: Config = {
  path: "/api/v1/ai-chat",
};
