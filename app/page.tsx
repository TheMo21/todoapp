"use client";
import { Todo } from "@/model/todos";

import { useEffect, useRef, useState } from "react";

import Button from "./component/Button";
import ListItem from "./component/ListItem";
import DropDown from "./component/DropDown";

import Image from "next/image";

import checksvg from "../public/check.svg";
import crosssvg from "../public/cross-svgrepo-com.svg";

export default function Home() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<Todo>({
    name: "",
    description: "",
    completed: false,
  } as Todo);
  const inputRef = useRef(null);

  //update all the tasks
  const getTodos = async () => {
    const res = await fetch("http://localhost:3000/api/todos");
    const taskData = await res.json();

    setTasks(taskData);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTask = async () => {
    //note: body needs to be stringify, parse back to json at the api level
    try {
      const task = newTask;
      await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        body: JSON.stringify(task),
      });
      console.log(task);

      getTodos();
      setNewTask({ ...newTask, name: "", description: "" } as Todo);

      //changes value of input back to ""
      const allInputs = document.querySelectorAll(".inputFields");
      allInputs.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        inputElement.value = "";
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-full py-10 flex flex-col items-center font-sans ">
        <h1 className="text-4xl">ToDo App</h1>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 h-auto p-2 m-2 border rounded-sm flex flex-col">
          {tasks.length != 0 ? (
            tasks.map((doc) => (
              <div className="w-full flex justify-between">
                <DropDown dropDownContent={doc.description}>
                  <ListItem key={doc._id} id={doc._id}>
                    {doc.name}
                  </ListItem>
                </DropDown>
                <div className="flex gap-1">
                  {doc.completed ? (
                    <Button
                      onClick={async () => {
                        await fetch("http://localhost:3000/api/todos", {
                          method: "PUT",
                          body: JSON.stringify({
                            id: doc._id,
                            compeleted: false,
                          }),
                        });
                        getTodos();
                      }}
                      type={"button"}
                      className="bg-gray-50"
                    >
                      <Image src={checksvg} alt="mark task as completed" />
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        await fetch("http://localhost:3000/api/todos", {
                          method: "PUT",
                          body: JSON.stringify({
                            id: doc._id,
                            compeleted: true,
                          }),
                        });
                        getTodos();
                      }}
                      type={"button"}
                      className="bg-gray-50"
                    >
                      <Image src={crosssvg} alt="mark task as not completed" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="bg-red-500 text-white p-1"
                    onClick={async () => {
                      await fetch("http://localhost:3000/api/todos", {
                        method: "DELETE",
                        body: JSON.stringify({
                          id: doc._id,
                        }),
                      });
                      getTodos();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <span className="w-full flex justify-center">
              <h1>Enter a task</h1>
            </span>
          )}
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 p-1 flex flex-col border rounded-sm">
          <span className="flex gap-1 justify-between">
            <label
              htmlFor="task-input"
              className="w-1/4 p-1 text-xs md:text-sm"
            >
              Task Name
            </label>
            <input
              id="task-input"
              className="w-3/4 px-1 border outline-1 focus:outline-blue-500 inputFields"
              type="text"
              onChange={(event) => {
                setNewTask({ ...newTask, name: event.target.value } as Todo);
              }}
              ref={inputRef}
            />
          </span>
          <span className="flex gap-1 justify-between">
            <label htmlFor="task-input" className="w-1/4 text-xs md:text-sm">
              Task Description
            </label>
            <textarea
              id="task-description"
              className="w-3/4 px-1 border outline-1 focus:outline-blue-500 inputFields"
              onChange={(event) => {
                setNewTask({
                  ...newTask,
                  description: event.target.value,
                } as Todo);
              }}
              ref={inputRef}
            />
          </span>

          <Button
            type="submit"
            onClick={addTask}
            className="w-1/4 m-3 self-center text-white bg-blue-500"
          >
            Submit
          </Button>
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 p-1 border">
          <p>NOTE: click on the name of your task for more details</p>
        </div>
      </div>
    </>
  );
}
