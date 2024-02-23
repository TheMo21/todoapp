import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import mongoose from "mongoose";
import { Todo } from "@/model/todos";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { TodoModel } = await connect();
  try {
    //get all items from db
    if (req.method === "GET") {
      const items = await TodoModel.find();
      res.json(items);

      //create new task with name, description and competed
    } else if (req.method === "POST") {
      console.log(`posted ${req.body}`);
      const newTask = JSON.parse(req.body);
      res.json(await TodoModel.create(newTask));

      //Delete item from db
    } else if (req.method === "DELETE") {
      const idData = JSON.parse(req.body);
      res.json(await TodoModel.deleteOne({ _id: idData.id }));
      console.log(`post deleted ${idData.id}`);

      //mark item as completed
    } else if (req.method === "PUT") {
      const Data = JSON.parse(req.body);
      const doc = (await TodoModel.findById(Data.id)) as unknown as Todo;
      doc.completed = Data.compeleted;
      res.json(await doc.save());

      console.log(`Task ${Data.id} updated to ${Data.compeleted}`);
    }
  } catch (e) {
    console.log(e);
  }
};

export default handler;
