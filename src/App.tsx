import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import "./App.css";
import { Todo } from "./models/models";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";

const client = generateClient<Schema>();

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    updateTodoList();
  }, []);

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      await client.models.Todo.create({ content: todo, isDone: false });
      updateTodoList();
      setTodo("");
    }
  };

  const updateTodoList = async () => {
    const result = await client.models.Todo.list();
    setTodos([]);
    setCompletedTodos([]);
    result.data.forEach((item) => {
      if (!item.isDone) {
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: item.id, todo: item.content, isDone: item.isDone },
        ]);
      } else {
        setCompletedTodos((prevTodos) => [
          ...prevTodos,
          { id: item.id, todo: item.content, isDone: item.isDone },
        ]);
      }
    });
  };

  return (
    <div className="App">
      <span className="heading">
        {user?.signInDetails?.loginId}'s To Do List
      </span>
      <InputFeild todo={todo} setTodo={setTodo} createTodo={createTodo} />
      <TodoList
        todos={todos}
        completedTodos={completedTodos}
        updateTodoList={updateTodoList}
      />
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default App;
