import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import userContext from "../../context/userContext";

// import quickTabs
import quickTabs from "../quickTabs";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faCheck,
  faTimes,
  faBicycle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

// Image - relaxing
import relaxingImage from "../../assets/106278-relaxing-boy.gif";

const Todo = () => {
  const [allTodoData, setAllTodoData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [addTaskInput, setAddTaskInput] = useState("");

  // edit todo data
  const [editTodo, setEditTodo] = useState({});

  const [loader, setLoader] = useState(false);
  const [addTodoMode, setAddTodoMode] = useState(false);
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [addTodoInput, setAddTodoInput] = useState("");

  // navigator
  const navigate = useNavigate();

  // context API
  const { userData, setUserData } = useContext(userContext);

  // fetching user's todo
  const getAllTodo = async () => {
    try {
      // console.log("allTodoData: ", allTodoData);
      const allTodo = await axios.post(
        "http://127.0.0.1:4000/api/v1/getAllTodo",
        { user: userData.user._id }
      );
      // console.log("alltodo", allTodo);
      setAllTodoData(allTodo.data?.todo);
    } catch (error) {
      console.log("Error while fetching All Todo");
      console.log(error);
    }
  };

  // flip isDone
  const flipIsDone = async (todo, taskIndex, isDone) => {
    try {
      const todoId = todo._id;
      const updatedIsDone = (todo.tasks[taskIndex].isDone =
        isDone === "true" ? "false" : "true");
      const beforeTodo = {
        user: todo.uid,
        todoTitle: todo.todoTitle,
        color: todo.color,
        tasks: todo.tasks,
      };
      const updatedTodo = {
        ...beforeTodo,
        updatedIsDone,
      };

      const result = await axios.put(
        `http://127.0.0.1:4000/api/v1/editTodo/${todoId}`,
        updatedTodo
      );
      // console.log("result: ", result);
      getAllTodo();
    } catch (error) {
      console.log("error while flipping isDone");
      console.log(error);
    }
  };

  // add task function
  const addTaskFunc = async (todoId) => {
    const createTask = {
      user: userData.user._id,
      tasks: [
        {
          isDone: "false",
          taskTitle: addTaskInput,
        },
      ],
    };
    setAddTaskInput("");
    try {
      const result = await axios.put(
        `http://127.0.0.1:4000/api/v1/createTask/${todoId}`,
        createTask
      );
      console.log("task added result: ", result);

      getAllTodo();
    } catch (error) {
      console.log("error while adding task");
      console.log(error);
    }
  };

  // edit todo function
  const editTodoFunc = async () => {
    editTodo.todoTitle.trim();

    let count = 0;
    if (editTodo.todoTitle === "") {
      alert("Fill the Todo Title");
    }
    for (let task of editTodo.tasks) {
      task.taskTitle.trim();
      if (task.taskTitle === "") {
        alert("Fill the task");
        count = +1;
      }
    }
    const todo = {
      user: userData.user._id,
      todoTitle: editTodo.todoTitle,
      color: editTodo.color,
      tasks: editTodo.tasks,
    };

    if (count === 0) {
      try {
        const { data } = await axios.put(
          `http://127.0.0.1:4000/api/v1/editTodo/${editTodo._id}`,
          todo
        );

        if (data.success === true) {
          getAllTodo();
          setEditMode(false);
        }
      } catch (error) {
        console.log("error while editing todo");
        console.log(error);
        alert("something went wrong");
        setLoader(!loader);
      }
    }
  };

  // create todo function
  const createTodoFunc = async (quickColor, quickTitle) => {
    if (quickTitle.trim() !== "") {
      const todo = {
        user: userData.user._id,
        todoTitle: quickTitle,
        color: quickColor,
      };

      try {
        const { data } = await axios.post(
          `http://127.0.0.1:4000/api/v1/createTodo/`,
          todo
        );

        if (data.success === true) {
          getAllTodo();
          setAddTaskMode(false);
          setAddTodoInput("");
        }
      } catch (error) {
        console.log("error while adding todo");
        console.log(error);
        alert("something went wrong");
        setLoader(!loader);
      }
    } else {
      alert("Please fill some text in it");
      setAddTodoInput("");
    }
  };

  // random color generator function
  const getRandomColor = () => {
    // Create 16 Digit HEX Value
    let color = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0);

    // Convert HEX to RGB
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    // YIQ formula
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Generate Contras Color Based on Bg-Color
    const isGoodColor = yiq >= 128 ? "good" : "bad";
    if (isGoodColor !== "good") {
      return getRandomColor();
    } else {
      return `#${color}`;
    }
  };

  // delete toto function
  const deleteTodoFunc = async (todoId) => {
    const user = userData.user._id;
    if (window.confirm("Conform do you want to delete todo?") === true) {
      try {
        const { data } = await axios.delete(
          `http://127.0.0.1:4000/api/v1/deleteTodo/${todoId}`,
          {
            data: { user },
          }
        );
        if (data.success === true) {
          getAllTodo();
        }
      } catch (error) {
        console.log("error while deleting todo");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      navigate("/");
    }
    getAllTodo();
  }, [loader]);
  return (
    <>
      {Object.keys(userData).length !== 0 && (
        <div className="w-full relative h-full flex flex-col">
          {/* navbar start */}
          <div className="w-full h-16 flex flex-col justify-center bg-white shadow-lg">
            <div className="px-32 flex justify-end items-center gap-2">
              <div className="relative">
                <div
                  className="px-4 py-2 flex justify-center items-center gap-2 hover:bg-gray-900 active:scale-95 rounded-xl bg-gray-800 shadow-xl duration-300 ease-in-out cursor-pointer"
                  onClick={() => setAddTodoMode(true)}
                >
                  <FontAwesomeIcon
                    className="text-base text-gray-300"
                    icon={faPlus}
                  />
                  <h3 className="text-xl text-gray-300">Add todo</h3>
                </div>
                {addTodoMode && (
                  <div className="p-2 absolute -bottom-16 -left-20 flex justify-center items-center gap-2 bg-white rounded-xl shadow-xl">
                    <div className="w-4 h-4 absolute -top-1  bg-white rotate-45 rounded-sm"></div>
                    <input
                      className="pl-2 text-base rounded-lg outline-none z-10"
                      placeholder="Enter todo"
                      type="text"
                      value={addTodoInput}
                      onChange={(e) => setAddTodoInput(e.target.value)}
                    />
                    {addTodoInput ? (
                      <button
                        className="w-8 h-8 z-10 rounded-full bg-blue-500  hover:scale-105 duration-300 ease-in-out active:bg-blue-600 active:scale-100"
                        onClick={() =>
                          createTodoFunc(getRandomColor(), addTodoInput)
                        }
                      >
                        <FontAwesomeIcon
                          className="text-base text-white"
                          icon={faCheck}
                        />
                      </button>
                    ) : (
                      <button
                        className="w-8 h-8 z-10 rounded-full bg-gray-700 hover:scale-105 duration-300 ease-in-out active:bg-gray-800 active:scale-100"
                        onClick={() => setAddTodoMode(false)}
                      >
                        <FontAwesomeIcon
                          className="text-base text-white"
                          icon={faTimes}
                        />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mx-5 w-[.5px] h-full bg-gray-900"></div>
              <div className="w-10 h-10 flex justify-center items-center text-2xl font-semibold bg-gray-800 text-gray-300 rounded-full shadow-lg cursor-pointer">
                {userData.user.name[0].toUpperCase()}
              </div>
              <h3 className="text-xl font-medium text-white cursor-pointer">
                {userData.user.name}
              </h3>
            </div>
          </div>
          {/* navbar end */}

          {/* Edit mode card start */}
          {editMode && (
            <div className="absolute w-full h-full flex justify-center items-center z-20 bg-[#000000a1]">
              <div className="p-3 w-72 h-fit flex flex-col top-52 left-10 z-10 rounded-xl bg-white shadow-xl">
                <input
                  className="p-2 text-xl font-bold rounded-lg outline-none"
                  placeholder="Todo title"
                  type="text"
                  value={editTodo.todoTitle}
                  onChange={(e) => {
                    setEditTodo({ ...editTodo, todoTitle: e.target.value });
                  }}
                />
                <hr className="mb-2" />
                {editTodo.tasks.map((task, index) => (
                  <input
                    key={index}
                    className="px-2 py-1 rounded-lg outline-none"
                    placeholder="Task name"
                    value={task.taskTitle}
                    onChange={(e) => {
                      const newTodo = { ...editTodo };
                      newTodo.tasks[index].taskTitle = e.target.value;
                      setEditTodo({ ...newTodo });
                    }}
                    type="text"
                  />
                ))}

                <div className="flex gap-3">
                  <button
                    className="mt-3 p-2 w-full rounded-lg bg-red-300 text-red-900 hover:scale-105 duration-300 ease-in-out active:bg-red-400 active:scale-100"
                    onClick={() => {
                      setEditMode(false);
                      setLoader(!loader);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-3 p-2 w-full rounded-lg bg-blue-300 text-blue-900 hover:scale-105 duration-300 ease-in-out active:bg-blue-400 active:scale-100"
                    onClick={editTodoFunc}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Edit mode card end */}

          {/* Quick Tabs start */}
          <div className="flex-col">
            <div className="mt-5 mx-5 lg:ml-64 flex flex-wrap gap-2 md:gap-5">
              {quickTabs.map((todo, index) => (
                <div
                  className="py-2 px-4 flex items-center gap-2 bg-white rounded-lg shadow-lg cursor-pointer"
                  key={index}
                  onClick={() => createTodoFunc(todo.color, todo.todoTitle)}
                >
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: todo.color }}
                  ></span>
                  <h3>{todo.todoTitle}</h3>
                </div>
              ))}
            </div>
            {/* Quick Tabs end */}

            <div className="mt-5 mx-5 lg:ml-64 flex flex-wrap gap-4 lg:gap-10">
              {/* Showing todo start */}

              {allTodoData ? (
                allTodoData.map((todo, todoIndex) => (
                  <div className="flex gap-5" key={todoIndex}>
                    <div className="relative group py-4 px-4 w-full md:w-72 bg-white rounded-lg shadow-lg duration-200 ease-in-out hover:shadow-xl">
                      {/* card top start */}
                      <div className="mt-1 w-full flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: todo.color }}
                          ></span>
                          <h3>{todo.todoTitle}</h3>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                          <FontAwesomeIcon
                            className="hidden group-hover:block hover:scale-110 text-gray-500 hover:text-blue-400 duration-300 ease-out cursor-pointer"
                            onClick={() => {
                              setEditMode(true); // Edit mode
                              setEditTodo(todo); // Todo data
                            }}
                            icon={faPen}
                          />
                          <FontAwesomeIcon
                            className="hidden group-hover:block hover:scale-110 text-gray-500 hover:text-orange-400 duration-300 ease-out cursor-pointer"
                            onClick={() => deleteTodoFunc(todo._id)}
                            icon={faTrash}
                          />
                        </div>
                      </div>
                      {/* card top end */}

                      <div className="mt-3 flex flex-col gap-2">
                        {todo.tasks &&
                          todo.tasks.map((task, taskIndex) => (
                            <div
                              className=" flex items-center gap-2 cursor-pointer"
                              key={taskIndex}
                              onClick={() =>
                                flipIsDone(todo, taskIndex, task.isDone)
                              }
                            >
                              <FontAwesomeIcon
                                className="text-gray-500"
                                icon={
                                  task.isDone === "true" ? faCheck : faCircle
                                }
                              />
                              <h4 className="text-gray-500">
                                {task.taskTitle}
                              </h4>
                              <FontAwesomeIcon
                                className="hidden group-hover:block hover:scale-110 text-gray-500 hover:text-orange-400 duration-300 ease-out cursor-pointer"
                                onClick={() => deleteTodoFunc(todo._id)}
                                icon={faTrash}
                              />
                            </div>
                          ))}
                      </div>
                      <div className="group p-1 absolute left-0 -bottom-0 group-hover:-bottom-12 -z-10 group-hover:z-10 w-full md:w-72 bg-white rounded-lg shadow-lg duration-300 ease hover:shadow-2xl active:shadow-xl">
                        {addTaskMode ? (
                          <div
                            className="flex items-center gap-3 cursor-pointer"
                            onBlur={() => {
                              setTimeout(() => {
                                setAddTaskInput("");
                                setAddTaskMode(false);
                              }, 10000);
                            }}
                          >
                            <input
                              className="px-2 py-1 rounded-lg outline-none"
                              placeholder="Task name"
                              type="text"
                              value={addTaskInput}
                              onChange={(e) => setAddTaskInput(e.target.value)}
                            />

                            {addTaskInput ? (
                              <button
                                className="mt-3 p-2 w-full rounded-lg bg-blue-300 text-blue-900"
                                onClick={() => addTaskFunc(todo._id)}
                              >
                                Done
                              </button>
                            ) : (
                              <button
                                className="mt-3 p-2 w-full rounded-lg bg-red-300 text-red-900"
                                onClick={() => {
                                  setAddTaskInput("");
                                  setAddTaskMode(false);
                                }}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        ) : (
                          <div
                            className="px-3 py-2 flex items-center gap-3 cursor-pointer"
                            onClick={() => setAddTaskMode(true)}
                          >
                            <FontAwesomeIcon
                              className="text-base text-gray-500"
                              icon={faPlus}
                            />
                            <h3 className="text-base">add task</h3>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Showing todo start */}
                  </div>
                ))
              ) : (
                <img
                  className="ml-32"
                  src={relaxingImage}
                  alt="relaxingImage"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
