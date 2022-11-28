import React from "react";

const QuickTodoCreate = () => {
  const quickTabs = [
    {
      taskTitle: "Meeting",
      color: "#FF824D",
    },
    {
      taskTitle: "Tomorrow",
      color: "#86adf6",
    },
  ];
  return quickTabs.map((task, index) => (
    <div
      className="py-2 px-4 flex items-center gap-2 bg-white rounded-lg shadow-lg cursor-pointer"
      key={index}
    >
      <span
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: task.color }}
      ></span>
      <h3>{task.taskTitle}</h3>
    </div>
  ));
};

export default QuickTodoCreate;
