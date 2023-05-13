import React, { useContext } from "react";

import { Context } from "../store/appContext";

import Characteres from "../component/Characteres";
import Planets from "../component/Planets";

import "../../styles/home.css";

function Home() {
  const { store } = useContext(Context);

  return (
    <div className="body text-white bg-dark mb-5">
      <div className="container">
        <h2>Characters</h2>
        <ul className="cards">
          {store.characteres &&
            store.characteres.map((person) => (
              <Characteres key={person.uid} personInfo={person} />
            ))}
        </ul>
        <h2>Planets</h2>
        <ul className="cards pb-5">
          {store.planets &&
            store.planets.map((planet) => (
              <Planets key={planet.id} planet={planet} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
