import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PlanetCard({ id }) {
  let imgSrc =
    "https://starwars-visualguide.com/assets/img/planets/" + id + ".jpg";
  if (id == 1)
    imgSrc =
      "https://img1.starwars-holonet.com/holonet/dictionnaire/photos/planete_tatooine.jpg";
  const { store, actions } = useContext(Context);
  let fav = false;

  useEffect(() => {
    if (localStorage.getItem("Planet" + id) == null) actions.getPlanet(id);
  }, []);

  const planet = JSON.parse(localStorage.getItem("Planet" + id));

  if (planet) {
    for (let i = 0; i < store.favorites.length; i++) {
      if (store.favorites[i] == planet.name) fav = true;
    }
  }

  return (
    <>
      <Card className="p-0 border border-0" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={imgSrc} />

        {planet && (
          <Card.Body>
            <Card.Title>{planet.name}</Card.Title>
            <div key={id}>
              <ul>
                <li>Population: {planet.population}</li>
                <li>Climate: {planet.climate}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link to={"/planetdescription/" + planet.name + "/" + id}>
                  <Button variant="outline-primary" className="mt-2">
                    Learn more!
                  </Button>
                </Link>
                {fav && (
                  <Button
                    variant="outline-warning"
                    className="mt-2"
                    onClick={() => actions.saveFavorite(planet.name)}
                  >
                    <i className="fa-solid fa-heart"></i>
                  </Button>
                )}
                {!fav && (
                  <Button
                    variant="outline-warning"
                    className="mt-2"
                    onClick={() => actions.saveFavorite(planet.name)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </Button>
                )}
              </div>
            </div>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default PlanetCard;
