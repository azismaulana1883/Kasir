import React from "react";
import "../css/SearchBox.css";

function SearchBox({ searchTerm, onSearchChange, onClearSearch, resultsCount, totalCount }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari nama barang..."
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={onClearSearch} className="clear-search">
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-info">
          Menampilkan {resultsCount} dari {totalCount} item
        </div>
      )}
    </div>
  );
}

export default SearchBox;