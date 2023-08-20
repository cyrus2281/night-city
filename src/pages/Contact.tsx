import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import "./Page.scss";
import "./Contact.scss";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { sendEmail } from "../experience/utils/utils";
import useSound from "../experience/stores/useSound";
import { GUY_AUDIOS } from "../experience/utils/guyAudios";
import useGlobal from "../experience/stores/useGlobal";

const emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

enum ContactSubject {
  QUESTION = "question",
  FEEDBACK = "feedback",
  BUG = "bug",
  FAN = "fan",
}

function ContactHeader() {
  return <div className="page-header">Send a Letter</div>;
}

let failedMessage: { [name: string]: string } = {
  name: "",
  message: "",
  subject: "",
  email: "",
};

function Contact({ worldPath }: { worldPath: string }) {
  const playSound = useSound((state) => state.playSound);
  const isTrueFan = useGlobal((state) => state.isTrueFan);
  const navigate = useNavigate();
  const [name, setName] = useState(failedMessage.name);
  const [email, setEmail] = useState(failedMessage.email);
  const [message, setMessage] = useState(failedMessage.message);
  const [subject, setSubject] = useState(failedMessage.subject);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  useEffect(() => {
    failedMessage = {
      name: "",
      message: "",
      subject: "",
      email: "",
    };
  }, []);

  const closePage = () => {
    navigate(worldPath, { replace: true });
  };

  const sendMail = () => {    
    const errors = {
      name: name === "",
      email: email === "" || !emailRegex.test(email),
      subject:
        subject === "" ||
        !Object.values(ContactSubject).includes(subject as ContactSubject) ||
        (subject === ContactSubject.FAN && !isTrueFan),
      message: message === "",
    };
    setErrors(errors);
    if (errors.name || errors.email || errors.subject || errors.message) return;

    sendEmail({
      name,
      email,
      userSubject: subject,
      subject: `Night-City: Contact Form`,
      message,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Email failed:" + res.statusText);
        }
        playSound(GUY_AUDIOS.MAIL_SENT);
      })
      .catch((er) => {
        failedMessage.name = name;
        failedMessage.email = email;
        failedMessage.message = message;
        failedMessage.subject = subject;
        playSound(GUY_AUDIOS.MAIL_FAILED);
        console.error("Email failed:", er);
      })
      .finally(closePage);
  };

  return (
    <>
      <Dialog
        visibility
        defaultButtonLocation="left"
        defaultButtonText="cancel"
        header={<ContactHeader />}
        onClose={closePage}
        rightButtons={[
          <Button neon onClick={sendMail} uppercase key="send-btn">
            Mail Letter
          </Button>,
        ]}
      >
        <div className="mail">
          <div className="mail-top">
            <div className="mail-top-contents mail-top-from">
              <p className="mail-header">FROM</p>
              <input
                type="text"
                className="mail-input empty"
                placeholder="your name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                data-empty={name === ""}
                data-error={errors.name}
              />
              <input
                type="email"
                name="email"
                className="mail-input"
                placeholder="your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                data-empty={email === ""}
                data-error={errors.email}
              />
            </div>
            <div className="mail-top-contents mail-top-to">
              <p className="mail-header">TO</p>
              <p className="mail-body">Developer</p>
              <p className="mail-body">At Night City</p>
            </div>
          </div>
          <div className="mail-middle">
            <select
              name="subject"
              className="mail-input mail-subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              data-empty={subject === ""}
              data-error={errors.subject}
            >
              <option value="" disabled>
                Select a subject
              </option>
              <option value={ContactSubject.QUESTION}>Have a question</option>
              <option value={ContactSubject.FEEDBACK}>Have a feedback</option>
              <option value={ContactSubject.BUG}>Reporting a bug</option>
              {isTrueFan && (
                <option value={ContactSubject.FAN}>I'm a fan</option>
              )}
            </select>
          </div>
          <div className="mail-bottom">
            <textarea
              className="mail-message"
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              data-empty={message === ""}
              data-error={errors.message}
              rows={10}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Contact;
