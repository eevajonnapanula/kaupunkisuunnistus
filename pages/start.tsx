import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { NextPage } from "next";
import SEO from "../components/SEO";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

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

const Start: NextPage = () => {
  const [groupName, setGroupName] = useState("");
  const [teamId, setTeamId] = useState("");

  const [insertTeam, { loading: teamLoading, error: teamError }] = useMutation(
    INSERT_TEAM
  );
  const [insertTime, { loading: timeLoading, error: timeError }] = useMutation(
    INSERT_TIME
  );

  useEffect(() => {
    if (!teamId) {
      setTeamId(localStorage.getItem("teamId"));
      setGroupName(localStorage.getItem("teamName"));
    }
  }, []);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const team = await insertTeam({ variables: { name: groupName } });
      await insertTime({
        variables: { teamid: team.data.insert_teams_one.id, type: "Start" },
      });
      setTeamId(team.data.insert_teams_one.id);
      localStorage.setItem("teamId", team.data.insert_teams_one.id);
      localStorage.setItem("teamName", team.data.insert_teams_one.name);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  return (
    <>
      <SEO title="Kierroksen aloitus | Kauklahden kierros" />
      <h1>Aloitus</h1>
      {teamError && <div>{teamError.message}</div>}
      {timeError && <div>{timeError.message}</div>}
      {teamId ? (
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
          <button type="submit">Tallenna</button>
        </form>
      )}
    </>
  );
};

export default Start;
