import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import "./Page.scss";

function ContactHeader() {
  return (
    <div className="page-header">Send a Letter</div>
  );
}

function Contact({ worldPath }: { worldPath: string }) {
  const navigate = useNavigate();

  const closePage = () => {
    navigate(worldPath, { replace: true });
  };

  return (
    <>
      <Dialog visibility header={<ContactHeader />} onClose={closePage}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <textarea placeholder="Message" />
      </Dialog>
    </>
  );
}

export default Contact;
