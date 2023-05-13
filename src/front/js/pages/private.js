import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Context } from "../store/appContext";

import { Characteres } from "../component/Characteres";
import { Planets } from "../component/Planets";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getUser();
  }, []);

  return store.user ? (
    <div>
      <h2>Welcome {store.user.user_name}!</h2>
      <h3>Characteres</h3>
      {/* <Characteres /> */}
      {/* <div>
				<h3>Planets</h3>
				<PlanetCard />
			</div> */}
    </div>
  ) : (
    navigate("/login")
  );
};
