import React, { FunctionComponent } from "react";
import { Task } from "../../lib/types";

interface TaskCardProps {
  task: Task;
}

const TaskCard: FunctionComponent<TaskCardProps> = ({ task }) => (
  <div className="task-card">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
  </div>
);

export default TaskCard;
