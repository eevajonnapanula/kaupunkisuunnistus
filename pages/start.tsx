import React, { FormEvent, useState, ChangeEvent } from "react";
import { NextPage } from "next";
import SEO from "../components/SEO";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../components/Loading";

const INSERT_TEAM = gql`
  mutation InsertTeam($name: String) {
    insert_teams_one(object: { name: $name }) {
      id
      name
    }
  }
`;

const INSERT_TIME = gql`
  mutation InsertTeam($teamid: uuid, $type: String) {
    insert_times_one(object: { teamid: $teamid, type: $type }) {
      created_at
    }
  }
`;

const GET_TEAM_ID = gql`
  query GetTeamId {
    currentTeamId @client
  }
`;

const Start: NextPage = () => {
  const [groupName, setGroupName] = useState("");

  const { data: current } = useQuery(GET_TEAM_ID);

  const [insertTeam, { loading: teamLoading, error: teamError }] = useMutation(
    INSERT_TEAM,
    {
      update(cache, { data: { insert_teams_one } }) {
        console.log("insert_teams_one", insert_teams_one);
        cache.writeQuery({
          query: GET_TEAM_ID,
          data: {
            currentTeamId: insert_teams_one.id,
          },
        });
      },
    }
  );
  const [insertTime, { loading: timeLoading, error: timeError }] = useMutation(
    INSERT_TIME
  );

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const team = await insertTeam({ variables: { name: groupName } });
      await insertTime({
        variables: { teamid: team.data.insert_teams_one.id, type: "Start" },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  return (
    <>
      <Loading visible={timeLoading || teamLoading} />
      <SEO title="Kierroksen aloitus | Kauklahden kierros" />
      <h1>Aloitus</h1>
      {teamError && <div>{teamError.message}</div>}
      {timeError && <div>{timeError.message}</div>}
      {current && current.currentTeamId ? (
        <div>
          <h2>{groupName}</h2>
          <p>
            Ryhmä on rekisteröity. Nyt on aika suunnata kohti ensimmäistä
            rastia, jonka koordinaatit ovat seuraavat:
          </p>
        </div>
      ) : (
        <form onSubmit={submitForm}>
          <div>
            <label>
              Ryhmän nimi
              <input
                type="text"
                value={groupName}
                onChange={handleGroupNameChange}
                disabled={teamLoading || timeLoading}
              />
            </label>
          </div>
          <button type="submit" disabled={timeLoading || teamLoading}>
            Tallenna
          </button>
        </form>
      )}
    </>
  );
};

export default Start;
