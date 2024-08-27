import React from "react";
import "./recent-searches.css"; // Make sure to import the CSS file

export default function RecentSearches({ searches }) {
  return (
    <div className="recent-searches-container">
      <h3>Recent Searches:</h3>
      <div className="recent-searches-list">
        {searches.map((search, index) => (
          <div key={index} className="recent-search-item">
            {search.city}
          </div>
        ))}
      </div>
    </div>
  );
}
