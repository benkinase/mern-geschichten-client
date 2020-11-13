import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white !important;
  transition: var(--mainTransition);
  &:hover {
    text-decoration: none;
    color: yellowgreen !important;
  }
`;
export default (props) => <StyledLink {...props} />;
