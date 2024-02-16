import React from "react";

import qs from "qs";
import axios from "axios";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";

import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import {
  setItems,
  fetchPizzas,
  selectPizzaData,
} from "../redux/slices/pizzasSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // const { items, status } = useSelector((state) => state.pizza);
  // const { categoryId, sort, currentPage } = useSelector(
  //   (state) => state.filter
  // );
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  //  ПЕРЕНОС в РЕДАКС!
  // const { searchValue } = React.useContext(SearchContext);
  // const currentPage = useSelector((state) => state.filter.pageCout);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [items, setItems] = React.useState([]);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности(DESC)",
  //   sortProperty: "rating",
  // });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const getPizzas = async () => {
    // setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";

    // const res = await axios.get(
    //   `https://65b63a6ada3a3c16ab006363.mockapi.io/items?page=${currentPage}&limit=4&${
    //     categoryId > 0 ? `category=${categoryId}` : ""
    //   }&sortBy=${sort.sortProperty.replace(
    //     "-",
    //     ""
    //   )}&order=${order}&search=${searchValue}`
    // );
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        search,
        category,
        currentPage,
      })
    );
    // setIsLoading(false);

    window.scrollTo(0, 0);
  };

  //  (для парсинга ссылок с параметрами), если был первый рендер и изменили параментры
  React.useEffect(() => {
    if (isMounted.current) {
      const qerryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${qerryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // если был первый рендер, то проверяем url-параметры и сохраняем в редукс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status == "error" ? (
        <div className="content_error-info">
          <h1>Произошла ошибка 😕</h1>
          <p>
            К сожалению, не удалось получить товары. Попробуйте повторить
            попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status == "loading" // status это loading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => (
                <Link key={obj.id} to={`/pizza/${obj.id}`}>
                  <PizzaBlock
                    // key={obj.id}
                    // id={obj.id}
                    // title={obj.title}
                    // price={obj.price}
                    // imageUrl={obj.imageUrl}
                    // sizes={obj.sizes}
                    // types={obj.types}
                    {...obj}
                  />
                </Link>
              ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
