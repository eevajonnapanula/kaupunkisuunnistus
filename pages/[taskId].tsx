import React, { useState, ChangeEvent, FormEvent } from "react";
import { NextPage, GetServerSideProps } from "next";
import SEO from "../components/SEO";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../components/Loading";

const GET_TASK_DETAILS = gql`
  query GetTaskById($id: uuid!, $teamId: uuid!) {
    currentTeamId @client @export(as: "teamId")
    task: tasks_by_pk(id: $id) {
      id
      title
      description
    }
  }
`;

const SAVE_TASK_ACCOMPLISHMENT = gql`
  mutation SaveTaskAccomplishment(
    $teamid: uuid!
    $taskid: uuid!
    $answer: String!
  ) {
    insert_taskaccomplishments_one(
      object: { taskid: $taskid, teamid: $teamid, answer: $answer }
    ) {
      id
    }
  }
`;

interface TaskIdProps {
  taskId: string;
}

const TaskId: NextPage<TaskIdProps> = ({ taskId }) => {
  const [answer, setAnswer] = useState("");

  const { data, error, loading } = useQuery(GET_TASK_DETAILS, {
    variables: { id: taskId },
  });

  const [
    saveTaskAccomplishment,
    { loading: loadingTaskAccomplishment },
  ] = useMutation(SAVE_TASK_ACCOMPLISHMENT);

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) =>
    setAnswer(event.target.value);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await saveTaskAccomplishment({
        variables: { taskid: taskId, teamid: data.currentTeamId, answer },
      });
      alert("Done");
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: Add confirmation

  if (error) {
    console.log(error);
  }
  return (
    <>
      <SEO
        title={data && data.task && data.task.title ? data.task.title : ""}
      />
      <Loading visible={loading || loadingTaskAccomplishment} />
      {data && data.currentTeamId ? (
        <>
          <section>
            <h1>Kauklahden kierros - {data && data.task && data.task.title}</h1>
            {data && data.task && <p>{data.task.description}</p>}
          </section>

          <form onSubmit={submitForm}>
            <fieldset>
              <label>
                Vastaus:
                <input
                  type="text"
                  value={answer}
                  onChange={handleAnswerChange}
                  disabled={loadingTaskAccomplishment}
                />
              </label>
            </fieldset>
            <button type="submit">Tallenna</button>
          </form>
        </>
      ) : (
        <p>
          <a href="/start">Aloita rekisteröimällä joukkue täällä</a>
        </p>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const taskId = context.params.taskId;

  return {
    props: {
      taskId,
    },
  };
};

export default TaskId;
