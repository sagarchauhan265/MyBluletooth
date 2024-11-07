// import react, { useEffect, useState } from "react";


// const useFetch = (url) => {
//     const [data, setdata] = useState(null);

//     useEffect(() => {
//         fetch(url)
//             .then(response => response.json())
//             .then(data => setdata(data))
//             .catch((e) => console.log("tech eror", e));
//     }, [url]);
//     console.log("useFetch", data)
//     return [data];
// };

// export default useFetch;


import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error));
  }, [url]);
  
  return [data, error];
};

export default useFetch;