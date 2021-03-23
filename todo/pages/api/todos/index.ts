import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const todos = Data.todo.getList();
      res.statusCode = 200;
      return res.send(todos);
    } catch (err) {
      res.statusCode = 500;
      res.send(err);
    }
  } else if (req.method === "POST") {
    const { text, color } = req.body;

    if (!text || !color) {
      res.statusCode = 400;
      return res.send("text or color is empty");
    }

    const todos = Data.todo.getList();
    let todoId: number = 1;

    if (todos.length > 0) {
      todoId = todos[todos.length - 1].id + 1;
    }

    const newTodo = {
      id: todoId,
      text,
      color,
      checked: false,
    };

    Data.todo.write([...todos, newTodo]);
    res.statusCode = 200;
    res.end();
  }

  res.statusCode = 405;
  return res.end();
};
