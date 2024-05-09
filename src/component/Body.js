import React, { useEffect, useState } from "react";
import RestaurantCard from "./restaurant-card";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantlist, setRestaurantList] = useState([]);
  const [searchtext, setSearch] = useState("");
  const [fiterRestaurants, setFilterRestaurant] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5158057&lng=73.9271644&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setRestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const OnlineStatus = useOnlineStatus();
  if (OnlineStatus === false) {
    return <h2>It Looks Like You Are Offline Please Check Your Internet</h2>;
  }

  if (restaurantlist.length === 0) {
    return <Shimmer />;
  }

  return (
    <>
      <div className="body">
        <div className="filter flex">
          <div className="search p-4 m-4">
            <input
              type="text"
              className="border border-black border-solid rounded-lg"
              value={searchtext}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 bg-green-100 m-4 rounded-lg"
              onClick={() => {
                console.log(searchtext);
                const filterRes = restaurantlist.filter((res) => {
                  return res?.info?.name
                    .toLowerCase()
                    .includes(searchtext.toLowerCase());
                });

                setFilterRestaurant(filterRes);
              }}
            >
              Search
            </button>
          </div>
          <div className="p-4 m-4">
            <button
              className="px-4 py-2 bg-green-100 m-4 rounded-lg"
              onClick={() => {
                const filterlist = restaurantlist.filter(
                  (res) => res.info.avgRating > 4.5
                );
                setRestaurantList(filterlist);
              }}
            >
              Top Rated Restaurant
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {fiterRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default Body;
