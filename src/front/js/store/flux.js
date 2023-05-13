const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characteres: [],
      planets: [],
      user: null,
    },

    actions: {
      getCharacteres: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/people");
        const data = await response.json();
        setStore({ characteres: data.data });
      },

      getPlanets: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/planets");
        const data = await response.json();
        setStore({ planets: data.data });
      },

      getUser: async () => {
        const token = sessionStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + "/api/user",
          options
        );
        const data = await response.json();
        if (response.ok) {
          setStore({ user: data });
        }
      },

      addFavorite: async (favorite, type) => {
        const token = sessionStorage.getItem("token");
        let newFav = {};

        if (type == "character") {
          newFav = {
            name: favorite.name,
            people_id: favorite.id,
            key: "character",
          };
        } else if (type == "planet") {
          newFav = {
            name: favorite.name,
            planet_id: favorite.id,
            key: "planet",
          };
        }

        const response = await fetch(
          process.env.BACKEND_URL + "/api/favorite",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(newFav),
          }
        );
        if (response.ok) {
          getActions().getUser();
        }
      },

      deleteFavorite: async (id) => {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          process.env.BACKEND_URL + "/api/favorite/" + id,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.ok) {
          await getActions().getUser();
        }
      },
    },
  };
};

export default getState;
