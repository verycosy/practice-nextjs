import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todos";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";

const index: NextPage = () => {
  return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));

      return { props: {} };
    } catch (err) {
      return { props: {} };
    }
  }
);

export default index;
