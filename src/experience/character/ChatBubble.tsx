import { useEffect, useRef, useState } from "react";
import { ASSETS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { Float, useGLTF } from "@react-three/drei";
import { LLM_MESSAGE } from "../utils/interfaces";
import { askAiChat } from "../utils/utils";

function ChatBubble({ setAction }: { setAction: (action: string) => void }) {
  const chatBounceRef = useRef<NodeJS.Timeout>();
  const chatButton = useGLTF(ASSETS.MODELS.INFO);
  const [showChat, setShowChat] = useState(true);

  const onMessageSent = async (newMessage: string) => {
    let history: LLM_MESSAGE[] = [];
    try {
      // Load Message history from local storage
      history = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_HISTORY) || "[]"
      );
    } catch {
      // No valid history
      history = [];
    }

    // Add new message to history
    history.push({ role: "user", content: newMessage });

    try {
      const response = await askAiChat(history);
      // Update history
      history.push({ role: "assistant", content: response.response });
      localStorage.setItem(LOCAL_STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
      setAction(response.action)

      // TODO: Add message to GUI
      console.log("Message sent", response);
      
    } catch (error) {
      console.error("Failed to send message", error);
      setAction("WALK_AWAY");
      setShowChat(false);
    }
  };

  window.msg = onMessageSent

  if (showChat)
    return (
      <Float floatingRange={[0.1, 0.05]} rotationIntensity={0.5} speed={5}>
        <primitive
          name="chatButton"
          object={chatButton.scene}
          scale={[2, 2, 2]}
          rotation={[0, Math.PI / 2, 0]}
          position={[0, 2.7, 0]}
          onPointerDown={() => {
            clearTimeout(chatBounceRef.current);
            chatBounceRef.current = setTimeout(() => {
              setShowChat(false);
              const doneFn = () => setShowChat(true);
              // TODO: Open chat
              console.log("Chat button clicked");
              doneFn();
            }, 100);
          }}
        />
      </Float>
    );
  else return null;
}

useGLTF.preload(ASSETS.MODELS.INFO);

export default ChatBubble;
