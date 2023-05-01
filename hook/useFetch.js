import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const API_KEY = RAPID_API_KEY;

const useFetch = (obj) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${obj.endpoint}`,
    params:
      obj.endpoint === "search"
        ? {
            query:
              obj.localized == "localized"
                ? `${obj.search} in ${obj.location}`
                : `${obj.search}`,
          }
        : { job_id: obj.id },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  console.log(options);

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
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
