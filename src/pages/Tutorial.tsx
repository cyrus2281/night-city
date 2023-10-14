import Dialog from "../components/Dialog";
import "./Page.scss";
import "./Tutorial.scss";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { LOCAL_STORAGE_KEYS } from "../experience/utils/constants";
import MarkdownRenderer from "../components/MarkdownRenderer";
import useSound from "../experience/stores/useSound";
import { GUY_AUDIOS } from "../experience/utils/guyAudios";

const TUTORIAL = [
  {
    title: "Welcome to Night-City",
    content: [
      "Welcome to the immersive world of **Night City**, where you step into the shoes of an inquisitive fox navigating a 3D futuristic cyberpunk-themed city.",
      "\nThe city is filled with hidden Easter eggs and personal references from the developer's life, **Cyrus Mobini**.",     
    ],
  },
  {
    title: "Controls",
    content: [
      "#### Using Touch/Cursor \n",
      "You can move around by `click`/`touch` and hold. Once the joystick appears, drag it around to move.\n",
      "**To sprint,** drag the joystick beyond the edge.\n",
      '**To jump,** use the mouse `right click` or the on-screen <span  translate="no" className="material-icons icon">keyboard_double_arrow_up</span> button.\n',
      "#### Using Keyboard \n",
      "You can move around using the `W` `A` `S` `D` or the `arrow` keys. \n",
      "**To sprint,** hold the `Shift` key.\n",
      "**To jump,** press the `Space` key.\n",
    ],
  },
  {
    title: "Objective",
    content: [
      "Venture deep into the heart of the city,  where you'll encounter an interactive world filled with secrets and insights into the creator's life. \n",
      "Meet GUY, the annoying character who acts as your guide, telling you about locations and occasionally making funny comments.\n",
      "You can simply sit back, enjoy, and explore the world, or you can attempt to complete the **secret mission** in the game by discovering all the locations and special audio cues. Once completed, you'll unlock a special features within the game.",
    ],
  },
];

const IOS_RESTRICTIONS = {
  title: "iOS Restrictions",
  content: [
    'iOS 14+ devices require user interaction to allow the browser to play an audio. <a target="_blank" href="https://webkit.org/blog/13862/the-user-activation-api/">Article on this</a>.\n',
    "This means that GUY's audio might not automatically play for you.\n",
    `If this is the case, you'll see the icon <span  translate="no" className="material-icons icon">record_voice_over</span> on the screen. Simply release joystick (if holding) and press on the icon to play the audio. \n`,
    "The icon would automatically disappear after a few seconds.",
  ],
};

// Adding to Tutorial if browser is IOS
if (navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i)) {
  TUTORIAL.push(IOS_RESTRICTIONS);
}

const NUM_PAGES = TUTORIAL.length;

const SHOULD_SHOW_TUTORIAL =
  localStorage.getItem(LOCAL_STORAGE_KEYS.SHOW_TUTORIAL) !== "false";

function Tutorial() {
  const playSound = useSound((state) => state.playSound);
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
        Skip
      </Button>
    );
  }

  useEffect(() => {
    if (SHOULD_SHOW_TUTORIAL && !visibility) {
      setTimeout(() => {
        playSound(GUY_AUDIOS.WELCOME);
      }, 1000);
    }
  }, [visibility]);

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
            {TUTORIAL.map((page, i) => (
              <div
                className="tutorial-page"
                style={{ left: 100 * (i - pageNum) + "%" }}
                key={`tutorial-page-${i}`}
              >
                <div className="tutorial-page-header">{page.title}</div>
                <MarkdownRenderer
                  markdown={page.content.join("\n")}
                  className="tutorial-page-content"
                />
              </div>
            ))}
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
