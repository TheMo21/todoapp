import mongoose, { Schema, model, Document } from "mongoose";

export interface Todo extends Document {
  name: string;
  description: string;
  completed: boolean;
}

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

export const TodoModel =
  mongoose.models["Todo"] || model<Todo>("Todo", todoSchema);
