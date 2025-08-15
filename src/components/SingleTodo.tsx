import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/models";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const client = generateClient<Schema>();

const SingleTodo = ({ todo, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const updateTodoList = async () => {
    const result = await client.models.Todo.list();
    setTodos([]);
    result.data.sort().forEach((item) => {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: item.id, todo: item.content, isDone: item.isDone },
      ]);
    });
  };

  const handleDone = async (todo: Todo) => {
    const tmp = {
      id: todo.id,
      isDone: !todo.isDone,
    };
    await client.models.Todo.update(tmp);
    updateTodoList();
  };

  const handleDelete = async (todo: Todo) => {
    const tmp = {
      id: todo.id,
    };
    await client.models.Todo.delete(tmp);
    updateTodoList();
  };

  const handleEdit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const tmp = {
      id: id,
      content: editTodo,
    };
    await client.models.Todo.update(tmp);
    updateTodoList();
    setEdit(false);
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          className="todos__single--text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
