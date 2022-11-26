import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const TodoCard = ({ todoTitle, tasks }) => {
  return (
    <div className="py-4 px-4 w-full md:w-72 bg-white rounded-lg shadow-lg">
      {/* card top start */}
      <div className="mt-1 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-lg">
          <span className="w-4 h-4 rounded-full bg-[#F96C9B]"></span>
          <h3>Today 1</h3>
        </div>
        <FontAwesomeIcon className="text-gray-500" icon={faPen} />
      </div>
      {/* card top end */}

      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-gray-500" icon={faCircle} />
          <h4 className="text-gray-500">Running</h4>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-gray-500" icon={faCircle} />
          <h4 className="text-gray-500">Swimming</h4>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-gray-500" icon={faCheck} />
          <h4 className="text-gray-500">Call Michael</h4>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-gray-500" icon={faCheck} />
          <h4 className="text-gray-500">Shopping</h4>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
