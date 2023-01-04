import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
import React, { useState } from "react";
import { RegContext } from "./context";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";

function App() {
  const [mode, setMode] = useState(true);
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("Europe");
  const [item, setItem] = useState([]);

  return (
    <RegContext.Provider value={{ region, setRegion }}>
      <div data-theme={mode ? "dark" : "light"} className="app">
        <Header mode={mode} setMode={setMode} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                item={item}
                setItem={setItem}
                setInput={setInput}
                input={input}
              />
            }
          ></Route>
          <Route path="/name/:country" element={<Card />}></Route>
        </Routes>
      </div>
    </RegContext.Provider>
  );
}

export default App;
