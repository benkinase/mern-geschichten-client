import React from "react";

export default function SearchBar({ searching, query }) {
  return (
    <div>
      <input
        autoFocus
        type="text"
        className="search"
        placeholder="Search by title"
        value={query}
        onChange={searching}
      />
    </div>
  );
}
