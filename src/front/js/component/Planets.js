import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Planets({ planet }) {
  const { store, actions } = useContext(Context);
  const [fav, setFav] = useState({
    isFav: false,
    favId: null,
  });

  useEffect(() => {
    if (store.user) {
      const favorites = store.user.favorites || [];
      setFav((prevFav) => ({
        ...prevFav,
        isFav: favorites.some((favorite) => favorite.name === planet.name),
        favId:
          favorites.find((favorite) => favorite.name === planet.name)?.id ||
          null,
      }));
    }
  }, [store.user, planet.name]);

  let imgSrc =
    "https://starwars-visualguide.com/assets/img/planets/" +
    planet.uid +
    ".jpg";

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
                {store.user && (
                  <Button
                    variant="outline-warning"
                    className="mt-2"
                    onClick={
                      fav.isFav
                        ? () => {
                            actions.deleteFavorite(fav.favId);
                            setFav({
                              isFav: false,
                              favId: null,
                            });
                          }
                        : () => {
                            actions.addFavorite(planet, "planet");
                            setFav({
                              isFav: true,
                              favId: null,
                            });
                          }
                    }
                  >
                    {fav.isFav && <i className="fa-solid fa-heart"></i>}
                    {!fav.isFav && <i className="fa-regular fa-heart"></i>}
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

export default Planets;
