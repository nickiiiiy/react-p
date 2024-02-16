import logo from "./logo.svg";
import "./App.css";
import "./scss/app.scss";
import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import FullPizza from "./pages/FullPizza";
import MainLayot from "./layouts/MainLayot";

// export const SearchContext = React.createContext();

function App() {
  // const [searchValue, setSearchValue] = React.useState("");

  return (
    <Routes>
      <Route path="/" element={<MainLayot />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
