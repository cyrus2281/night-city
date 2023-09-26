import Dialog from "../components/Dialog";
import "./Page.scss";
import "./Tutorial.scss";
import { useState } from "react";
import Button from "../components/Button";
import useGlobal from "../experience/stores/useGlobal";
import { LOCAL_STORAGE_KEYS } from "../experience/utils/constants";

// Dummy git copilot stuff
const TUTORIAL = [
  {
    title: "Welcome to Night-City",
    content: [
      "Night-City is a place where you can send letters to your friends and family. You can also receive letters from your friends and family.",
      "You can send letters to anyone, but you can only receive letters from people who have your address."
    ]
  },
  {
    title: "Your Address",
    content: [
      "Your address is a unique identifier that you can share with your friends and family. You can find your address in the top right corner of the screen.",
      "You can share your address with anyone you want to receive letters from."
    ]
  },
  {
    title: "Send a Letter",
    content: [
      "To send a letter, click the 'Send a Letter' button in the top right corner of the screen.",
      "Enter the address of the person you want to send a letter to, and then write your letter.",
      "When you're done, click the 'Send' button to send your letter."
    ]
  }
]

const NUM_PAGES = TUTORIAL.length;

const SHOULD_SHOW_TUTORIAL =
  localStorage.getItem(LOCAL_STORAGE_KEYS.SHOW_TUTORIAL) !== "false";
function Tutorial() {
  const isTrueFan = useGlobal((state) => state.isTrueFan);
  const [showAgain, setShowAgain] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [visibility, setVisibility] = useState(SHOULD_SHOW_TUTORIAL);

  const onClose = () => {
    setVisibility(false);
    localStorage.setItem(LOCAL_STORAGE_KEYS.SHOW_TUTORIAL, String(showAgain));
  };

  const onNextAction = () => {
    if (pageNum < NUM_PAGES - 1) {
      setPageNum(pageNum + 1);
    } else {
      onClose();
    }
  };

  const rightButtons = [
    <Button key="action-btn" neon uppercase onClick={onNextAction}>
      {pageNum < NUM_PAGES - 1 ? "Next" : "Done"}
    </Button>,
  ];
  if (pageNum < NUM_PAGES - 1) {
    rightButtons.unshift(
      <Button key="skip-btn" uppercase onClick={onClose}>
        {" "}
        Skip{" "}
      </Button>
    );
  }

  return (
    <>
      <Dialog
        visibility={visibility}
        addDefaultButton={false}
        header={<div className="page-header">Night-City Tutorial</div>}
        rightButtons={rightButtons}
        leftButtons={[
          <input
            key="do_not_show_again_checkbox"
            type="checkbox"
            id="do_not_show_again"
            checked={!showAgain}
            onChange={(e) => setShowAgain(!e.target.checked)}
          />,
          <label key="do_not_show_again_label" htmlFor="do_not_show_again">
            Don't show again
          </label>,
        ]}
      >
        <div className="tutorial">
          <div className="tutorial-content">
            {
              TUTORIAL.map((page, i) => (
                <div className="tutorial-page" style={{left: (100 * (i - pageNum)) + "%"}}>
                  <div className="tutorial-page-header">{page.title}</div>
                  <div className="tutorial-page-content">
                    {page.content.map((p) => <p>{p}</p>)}
                  </div>
                </div>
              ))
            }
          </div>
        <div className="tutorial-indicators">
          {Array(NUM_PAGES)
            .fill(0)
            .map((_, i) => (
              <div
                key={`tutorial-indicator-${i}`}
                className={`tutorial-indicator ${
                  i === pageNum ? "active" : ""
                }`}
                onClick={() => setPageNum(i)}
              />
            ))}
        </div>
        </div>
      </Dialog>
    </>
  );
}

export default Tutorial;
