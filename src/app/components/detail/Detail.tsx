/*  2024-04-23 18:09:21


*/

"use client";
import React, { useContext } from "react";
import "./detail.css";
import DetailHeader from "./detailHeader/DetailHeader";
import DetailOptions from "./detailOptions/DetailOptions";
import DetailFooter from "./detailFooter/DetailFooter";

const Detail = () => {
  const userName = "John Doe";

  return (
    <div className="detail flex flex-col w-1/4 p-5">
      <DetailHeader userName={userName} />
      <DetailOptions />
      <DetailFooter />
    </div>
  );
};

export default Detail;
