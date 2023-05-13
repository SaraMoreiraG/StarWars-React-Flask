import React, {
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";

export const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav className="navbar navbar-dark bg-dark align-items-start px-4">
      <div className="mx-auto">
        <Link to="/">
          <div className="navbar-brand">
            <img
              src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
              alt="Bootstrap"
              height="100"
            />
          </div>
        </Link>
      </div>

      {store.user ? (
        <div className="d-flex">
          <div className="ml-auto">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Favorites
                {store.user.favorites && (
                  <span className="bg-secondary rounded ms-1 p-1">
                    {store.user.favorites.length}
                  </span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {store.user.favorites.length == 0 ? (
                  <>
                    <Dropdown.Item key="0" className="d-flex">
                      <div className="me-1">Empty</div>
                    </Dropdown.Item>
                  </>
                ) : (
                  store.user.favorites.map((favorite) => (
                    <div key={favorite.id}>
                      <Dropdown.Item key={favorite.id} className="d-flex">
                        <div className="me-1">{favorite.name}</div>
                        <div
                          className="ms-auto ps-3"
                          onClick={() => deleteFavorite()}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </Dropdown.Item>
                    </div>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Link to="/">
              <button
                className="btn btn-dark"
                onClick={() => {
                  sessionStorage.removeItem("token");
                }}
              >
                LogOut
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/signup">
            <button className="btn btn-primary me-2 mt-2">SignUp</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary mt-2">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
};
