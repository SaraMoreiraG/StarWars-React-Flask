import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Characteres from "../component/Characteres";
import VehicleCard from "../component/VehicleCard";
import PlanetCard from "../component/PlanetCard";

function Home() {
  const id = 1;
  const { store } = useContext(Context);
  const localPeople = JSON.parse(localStorage.getItem("people"));
  const localVehicles = JSON.parse(localStorage.getItem("vehicles"));
  const localPlanets = JSON.parse(localStorage.getItem("planets"));

  const [characteres, setCharacteres] = useState([]);

  async function getCharacteres() {
    const response = await fetch("https://www.swapi.tech/api/people");
    const data = await response.json();
    localStorage.setItem("people", JSON.stringify(data.results));
    setCharacteres(data.results);
  }

  useEffect(() => {
    getCharacteres();
  }, []);

  return (
    <div className="body text-white bg-dark mb-5">
      <div className="container">
        <h2>Characters</h2>
        <ul className="cards">
          {localPeople &&
            localPeople.map((person) => (
              <Characteres key={person.uid} person={person} />
            ))}
        </ul>
        {/* <h2>Vehicles</h2>
        <ul className="cards">
          {localVehicles &&
            localVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.uid} id={vehicle.uid} />
            ))}
        </ul>
        <h2>Planets</h2>
        <ul className="cards pb-5">
          {localPlanets &&
            localPlanets.map((planet) => (
              <PlanetCard
                key={planet.uid}
                id={planet.uid}
                name={planet.name}
                url={planet.url}
              />
            ))}
        </ul> */}
      </div>
    </div>
  );
}

export default Home;
