import React from "react";
import styled from "styled-components";

export default function SearchBar({ searching, query }) {
  return (
    <div>
      <Search
        autoFocus
        className="search"
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
  max-width: 150px;
  padding: 0.3rem;
  background-color: var(--clr-white-1);
  color: var(--clr-primary-1);
  border-color: var(--clr-grey-1);
  border-top-left-radius: 0.9rem;
  border-bottom-right-radius: 0.9rem;
  &::placeholder {
    color: var(--general-yellow);
  }
  &:focus {
    outline: none;
  }
`;
