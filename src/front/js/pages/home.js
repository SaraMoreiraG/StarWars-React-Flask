import React, { useContext } from "react";

import { Context } from "../store/appContext";

import Characteres from "../component/Characteres";
import Planets from "../component/Planets";

import "../../styles/home.css";

function Home() {
  const { store } = useContext(Context);

  return (
    <div className="body text-white bg-dark mb-5">
      <div className="row pt-2 justify-content-center">
        <div className="text-center">
          <h2>Characters</h2>
        </div>
        <div className="container">
          <ul className="cards">
            {store.characteres &&
              store.characteres.map((person) => (
                <Characteres key={person.uid} personInfo={person} />
              ))}
          </ul>
        </div>
      </div>
      <div className="row pt-5 justify-content-center">
        <div className="text-center">
          <h2>Planets</h2>
        </div>
        <div className="container">
          <ul className="cards pb-5">
            {store.planets &&
              store.planets.map((planet) => (
                <Planets key={planet.id} planet={planet} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
