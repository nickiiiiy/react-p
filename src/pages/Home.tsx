import React from "react";

import qs from "qs";
import axios from "axios";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
  FilterSliceState,
} from "../redux/slices/filterSlice";
import {
  setItems,
  fetchPizzas,
  selectPizzaData,
  SearchPizzaParams,
} from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
        currentPage: String(currentPage),
      })
    );
    // setIsLoading(false);

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // if (!isSearch.current) {
    getPizzas();
    // }
    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // если был первый рендер, то проверяем url-параметры и сохраняем в редукс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      // if (sort) {
      //   params.sortBy = sort;
      // }
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      // dispatch(
      //   setFilters({
      //     ...params,
      //     sort,
      //   })
      // );
      isSearch.current = true;
    }
  }, [window.location.search]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
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
            : items.map((obj: any) => (
                // <Link key={obj.id} to={`/pizza/${obj.id}`}>
                <PizzaBlock
                  key={obj.id}
                  // id={obj.id}
                  // title={obj.title}
                  // price={obj.price}
                  // imageUrl={obj.imageUrl}
                  // sizes={obj.sizes}
                  // types={obj.types}
                  {...obj}
                />
                // </Link>
              ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
