import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Characteres({ personInfo }) {
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
        isFav: favorites.some((favorite) => favorite.name === personInfo.name),
        favId:
          favorites.find((favorite) => favorite.name === personInfo.name)?.id ||
          null,
      }));
    }
  }, [store.user, personInfo.name]);

  const imgSrc =
    "https://starwars-visualguide.com/assets/img/characters/" +
    personInfo.uid +
    ".jpg";

  return (
    <>
      <Card className="p-0 border border-0" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={imgSrc} />
        {personInfo && (
          <Card.Body>
            <Card.Title>{personInfo.name}</Card.Title>
            <div key={personInfo.uid}>
              <ul>
                <li>Gender: {personInfo.gender}</li>
                <li>Hair Color: {personInfo.hair_color}</li>
                <li>Eye Color: {personInfo.eye_color}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link
                  to={
                    "/chardescription/" + personInfo.name + "/" + personInfo.uid
                  }
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
                            setFav((prevState) => ({
                              ...prevState,
                              isFav: false,
                            }));
                          }
                        : () => {
                            actions.addFavorite(personInfo, "character");
                            setFav((prevState) => ({
                              ...prevState,
                              isFav: true,
                            }));
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

export default Characteres;
