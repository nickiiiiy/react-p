import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayot: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayot;