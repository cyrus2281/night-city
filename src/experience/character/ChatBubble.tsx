import { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import {
  ASSETS,
  CHAT_HISTORY_MAX_LENGTH,
  DEFAULT_CHAT_ERROR_MESSAGE,
  LOCAL_STORAGE_KEYS,
  MAX_CLICKABLE_DISTANCE,
} from "../utils/constants";
import { LLM_MESSAGE } from "../utils/interfaces";
import useGlobal from "../stores/useGlobal";
import useSound from "../stores/useSound";
import { askAiChat } from "../utils/utils";

function ChatBubble({ setAction }: { setAction: (action: string) => void }) {
  const activateChatInput = useGlobal((state) => state.activateChatInput);
  const showSubtitle = useSound((state) => state.showSubtitle);
  const chatBounceRef = useRef<NodeJS.Timeout>();
  const chatButton = useGLTF(ASSETS.MODELS.INFO);
  const [showChat, setShowChat] = useState(true);

  const onMessageSent = async (newMessage: string | null) => {
    if (!newMessage) {
      setShowChat(true);
      return;
    }

    let history: LLM_MESSAGE[] = [];
    try {
      // Load Message history from local storage
      history = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_HISTORY) || "[]"
      );
      if (history.length > CHAT_HISTORY_MAX_LENGTH) {
        // Remove older messages
        history = history.slice(history.length - CHAT_HISTORY_MAX_LENGTH);
      }
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
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CHAT_HISTORY,
        JSON.stringify(history)
      );
      if (response.action !== "WALK_AWAY") {
        setShowChat(true);
        setAction(response.action);
      } else {
        // Walk away after 2 seconds
        // Can't continue conversation after walking away
        setTimeout(() => setAction(response.action), 2000);
      }
      const duration = (2 + response.response.split(" ").length * 0.5) * 1000;
      showSubtitle(response.response, duration, "bright");
    } catch (error) {
      console.error("Failed to send message", error);
      setAction("WALK_AWAY");
      showSubtitle(DEFAULT_CHAT_ERROR_MESSAGE, 3000, "bright");
      setShowChat(false);
    }
  };

  if (showChat)
    return (
      <Float floatingRange={[0.1, 0.05]} rotationIntensity={0.5} speed={5}>
        <primitive
          name="chatButton"
          object={chatButton.scene}
          scale={[2, 2, 2]}
          rotation={[0, Math.PI / 2, 0]}
          position={[0, 2.7, 0]}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            if (e.distance < MAX_CLICKABLE_DISTANCE) {
              clearTimeout(chatBounceRef.current);
              chatBounceRef.current = setTimeout(() => {
                setShowChat(false);
                activateChatInput(onMessageSent);
              }, 100);
            }
          }}
        />
      </Float>
    );
  else return null;
}

useGLTF.preload(ASSETS.MODELS.INFO);

export default ChatBubble;
