import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { NextPage } from "next";
import SEO from "../components/SEO";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/client";

const GET_TASK_DETAILS = gql`
  query GetTaskById($id: uuid!) {
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

const TaskId: NextPage = () => {
  const [answer, setAnswer] = useState("");
  const router = useRouter();
  const { taskId } = router.query;
  const [loadDetails, { data, error, loading }] = useLazyQuery(
    GET_TASK_DETAILS,
    {
      variables: { id: taskId },
    }
  );

  const [
    saveTaskAccomplishment,
    { loading: loadingTaskAccomplishment },
  ] = useMutation(SAVE_TASK_ACCOMPLISHMENT);

  useEffect(() => {
    if (taskId) {
      loadDetails();
    }
  }, [taskId]);

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) =>
    setAnswer(event.target.value);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const teamid = localStorage.getItem("teamId");
      await saveTaskAccomplishment({
        variables: { taskid: taskId, teamid, answer },
      });
      alert("Done");
    } catch (e) {
      console.error(e);
    }
  };

  //TODO: Add confirmation
  // TODO: Add possibility to insert teamId

  return (
    <>
      <SEO title={data && data.task && data.task.title} />
      {error && <div>{error.message}</div>}
      <div>
        <h1>Kauklahden kierros - {data && data.task && data.task.title}</h1>
        {data && data.task && <p>{data.task.description}</p>}
      </div>

      <form onSubmit={submitForm}>
        <div>
          <label>
            Vastaus:
            <input
              type="text"
              value={answer}
              onChange={handleAnswerChange}
              disabled={loading || loadingTaskAccomplishment}
            />
          </label>
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </>
  );
};

export default TaskId;
