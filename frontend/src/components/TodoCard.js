import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const TodoCard = ({ todo }) => {
  const { todoTitle, color, tasks } = todo;
  // console.log("todo ", todoTitle, tasks);
  return (
    <div className="group py-4 px-4 w-full md:w-72 bg-white rounded-lg shadow-lg duration-200 ease-in-out hover:shadow-xl">
      {/* card top start */}
      <div className="mt-1 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-lg">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          ></span>
          <h3>{todoTitle}</h3>
        </div>
        <FontAwesomeIcon
          className="hidden group-hover:block text-gray-500"
          icon={faPen}
        />
      </div>
      {/* card top end */}

      <div className="mt-3 flex flex-col gap-2">
        {tasks &&
          tasks.map((task, index) => (
            <div className="flex items-center gap-2 cursor-pointer" key={index}>
              <FontAwesomeIcon
                className="text-gray-500"
                icon={task.isDone == true ? faCheck : faCircle}
              />
              <h4 className="text-gray-500">{task.taskTitle}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoCard;
