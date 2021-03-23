import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "장보기1", color: "red", checked: false },
  { id: 2, text: "장보기2", color: "orange", checked: true },
  { id: 3, text: "장보기3", color: "yellow", checked: false },
  { id: 4, text: "장보기4", color: "green", checked: false },
  { id: 5, text: "장보기5", color: "navy", checked: false },
];

const index: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default index;
