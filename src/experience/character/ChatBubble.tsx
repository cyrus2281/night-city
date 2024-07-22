import { useEffect, useRef, useState } from "react";
import { ASSETS } from "../utils/constants";
import { Float, useGLTF } from "@react-three/drei";

function ChatBubble({ isWalking = false }: { isWalking: boolean }) {
  const chatBounceRef = useRef<NodeJS.Timeout>();
  const chatButton = useGLTF(ASSETS.MODELS.INFO);
  const [showChat, setShowChat] = useState(!isWalking);

  // TODO: Show chat on close proximity and wave

  useEffect(() => {
    setShowChat(!isWalking);
  }, [isWalking]);

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
