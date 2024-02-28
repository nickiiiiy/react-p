import React from "react";
import axios from "axios";
import styles from "./FullPizza.module.scss";
import { useParams, useNavigate, Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  }>();
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
    return (
      <>
        <div className="content_error-info">
          <h1>Идёт загрузка... 😕</h1>
          <p>Страница загружается, пожалуйста, подождите.</p>
        </div>
      </>
    );
  }
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.right_block}>
          <img className={styles.img} src={pizza.imageUrl}></img>
          <h2>{pizza.title}</h2>
          <p className={styles.price}>от {pizza.price} ₽ </p>
        </div>
        <div className={styles.left_block}>
          <p className={styles.description}>{pizza.description}</p>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
