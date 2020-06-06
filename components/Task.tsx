import React, { FunctionComponent } from "react";

interface TaskProps {
  id: string;
  name: string;
  description: string;
  nextTaskClue: string;
}

const Task: FunctionComponent<TaskProps> = ({ name, description }) => (
  <div>
    <h1>{name}</h1> <p>{description}</p>
  </div>
);

export default Task;
