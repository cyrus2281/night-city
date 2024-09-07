import React, { useEffect, useState, useRef } from "react";
import Button from "./Button";
import "./TextInput.scss";
import { button } from "leva";

function TextInput({
  onSend,
  maxLength = 100,
  type = "text",
  placeholder = "Start typing...",
  className = "",
  buttonText = "Ask!",
}: {
  onSend: (value: string) => void;
  maxLength?: number;
  type?: string;
  placeholder?: string;
  className?: string;
  buttonText?: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={"text-input-wrapper" + className}>
      <input
        className="text-input"
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
      />
      <Button onClick={handleSendClick} uppercase type="submit">
        {buttonText}
      </Button>
    </div>
  );
}

export default TextInput;
