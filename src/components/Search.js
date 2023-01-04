import React, { useContext, useState } from "react";
import "./Search.css";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { RegContext } from "../context";

const Search = ({ setInput }) => {
  const [menu, setShowMenu] = useState(false);
  const { region, setRegion } = useContext(RegContext);
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const menuShowHandler = () => {
    setShowMenu(!menu);
  };

  const regionHandler = (reg) => {
    setRegion(reg);
    setShowMenu(!menu);
  };

  return (
    <article className="article">
      <div className="search_content">
        <div className="search_div">
          <BiSearch className="icon" />
          <input
            onChange={inputChangeHandler}
            id="country"
            placeholder="Search for a country..."
          />
        </div>
        <div className="select-menu">
          <div className="select-btn">
            <span className="sBtn-text">{region}</span>
            <FiChevronDown onClick={menuShowHandler} />
          </div>
          <ul className={menu ? "options" : "hide"}>
            {regions.map((el) => {
              return (
                <li
                  key={el}
                  onClick={() => regionHandler(el)}
                  className="option"
                >
                  <span className="option-text">{el}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Search;
