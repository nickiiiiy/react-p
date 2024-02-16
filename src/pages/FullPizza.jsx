import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          "https://65b63a6ada3a3c16ab006363.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return "Loading...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  );
};

export default FullPizza;
