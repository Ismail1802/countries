import React, { useCallback, useEffect } from "react";
import "./Card.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Card = () => {
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const url = useNavigate();

  const fetchSingle = useCallback(async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/name/" + params.country
    );
    const flagi = await response.json();
    setInfo(flagi[0]);
    setIsLoading(false);
  }, [params.country]);

  useEffect(() => {
    fetchSingle();
  }, [fetchSingle]);

  let native;
  let currencies;
  let languages;
  let borders;
  if (!isLoading) {
    native = info.name.nativeName[Object.keys(info.name.nativeName)[0]].common; // первый элемент
    currencies = info.currencies[Object.keys(info.currencies)[0]].name;
    languages = info.languages[Object.keys(info.languages)];
    if (info.borders) {
      borders = info.borders;
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <article className="detailed">
          <button className="back">
            <div
              onClick={() => {
                url("/");
              }}
            >
              <FaLongArrowAltLeft className="iconio" />
              <p>Back</p>
            </div>
          </button>
          <div className="detailed_content">
            <div>
              <img alt="flag" src={info.flags.png}></img>
            </div>
            <div>
              <h1 className="back">{info.name.common}</h1>
              <div className="detailed_desc">
                <div className="name-info">
                  <p>
                    <span>Native Name: </span>
                    {native}
                  </p>
                  <p>
                    <span>Population: </span>{" "}
                    {info.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}
                  </p>
                  <p>
                    <span>Region: </span>
                    {info.region}
                  </p>
                  <p>
                    <span>Sub-Region: </span>
                    {info.subregion}
                  </p>
                  <p>
                    <span>Capital: </span> {info.capital}
                  </p>
                </div>
                <div className="cur-info">
                  <p>
                    <span>Top Level Domain: </span> {info.tld[0]}
                  </p>
                  <p>
                    <span>Currencies: </span> {currencies}
                  </p>
                  <p>
                    <span>Languages: </span> {languages}
                  </p>
                </div>
              </div>
              {borders ? (
                <div className="footer">
                  <p>Border Countries:</p>
                  <div>
                    {borders.slice(0, 3).map((border) => {
                      return <button key={border}>{border}</button>;
                    })}
                  </div>
                </div>
              ) : (
                <h1 id="nobor">No borders</h1>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Card;
