import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="text-center">
          <Link to="/">
            <div className="navbar-brand">
              <img
                src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
                alt="StarWars Logo"
                height="100"
              />
            </div>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {store.user ? (
            <>
              <div className="ml-auto me-2">
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
                    {store.user.favorites.length === 0 ? (
                      <Dropdown.Item key="0" className="d-flex">
                        <div className="me-1">Empty</div>
                      </Dropdown.Item>
                    ) : (
                      store.user.favorites.map((favorite) => (
                        <div key={favorite.id}>
                          <Dropdown.Item key={favorite.id} className="d-flex">
                            <div className="me-1">{favorite.name}</div>
                            <div
                              className="ms-auto ps-3"
                              onClick={() =>
                                actions.deleteFavorite(favorite.id)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </div>
                          </Dropdown.Item>
                        </div>
                      ))
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item as="div">
                      <Link to="/private">See all favorites</Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Link to="/">
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      actions.resetUser();
                    }}
                  >
                    LogOut
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-primary me-2">SignUp</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-secondary">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
