import React from "react";
import { NextPage } from "next";
import SEO from "../components/SEO";

const Home: NextPage = () => {
  return (
    <>
      <SEO title="Kauklahden kierros" />
      <img src="/illustrations/map.svg" alt=""></img>
      <div>
        <h1>Kauklahden kierros</h1>
        <p>Tervetuloa Kauklahden kierrokselle. Tässä ohjeet: </p>
        <h2>Tarvikkeet</h2>
        <ul>
          <li>Kännykkä</li>
          <li>Kilpailuhenkeä</li>
        </ul>
        <h2>Lähtöpaikka</h2>
        <p>
          Kierros lähtee paikasta xxx johon myös palataan. Tässä paljon asiaa
          paljon asiaa paljonasiaa lisää asiaa lisää asiaa
        </p>
      </div>
    </>
  );
};

export default Home;
