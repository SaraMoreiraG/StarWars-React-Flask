import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Characteres({ personInfo }) {
  const { store, actions } = useContext(Context);
  const [fav, setFav] = useState(null);
  const [favId, setFavId] = useState(null);

  const imgSrc =
    "https://starwars-visualguide.com/assets/img/characters/" +
    personInfo.uid +
    ".jpg";

  useEffect(() => {
    (async () => {
      const favorites = await store.user;

      if (favorites && store.user.favorites) {
        store.user.favorites.forEach((item) => {
          if (item.name == personInfo.name) {
            setFav(true);
            setFavId(item.id);
          }
        });
      }
    })();
  });

  async function deleteFavorite(id) {
    console.log("Deleting");
    console.log(id);
    setFav(false);
    // const response = await fetch(
    //   process.env.BACKEND_URL + "/favorite/people/" + id,
    //   {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // if (response.ok) setFav(true);
  }

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
                <Button
                  variant="outline-warning"
                  className="mt-2"
                  onClick={
                    fav
                      ? () => {
                          setFav(false);
                          actions.deleteFavorite(favId);
                          console.log(fav);
                        }
                      : () => actions.addFavorite(personInfo, "character")
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

export default Characteres;
