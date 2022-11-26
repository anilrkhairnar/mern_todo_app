import React, { useEffect, useState } from "react";
import axios from "axios";

import QuickTodoCreate from "./components/QuickTodoCreate";
import TodoCard from "./components/TodoCard";

import relaxingImage from "./assets/106278-relaxing-boy.gif";

const App = () => {
  const [allTodoData, setAllTodoData] = useState();

  const getAllTodo = async () => {
    try {
      const allTodo = await axios("/getAllTodo");
      // setAllTodoData(allTodo.data.todo);
    } catch (error) {
      console.log("Error while fetching All Todo");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);
  console.log(allTodoData);
  return (
    <>
      <div className="mt-5 mx-5 lg:ml-64 flex flex-wrap gap-2 md:gap-5">
        <QuickTodoCreate />
      </div>

      <div className="mt-5 mx-5 lg:ml-64 flex flex-wrap gap-4 lg:gap-7">
        {allTodoData ? (
          allTodoData.map((todo, index) => (
            <TodoCard todoTitle={todo} key={index} />
          ))
        ) : (
          <img src={relaxingImage} />
        )}
      </div>
    </>
  );
};

export default App;
