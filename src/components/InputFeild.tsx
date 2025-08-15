import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  createTodo: (e: React.FormEvent) => void;
}

const InputFeild = ({ todo, setTodo, createTodo }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        createTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputFeild;
