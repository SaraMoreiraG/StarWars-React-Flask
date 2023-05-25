import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import Characteres from "../component/Characteres";
import Planets from "../component/Planets";

export const Private = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  console.log("User:", store.user);

  useEffect(() => {
    if (!store.user) {
      console.log("Navigating...");
      navigate("/login");
    }
  }, [store.user]);

  return (
    store.user && (
      <div>
        <div className="d-flex justify-content-center pt-2">
          <h2>
            Welcome{" "}
            {store.user.user_name.charAt(0).toUpperCase() +
              store.user.user_name.slice(1)}
            !
          </h2>
        </div>
        <h3 className="pb-2">Your favorites:</h3>
        <ul className="cards pb-4">
          {store.user.favorites.map((favorite) => {
            const filteredCharacters = store.characteres.filter(
              (char) => char.id === favorite.people_id
            );
            return filteredCharacters.map((character) => (
              <Characteres key={character.id} personInfo={character} />
            ));
          })}
          {store.user.favorites.map((favorite) => {
            const filteredPlanets = store.planets.filter(
              (char) => char.id === favorite.planet_id
            );
            return filteredPlanets.map((planet) => (
              <Planets key={planet.id} planet={planet} />
            ));
          })}
        </ul>
      </div>
    )
  );
};
