export const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

// TODO: Add bio-graphy
export const OPENAI_SYSTEM_MESSAGE =
  "You are a helpful assistant. Respond with short answers.";

const tools = [
    // TODO: Add tools
]

export const OPENAI_OTHER_PROPS = {
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    temperature: 0.7,
    // tool_choice: "auto"
    // tools
}