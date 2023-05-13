import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Planets({ planet }) {
  const { store, actions } = useContext(Context);
  const [fav, setFav] = useState(null);
  const [favId, setFavId] = useState(null);

  let imgSrc =
    "https://starwars-visualguide.com/assets/img/planets/" +
    planet.uid +
    ".jpg";

  if (planet.uid == 1)
    imgSrc =
      "https://img1.starwars-holonet.com/holonet/dictionnaire/photos/planete_tatooine.jpg";

  useEffect(() => {
    (async () => {
      const favorites = await store.user;
      console.log(planet.name);
      if (favorites && store.user.favorites) {
        store.user.favorites.forEach((item) => {
          console.log(item.name);
          if (item.name == planet.name) {
            setFav(true);
            setFavId(item.id);
          }
        });
      }
    })();
  });

  return (
    <>
      <Card className="p-0 border border-0" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={imgSrc} />
        {planet && (
          <Card.Body>
            <Card.Title>{planet.name}</Card.Title>
            <div key={planet.id}>
              <ul>
                <li>Population: {planet.population}</li>
                <li>Climate: {planet.climate}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link
                  to={"/planetdescription/" + planet.name + "/" + planet.uid}
                >
                  <Button variant="outline-primary" className="mt-2">
                    See more!
                  </Button>
                </Link>
                <Button
                  variant="outline-warning"
                  className="mt-2"
                  onClick={
                    fav
                      ? () => actions.deleteFavorite(favId)
                      : () => actions.addFavorite(planet, "planet")
                  }
                >
                  {fav && <i className="fa-solid fa-heart"></i>}
                  {!fav && <i className="fa-regular fa-heart"></i>}
                </Button>
              </div>
            </div>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default Planets;
