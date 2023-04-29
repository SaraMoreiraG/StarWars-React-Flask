const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      characteres: [],
      vehicles: [],
      vehicleInfo: [],
      planets: [],
      planetInfo: [],
      favorites: JSON.parse(localStorage.getItem("favorites")),
    },

    actions: {
      checkLocalStorage: () => {
        const store = getStore();

        if (localStorage.getItem("favorites") == null)
          localStorage.setItem("favorites", JSON.stringify(["Empty"]));
        store.favorites = JSON.parse(localStorage.getItem("favorites"));

        if (localStorage.getItem("vehicles") == null)
          getActions().loadVehicles();
        if (localStorage.getItem("planets") == null) getActions().loadPlanets();
      },

      loadVehicles: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/vehicles");
          const data = await response.json();
          localStorage.setItem("vehicles", JSON.stringify(data.results));
          setStore({ vehicles: data.results });
        } catch (err) {
          console.log(err);
        }
      },

      loadPlanets: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/planets");
          const data = await response.json();
          localStorage.setItem("planets", JSON.stringify(data.results));
          setStore({ planets: data.results });
        } catch (err) {
          console.log(err);
        }
        // fetch('https://www.swapi.tech/api/planets')
        // .then(response => response.json())
        // .then(data => setStore({ planets: data.results }))
      },

      getVehicle: async (id) => {
        try {
          const response = await fetch(
            "https://www.swapi.tech/api/vehicles/" + id
          );
          const data = await response.json();
          localStorage.setItem(
            "Vehicle" + id,
            JSON.stringify(data.result.properties)
          );
          setStore({ vehicleInfo: data.results });
        } catch (err) {
          console.log(err);
        }
      },

      getPlanet: async (id) => {
        try {
          const response = await fetch(
            "https://www.swapi.tech/api/planets/" + id
          );
          const data = await response.json();
          localStorage.setItem(
            "Planet" + id,
            JSON.stringify(data.result.properties)
          );
          setStore({ planetInfo: data.results });
        } catch (err) {
          console.log(err);
        }
        // const store = getStore();

        // fetch (url)
        // .then(response => response.json())
        // .then(data => setStore({ planetInfo: [...store.planetInfo, data.result.properties] }));
      },

      saveFavorite: (name) => {
        const localFavorites = JSON.parse(localStorage.getItem("favorites"));
        let i;
        let alreadyFav = false;

        if (localFavorites[0] == "Empty") localFavorites.splice(0, 1);

        for (i = 0; i < localFavorites.length; i++) {
          if (localFavorites[i] === name) {
            alreadyFav = true;
            break;
          }
        }

        if (alreadyFav) localFavorites.splice(i, 1);
        else localFavorites.push(name);

        if (localFavorites.length == 0) localFavorites.push("Empty");

        localStorage.setItem("favorites", JSON.stringify(localFavorites));
        setStore({ favorites: JSON.parse(localStorage.getItem("favorites")) });
      },

      deleteFavorite: (key) => {
        const localFavorites = JSON.parse(localStorage.getItem("favorites"));

        localFavorites.splice(key, 1);
        if (localFavorites.length == 0) localFavorites.push("Empty");

        localStorage.setItem("favorites", JSON.stringify(localFavorites));
        setStore({ favorites: JSON.parse(localStorage.getItem("favorites")) });
      },
    },
  };
};

export default getState;
