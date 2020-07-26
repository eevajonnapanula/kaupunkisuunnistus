import React from "react";
import { NextPage } from "next";
import SEO from "../../components/SEO";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Team from "../../components/dashboard/Team";
import TaskCard from "../../components/dashboard/TaskCard";
import TimesTable from "../../components/dashboard/TimesTable";
import auth0 from "../../lib/auth0";
import { IClaims } from "@auth0/nextjs-auth0/dist/session/session";

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

interface DashboardProps {
  token?: string;
  user?: IClaims;
}

const Dashboard: NextPage<DashboardProps> = ({ token, user }) => {
  if (!user) return <section>No access</section>;

  const { data, error } = useQuery(GET_TASKS, {
    context: {
      headers: {
        "X-Hasura-Role": `${process.env.NEXT_PUBLIC_HASURA_ADMIN_ROLE}`,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return (
    <>
      <section>
        <a href="/api/logout">Logout</a>
      </section>
      <SEO title="Dashboard | Kauklahden kierros" />
      <section>
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
      </section>
    </>
  );
};

export const getServerSideProps = async (
  context
): Promise<{ props: DashboardProps }> => {
  const session = await auth0.getSession(context.req);
  return {
    props: {
      token: session ? session.idToken : "",
      user: session ? session.user : null,
    },
  };
};

export default Dashboard;
