import React, { useEffect, useState, useCallback, useContext } from "react";
import "./Main.css";
import { RegContext } from "../context";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Main = ({ input, setInput }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { region } = useContext(RegContext);

  const fetchCountries = useCallback(async () => {
    const response = await fetch(
      region === "Filter by Region"
        ? "https://restcountries.com/v3.1/all"
        : `https://restcountries.com/v3.1/region/${region.toLowerCase()}`
    );
    const flags = await response.json();
    setData(flags);
    setIsLoading(false);
  }, [region]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const inputValue = input.toLowerCase();

  const filteredData = data.filter((el) => {
    const name = el.name.official.toLowerCase();
    const altSpellings = el.altSpellings.toLocaleString().toLowerCase();
    if (input === "") {
      return el;
    } else {
      return altSpellings.includes(inputValue) || name.includes(inputValue);
    }
  });

  const errorDiv = (
    <div className="error">
      <h1>No such country!</h1>
    </div>
  );
  const url = useNavigate();

  return (
    <React.Fragment>
      <Search setInput={setInput} />
      <article className="main">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : !filteredData.length ? (
          errorDiv
        ) : (
          filteredData.slice(0, 20).map((country) => {
            return (
              <div
                onClick={() => {
                  url("/name/" + country.name.official);
                }}
                className="area"
                key={country.name.official}
              >
                <div className="image_container">
                  <img src={country.flags.png} alt="countries" />
                </div>
                <div className="area_text">
                  <h3>{country.name.official}</h3>
                  <p>
                    <span>Population:</span>{" "}
                    {country.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}
                  </p>
                  <p>
                    <span> Region:</span> {country.region}
                  </p>
                  <p>
                    <span>Capital:</span> {country.capital}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </article>
    </React.Fragment>
  );
};

export default Main;
