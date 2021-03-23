import { readFileSync, writeFileSync } from "fs";
import { TodoType } from "../../types/todo";

const getList = () => {
  const todosBuffer = readFileSync("./data/todos.json");
  const todosString = todosBuffer.toString();

  if (!todosString) {
    return [];
  }

  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
};

const exists = ({ id }: { id: number }) => {
  const todos = getList();
  const todo = todos.some((todo) => todo.id === id);
  return todo;
};

const write = (todos: TodoType[]) => {
  writeFileSync("./data/todos.json", JSON.stringify(todos));
};

export default { getList, exists, write };
