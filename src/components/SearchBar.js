import React from "react";

export default function SearchBar({ searching, query }) {
  return (
    <div>
      <Search
        autoFocus
        type="text"
        className="search text-popins"
        placeholder="Search by title"
        value={query}
        onChange={searching}
      />
    </div>
  );
}

let Search = styled.input`
  /* Searchbar*/
  .search {
    padding: 0.4rem;
    background-color: #dfdcd6;
    color: coral;
    border-color: var(--Blue);
  }
  .search::placeholder {
    color: var(--mainBlue);
  }
`;
