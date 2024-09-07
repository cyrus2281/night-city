import useGlobal from "../../stores/useGlobal";
import TextInput from "../../../components/TextInput";
import "./ChatInputInterface.scss";
import { ROBOT_NAME } from "../../utils/constants";
import Dialog from "../../../components/Dialog";

function ChatInputInterface() {
  const callback = useGlobal((state) => state.chatInputCallback);

  if (!callback) {
    return null;
  }

  return (
    <Dialog
      visibility={true}
      closeOnDrop
      contentClass="chat-input-interface-dialog"
      addDefaultButton={false}
      onClose={() => callback(null)}
    >
      <div className="chat-input-interface">
        <h3 className="chat-input-interface-title">
          Ask something from {ROBOT_NAME}
        </h3>
        <TextInput onSend={callback} />
      </div>
    </Dialog>
  );

}

export default ChatInputInterface;
