import { useEffect, useState  } from "react";
import type { CarData } from "../types";

function CarList() {
  const [cars, setCars] = useState<CarData[]>([]);

  const getCars = () => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching cars");

      return response.json();
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err));
  }

  useEffect(() => {
    getCars();
  }, []);

  return(
    <></>
  );
}

export default CarList;