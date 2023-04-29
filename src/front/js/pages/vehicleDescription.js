import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";

export const VehicleDescription = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const vehicle = JSON.parse(localStorage.getItem("Vehicle" + params.id));
  let fav = false;

  if (vehicle) {
    for (let i = 0; i < store.favorites.length; i++) {
      if (store.favorites[i] == vehicle.name) fav = true;
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center p-3">
        <div>
          <img
            src={
              "https://starwars-visualguide.com/assets/img/vehicles/" +
              params.id +
              ".jpg"
            }
          />
        </div>
        <div className="col-3 text-center ms-3">
          <h1>{params.name}</h1>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi
          </p>
          {fav && (
            <Button
              variant="outline-warning"
              className="mt-2"
              onClick={() => actions.saveFavorite(vehicle.name)}
            >
              <i className="fa-solid fa-heart"></i>
            </Button>
          )}
          {!fav && (
            <Button
              variant="outline-warning"
              className="mt-2"
              onClick={() => actions.saveFavorite(vehicle.name)}
            >
              <i className="fa-regular fa-heart"></i>
            </Button>
          )}
        </div>
      </div>
      <div className="row d-flex p-3 justify-content-center">
        <div className="col-2">
          <h3>Name</h3>
          <p>{vehicle.name}</p>
        </div>
        <div className="col-2">
          <h3>Model</h3>
          <p>{vehicle.model}</p>
        </div>
        <div className="col-2">
          <h3>Pass</h3>
          <p>{vehicle.passengers}</p>
        </div>
        <div className="col-2">
          <h3>Crew</h3>
          <p>{vehicle.crew}</p>
        </div>
        <div className="col-2">
          <h3>Length</h3>
          <p>{vehicle.length}</p>
        </div>
        <div className="col-2">
          <h3>Max speed</h3>
          <p>{vehicle.max_atmosphering_speed}</p>
        </div>
      </div>
    </div>
  );
};
