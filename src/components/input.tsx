import React, { useState } from "react";
import pikachu from "./../assets/pikachu-left.png";

interface InputProps {
  onSendMessage: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    onSendMessage(text);
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Press enter or click on Pikachu to send your message"
          autoFocus={true}
        />
      <button>
        <img src={pikachu} alt="pikachu"/>
      </button>
      </form>
    </div>
  );
};

export default Input;