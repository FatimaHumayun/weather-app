import React, { useState } from "react";
import Search from "../components/search/Search.jsx";
import temperatureog from "../assets/temperatureog.png";
import weather from "../assets/weather.jpg";
import wind from "../assets/wind.jpg";
import RecentSearches from "../components/recent-Searches/RecentSearch.jsx";
import {
  useGetWeatherByCityQuery,
  useGetWeatherByCoordsQuery,
} from "../store/apiSlice.js";
import "./directory.css";
import Loader from "../components/loader/Loader.jsx";

function Directory() {
  const [city, setCity] = useState("Lahore");
  const [recentSearches, setRecentSearches] = useState([]);

  const { data, error, isLoading } = useGetWeatherByCityQuery(city);

  // Manage state for unit
  const [unit, setUnit] = useState("K");
  const unitQuery =
    unit === "K" ? "metric" : unit === "C" ? "metric" : "imperial";
  const { cData, cError, cIsLoading } = useGetWeatherByCoordsQuery({
    lat: "-0.1257",
    lon: "51.5085",
    units: unitQuery,
  });

  function isValidCity(cityName) {
    //  validation check for city
    return cityName && cityName.trim().length >= 2;
  }

  function handleSearchedCity(enteredCity) {
    const trimmedCity = enteredCity.trim();

    if (!isValidCity(trimmedCity)) {
      alert("Please enter a valid city name.");
      return;
    }

    // Update the city state
    setCity(trimmedCity);

    setRecentSearches((prevSearches) => {
      // Check for duplicates
      const isDuplicate = prevSearches.some(
        (search) => search.city.toLowerCase() === trimmedCity.toLowerCase()
      );

      if (isDuplicate) return prevSearches;

      // Add new search and limit to the last 5 searches
      const updatedSearches = [...prevSearches, { city: trimmedCity }].slice(
        -5
      );
      return updatedSearches;
    });
  }

  function toggleUnit() {
    setUnit((prevUnit) => {
      if (prevUnit === "K") return "C";
      if (prevUnit === "C") return "F";
      return "K";
    });
  }

  return (
    <>
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <div className="weather-container">
        <Search onSearch={handleSearchedCity} />
        <RecentSearches searches={recentSearches} />
        {isLoading && (
          <>
            <Loader />
            <p>Loading...</p>
          </>
        )}

        {error && (
          <p className="error-text">Location not Found: {error.message}</p>
        )}
        {data && data.main && data.weather && (
          <div className="weather-details">
            <h2>Weather for {data.name}</h2>
            <p>
              <img
                src={temperatureog}
                alt="temperature"
                className="weather-icon"
              ></img>
              <strong>Temperature:</strong> {data.main.temp}°
              {unit === "K" ? "K" : unit === "C" ? "C" : "F"}
            </p>
            <p>
              <img src={weather} alt="weather" className="weather-icon"></img>
              <strong>Weather:</strong> {data.weather[0].main}
            </p>
            <p>
              <img src={wind} alt="wind-speed" className="weather-icon"></img>
              <strong>Wind Speed:</strong> {data.wind.speed} m/s
            </p>
            <button className="toggle-button" onClick={toggleUnit}>
              Switch to{" "}
              {unit === "K"
                ? "Celsius"
                : unit === "C"
                ? "Fahrenheit"
                : "Kelvin"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Directory;
