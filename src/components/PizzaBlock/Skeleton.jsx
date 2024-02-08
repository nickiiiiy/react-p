import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="18" />
    <rect x="0" y="313" rx="10" ry="10" width="280" height="88" />
    <rect x="-1" y="424" rx="10" ry="10" width="96" height="30" />
    <rect x="128" y="415" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
