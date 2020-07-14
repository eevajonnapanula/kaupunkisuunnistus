import React from "react";
import { NextPage } from "next";
import SEO from "../../components/SEO";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Team from "../../components/dashboard/Team";
import TaskCard from "../../components/dashboard/TaskCard";
import TimesTable from "../../components/dashboard/TimesTable";
import Protected from "../../components/Protected";

const GET_TASKS = gql`
  query TasksQuery {
    tasks {
      id
      title
      description
    }
    teams {
      id
      name
    }
    taskAccomplishments: taskaccomplishments {
      team {
        name
      }
      task {
        title
      }
      answer
      id
    }
    times {
      id
      created_at
      type
      team {
        name
      }
    }
  }
`;

const Dashboard: NextPage = () => {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <div>Loading</div>;

  return (
    <Protected>
      <header>
        <a href="/api/logout">Logout</a>
      </header>
      <SEO title="Dashboard | Kauklahden kierros" />
      <main>
        <h1>Dashboard</h1>
        {error && <p>{error.message}</p>}
        {data && !error && (
          <div>
            <h2>Teams</h2>
            {data.teams && (
              <div className="dashboard-teams">
                {data.teams.map((team) => (
                  <Team key={team.id} team={team} />
                ))}
              </div>
            )}
            <h2>Tasks</h2>
            {data.tasks && (
              <div className="dashboard-task-cards">
                {data.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
            <h2>Times</h2>
            {data.times && (
              <TimesTable
                columns={["Name", "Time"]}
                times={data.times.map((item) => {
                  return { teamName: item.team.name, time: item.created_at };
                })}
              />
            )}
            <h2>Task Accomplishments</h2>
            {data.taskAccomplishments && (
              <ul>
                {data.taskAccomplishments.map((accomplishment) => (
                  <li key={accomplishment.id}>
                    {accomplishment.team.name}: {accomplishment.task.title}:{" "}
                    {accomplishment.answer}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </Protected>
  );
};

export default Dashboard;
