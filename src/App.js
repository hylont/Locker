import React, { useState } from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.jsx";
import { ToastContainer } from "react-toastify";
import LockersBoard from "./components/LockersBoard.jsx";
import HomeBoard from "./components/HomeBoard.jsx";
import './i18n';
import { useTranslation} from "react-i18next";


const ROOT = document.querySelector("#root");

function App() {
  const [t, i18n] = useTranslation();
  const [selectedBoard, setSelectedBoard] = useState("Home");

  const selectBoard = (boardName) => {
    setSelectedBoard(boardName);
  };

  return (
    <>
    <ToastContainer />
      <Nav onSelectBoard={selectBoard} t={t} i18n={i18n}/>
      <div id="board">
        <div id="title-container">
          <h2 id="title">{t(`nav.menu.${selectedBoard.toLowerCase()}`)}</h2>
          <hr></hr>
        </div>
        <div id="main-container">
          {selectedBoard === "Home" && <HomeBoard t={t} />}
          {selectedBoard === "Lockers" && <LockersBoard t={t} />}
        </div>
      </div>
    </>
  );
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  ROOT
);
