import { get } from "http";

const OPENAI_API_KEY = Netlify.env.get("OPENAI_API_KEY");

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const MAX_JSON_ATTEMPTS = 3;

export const MAX_ALLOWED_CONVERSATION = 10;

const REQUIRED_JSON_KEYS = {
  response: "The response to the user query",
  action: "The physical action to be performed by the assistant",
};

const actions = {
  SAY_NO: "Perform a head shake indicating no",
  SAY_YES: "Perform a head nod indicating yes",
  THUMBS_UP: "Perform a thumbs up gesture",
  WAVE: "Waves hand at the user",
  WALK_AWAY:
    "Walks away from the user, ONLY to be used as the last action or if the user asks something inappropriate.",
};

// TODO: Add bio-graphy
const OPENAI_SYSTEM_MESSAGE = `You are a helpful assistant. Respond with short answers.

Respond only in a json format with the following keys:
${Object.entries(REQUIRED_JSON_KEYS)
  .map(([key, value]) => `  - ${key}: ${value}`)
  .join("\n")}

Action can be one of the following:
${Object.entries(actions)
  .map(([key, value]) => `  - ${key}: ${value}`)
  .join("\n")}
`;

const OPENAI_OTHER_PROPS = {
  model: "gpt-4o-mini",
  max_tokens: 150,
  temperature: 0.7,
};

export interface LLM_MESSAGE {
  role: "user" | "assistant" | "system";
  content: string;
}

const getUserMessageQuery = (
  user_message: string,
  lastMessage: boolean
): string => {
  let affix = "";
  if (lastMessage) {
    affix =
      '\nThis is the last message you can send. Respond in a way to end the conversation, and select "WALK_AWAY" for the action.';
  }
  return `Here's the user message:
<user-message>
${user_message}
</user-message>

Respond only in a json format with the following keys:
  - ${Object.keys(REQUIRED_JSON_KEYS).join("\n  - ")}
${affix}
`;
};

const getMessages = (
  message_history: LLM_MESSAGE[],
  userConversationCount: number
) => {
  const lastMessage = message_history[message_history.length - 1];
  if (lastMessage.role !== "user") {
    throw new Error("Last message is not from the user");
  }

  // Update the last message by reference
  lastMessage.content = getUserMessageQuery(
    lastMessage.content,
    userConversationCount + 1 > MAX_ALLOWED_CONVERSATION
  );

  const messages: LLM_MESSAGE[] = [
    {
      role: "system",
      content: OPENAI_SYSTEM_MESSAGE,
    },
    ...message_history,
  ];

  return messages;
};

/**
 * Parse JSON out of AI generated response
 * @param text AI generated response
 * @param requiredKeys required keys in the response
 * @returns Parsed response or Null if the response is not valid JSON or does not contain the required keys
 */
const parseResponse = (text: string, requiredKeys: string[]) => {
  text = text.trim();
  try {
    const parsedText = JSON.parse(text);
    if (requiredKeys.every((key) => key in parsedText)) {
      return parsedText;
    }
  } catch {
    const splittedText = text.split("```");
    if (splittedText.length === 3) {
      let parsedText = JSON.parse(splittedText[1]);
      if (parsedText.startsWith("json")) {
        parsedText = parsedText.substring(4);
        return parseResponse(parsedText, requiredKeys);
      }
    }
  }
  return null;
};

/**
 * Get response from OpenAI API and parse it
 * @param userId User ID
 * @param messages Messages to send to OpenAI API
 * @param attempt Number of attempts
 * @returns parsed OpenAI response
 */
export const getOpenAIResponse = async (
  user: string,
  message_history: LLM_MESSAGE[],
  userConversationCount: number,
  attempt = 0
): Promise<{ [key: string]: string }> => {
  // Check for OpenAI API key
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not found");
  }

  const messages = getMessages(message_history, userConversationCount);

  // OpenAI API request
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      ...OPENAI_OTHER_PROPS,
      user,
      messages,
    }),
  });

  // OpenAI API response
  const data = await response.json();
  const llmAnswer = data?.choices[0]?.message?.content;

  if (!llmAnswer) {
    throw new Error("Failed to fetch response from OpenAI");
  }

  // Parse the response
  const parsedResponse = parseResponse(
    llmAnswer,
    Object.keys(REQUIRED_JSON_KEYS)
  );
  if (parsedResponse) {
    return parsedResponse;
  }

  // Retry if the response is not valid JSON
  if (attempt < MAX_JSON_ATTEMPTS) {
    return getOpenAIResponse(
      user,
      messages,
      userConversationCount,
      attempt + 1
    );
  }

  throw new Error("Failed to fetch proper response from OpenAI");
};