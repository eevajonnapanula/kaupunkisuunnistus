import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Task from "../components/Task";
import { NextPage } from "next";

const GET_DATA = gql`
  {
    tasks {
      id
      name
      description
    }
  }
`;

const Tasks: NextPage = () => {
  const { data, loading } = useQuery(GET_DATA);
  console.log(data);
  if (loading) return <div>{loading}</div>;
  return (
    <div>
      {data.tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default Tasks;
