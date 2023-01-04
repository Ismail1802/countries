import React from "react";
import "./Header.css";
import { BsFillMoonFill } from "react-icons/bs";

const Header = ({ mode, setMode }) => {
  return (
    <header data-theme={mode ? "dark" : "light"} className="header">
      <h2>Where in the world?</h2>
      <p>
        <BsFillMoonFill />
        <span
          onClick={() => {
            setMode(!mode);
          }}
        >
          {mode ? "Light mode" : "Dark mode"}
        </span>
      </p>
    </header>
  );
};

export default Header;
