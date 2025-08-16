import React from "react";
import { Todo } from "../models/models";
import "./styles.css";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Array<Todo>;
  completedTodos: Array<Todo>;
  updateTodoList(): Promise<void>;
}
const TodoList: React.FC<Props> = ({
  todos,
  completedTodos,
  updateTodoList,
}) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            updateTodoList={updateTodoList}
          />
        ))}
      </div>

      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {completedTodos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            updateTodoList={updateTodoList}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
