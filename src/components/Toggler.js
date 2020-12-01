import React from "react";
import styled from "styled-components/macro";

export const Toggler = (props) => {
  let drawClass = "menu-btn";

  if (props.isOpen) {
    drawClass = "menu-btn open";
  }
  return (
    <TogglerContainer onClick={props.toggle}>
      <div className={drawClass} id="nav-btn">
        <div className="menu-btn-burger"></div>
      </div>
    </TogglerContainer>
  );
};

const TogglerContainer = styled.div`
  /*.nav-toggle starts*/
  margin-top: -0.7rem;
  .menu-btn {
    position: relative;
    width: 50px;
    cursor: pointer;
    height: 60px;
    transition: all 0.5s ease-in-out;
    display: flex;
    align-items: center;
    transition: var(--mainTransition);
  }
  .menu-btn:hover {
    opacity: 0.7;
  }

  .menu-btn-burger {
    width: 40px;
    height: 5px;
    background-color: var(--ham-color-2);
    border-radius: 5px;
    box-shadow: 0 2px 5px var(--ham-color-1);
    transition: all 0.5s ease-in-out;
  }

  .menu-btn-burger::before,
  .menu-btn-burger::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 5px;
    background-color: var(--ham-color-3);
    border-radius: 5px;
    box-shadow: 0 2px 5px var(--ham-color-1);
    transition: all 0.5s ease-in-out;
  }

  /*separate the before and after bars:(Y-axis)*/
  .menu-btn-burger::before {
    transform: translateY(-15px);
  }

  .menu-btn-burger::after {
    transform: translateY(15px);
  }

  /*Animation*/
  /*targeting the .menu-btn-burger */
  .menu-btn.open .menu-btn-burger {
    transform: translate(-50px); /*positioning*/
    background: transparent;
    box-shadow: none;
  }

  /*targeting the .menu-btn-burger::before */
  .menu-btn.open .menu-btn-burger::before {
    transform: rotate(-45deg) translate(35px, 35px);
  }

  /*targeting the .menu-btn-burger::after */
  .menu-btn.open .menu-btn-burger::after {
    transform: rotate(45deg) translate(35px, -35px);
  }

  @media screen and (min-width: 800px) {
    .menu-btn {
      display: none;
    }
  }
`;
