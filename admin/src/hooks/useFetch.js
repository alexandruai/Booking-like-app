import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = async (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

 // console.log("UseEffect")
  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("FetchData ")
        const res = await axios.get(url);
        console.log("FetchData " + res.data)
        setData(res.data);
        console.log("FetchData after data set")
        return res.data;
      } catch (err) {
        console.log(err.message)
        setError(err);
      }
      setLoading(false);
    };

   fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      console.log("ReFetchData " + res.data)
      setData(res.data);
    } catch (err) {
        console.log(err.message)
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;