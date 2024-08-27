import "./search-style.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetWeatherByCityQuery, weatherApi } from "../../store/apiSlice";
export default function Search({ onSearch }) {
  const [searchCity, setSearchCity] = useState("Lahore");

  function handleChange(event) {
    const value = event.target.value;
    setSearchCity(value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchCity);
    }
  }

  return (
    <div>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter city..."
          value={searchCity}
          onChange={handleChange}
        />
        <button className="search-button">Search</button>
      </form>
    </div>
  );
}
