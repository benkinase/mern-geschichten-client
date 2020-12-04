import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--button-color-0) !important;
  transition: var(--mainTransition);
  &:hover {
    text-decoration: none;
    color: white !important;
  }
`;
export default (props) => <StyledLink {...props} />;
