import React from "react";

import qs from "qs";
import axios from "axios";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  // const currentPage = useSelector((state) => state.filter.pageCout);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //  ПЕРЕНОС в РЕДАКС
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
  const fetchPizzas = () => {
    setIsLoading(true);
    // const search = searchValue ? `&search=${searchValue}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    axios
      .get(
        `https://65b63a6ada3a3c16ab006363.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.sortProperty.replace(
          "-",
          ""
        )}&order=${order}&search=${searchValue}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
                // {...obj}
              />
            ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
