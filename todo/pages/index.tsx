import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todos";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";
import { TodoType } from "../types/todo";

interface IProps {
  todos: TodoType[];
}

const index: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));

      return { props: { todos: data } };
    } catch (err) {
      return { props: { todos: [] } };
    }
  }
);

export default index;
