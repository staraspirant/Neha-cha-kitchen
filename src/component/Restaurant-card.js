import React from "react";
import { CDN_URL } from "../utils/constant";
const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, costForTwo, avgRating } =
    resData?.info;
  const { deliveryTime } = resData?.info?.sla;
  return (
    <div className="p-4 m-4 w-52 bg-gray-200">
      <div>
        <img
          className="res-logo"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />

        <h4>{name}</h4>
        <h4>{cuisines.join(" , ")}</h4>
        <h4>{costForTwo}</h4>
        <h4>{deliveryTime}min</h4>
        <h4>{avgRating} Rating</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
