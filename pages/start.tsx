import React, { FormEvent } from "react";
import { NextPage } from "next";

const Start: NextPage = () => {
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    console.log("submit");
    event.preventDefault();
  };
  return (
    <>
      <h1>Start</h1>
      <form onSubmit={submitForm}>
        <div>
          <label>
            Ryhmän nimi <input type="text" />
          </label>
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </>
  );
};

export default Start;
