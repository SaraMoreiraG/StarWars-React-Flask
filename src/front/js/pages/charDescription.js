import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";

export const CharDescription = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const character = JSON.parse(localStorage.getItem("Character" + params.id));
  let fav = false;

  if (character) {
    for (let i = 0; i < store.favorites.length; i++) {
      if (store.favorites[i] == character.name) fav = true;
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center p-3">
        <div>
          <img
            src={
              "https://starwars-visualguide.com/assets/img/characters/" +
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
              onClick={() => actions.saveFavorite(character.name)}
            >
              <i className="fa-solid fa-heart"></i>
            </Button>
          )}
          {!fav && (
            <Button
              variant="outline-warning"
              className="mt-2"
              onClick={() => actions.saveFavorite(character.name)}
            >
              <i className="fa-regular fa-heart"></i>
            </Button>
          )}
        </div>
      </div>
      <div className="row d-flex p-3 justify-content-center">
        <div className="col-2">
          <h3>Name</h3>
          <p>{character.name}</p>
        </div>
        <div className="col-2">
          <h3>Birth Year</h3>
          <p>{character.birth_year}</p>
        </div>
        <div className="col-2">
          <h3>Gender</h3>
          <p>{character.gender}</p>
        </div>
        <div className="col-2">
          <h3>Height</h3>
          <p>{character.height}</p>
        </div>
        <div className="col-2">
          <h3>Skin Color</h3>
          <p>{character.skin_color}</p>
        </div>
        <div className="col-2">
          <h3>Eye Color</h3>
          <p>{character.eye_color}</p>
        </div>
      </div>
    </div>
  );
};
