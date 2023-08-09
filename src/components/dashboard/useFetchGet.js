import { useEffect, useState } from "react";

export function UseGet(url) {

    const [data, setData] = useState(null);

    useEffect (()=>{
      fetch(url)
      .then(response => response.json())
      .then(data => setData(data.contenido))
      .catch(error => console.log(error));
    })

    return {data}
};