import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Characteres(personInfo) {
  const [person, setPerson] = useState(personInfo.person);
  // console.log(person);

  const character = JSON.parse(localStorage.getItem("Character " + person.uid));

  async function getPerson(url) {
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem(
      "Character " + personInfo.person.uid,
      JSON.stringify(data.result.properties)
    );
    setPerson([...setPerson, [data.result.properties]]);
    console.log(data.result.properties);
    console.log(person);
  }

  const imgSrc =
    "https://starwars-visualguide.com/assets/img/characters/" +
    personInfo.person.uid +
    ".jpg";

  let fav = false;

  useEffect(() => {
    // if (localStorage.getItem("Character" + personInfo.person.uid) == null)
    getPerson(personInfo.person.url);
    console.log("UseEffect esto enviamos:");
    console.log(personInfo.person.url);
  }, []);

  // if (character) {
  //   for (let i = 0; i < store.favorites.length; i++) {
  //     if (store.favorites[i] == character.name) fav = true;
  //   }
  // }

  return (
    <>
      <Card className="p-0 border border-0" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={imgSrc} />

        {/* {character && (
          <Card.Body>
            <Card.Title>{personInfo.person.name}</Card.Title>
            <div key={person}>
              <ul>
                <li>Gender: {character.gender}</li>
                <li>Hair Color: {character.hair_color}</li>
                <li>Eye Color: {character.eye_color}</li>
              </ul>
              <div className="d-flex justify-content-between">
                <Link to={"/chardescription/" + character.name + "/" + person}>
                  <Button variant="outline-primary" className="mt-2">
                    Learn more!
                  </Button>
                </Link>
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
          </Card.Body>
        )} */}
      </Card>
    </>
  );
}

export default Characteres;
