import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const getCountry = async (lat, lon) => {
    await fetch(
      `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=davideclaypool`
    )
      .then((resp) => resp.json())
      .then((resp) => setLocation(resp.geonames[0].toponymName))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location not granted");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      getCountry(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  return location;
};

export default useLocation;
