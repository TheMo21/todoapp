import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { TodoModel } = await connect();
  try {
    if (req.method === "GET") {
      const items = await TodoModel.find();
      res.json(items);
    } else if (req.method === "POST") {
      console.log(`posted ${req.body}`);
      const newTask = JSON.parse(req.body);
      res.json(await TodoModel.create(newTask));
    } else if (req.method === "DELETE") {
      const idData = JSON.parse(req.body);
      res.json(await TodoModel.deleteOne({ _id: idData.id }));
      console.log(`post deleted ${idData.id}`);
    }
  } catch (e) {
    console.log(e);
  }
};

export default handler;
