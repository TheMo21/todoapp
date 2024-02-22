import { TodoModel } from "@/model/todos";
import mongoose from "mongoose";

//connection fucntion
export const connect = async () => {
  const conn = await mongoose
    .connect(
      "mongodb+srv://admin:tHFRjJwVsP4rCtMt@task.wyhnwbr.mongodb.net/?retryWrites=true&w=majority"
    )
    .catch((e) => console.log(e));

  console.log("connected to database");

  return { conn, TodoModel };
};
