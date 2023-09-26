import { ReactNode, useEffect, useRef, useState } from "react";
import "./Dialog.scss";
import Button from "./Button";

function Dialog({
  visibility = false,
  addDefaultButton = true,
  closeOnDrop = false,
  defaultButtonText = "close",
  defaultButtonLocation = "right",
  leftButtons,
  rightButtons,
  header,
  children,
  onClose,
}: {
  header?: ReactNode;
  visibility?: boolean;
  leftButtons?: ReactNode[];
  rightButtons?: ReactNode[];
  addDefaultButton?: boolean;
  closeOnDrop?: boolean;
  defaultButtonText?: string;
  defaultButtonLocation?: "left" | "right";
  children: ReactNode;
  onClose?: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(visibility);
  const [renderDialog, setRenderDialog] = useState(visibility);

  useEffect(() => {
    setShow(visibility);
  }, [visibility]);

  useEffect(() => {
    if (dialogRef.current && closeOnDrop) {
      dialogRef.current.addEventListener("click", (e) => {
        if (e.target === dialogRef.current) {
          setShow(false);
        }
      });
    }
  }, [dialogRef, closeOnDrop]);

  useEffect(() => {
    if (dialogRef.current) {
      if (show) {
        setRenderDialog(true);
      } else {
        dialogRef.current.classList.add("closing");
        setTimeout(() => {
          dialogRef.current?.classList.remove("closing");
          setRenderDialog(false);
          onClose && onClose();
        }, 600);
      }
    }
  }, [show]);

  if (addDefaultButton) {
    const defaultButton = (
      <Button onClick={() => setShow(false)} uppercase key="default-btn">
        {defaultButtonText}
      </Button>
    );
    if (defaultButtonLocation === "right") {
      rightButtons = rightButtons || [];
      rightButtons.unshift(defaultButton);
    } else {
      leftButtons = leftButtons || [];
      leftButtons.unshift(defaultButton);
    }
  }

  return !renderDialog ? null : (
    <div ref={dialogRef} className="dialog">
      <div className="dialog-content">
        {header && <div className="dialog-content-header">{header}</div>}
        <div className="dialog-content-inner">{children}</div>
        {(leftButtons || rightButtons) && (
          <div className="dialog-content-footer">
            <div>{leftButtons && leftButtons}</div>
            <div>{rightButtons && rightButtons}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dialog;
