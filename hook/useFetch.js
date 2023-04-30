import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";
import * as Location from "expo-location";

const API_KEY = RAPID_API_KEY;

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  console.log(location);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      query: `data analyst in ${location}`,
      num_pages: 2,
    },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error(error);
      alert("There is an error fetching the data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
