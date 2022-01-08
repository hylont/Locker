import React, { useState } from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.jsx";
import { toast, ToastContainer } from "react-toastify";
import LockersBoard from "./components/LockersBoard.jsx";
import HomeBoard from "./components/HomeBoard.jsx";

const ROOT = document.querySelector("#root");

async function clicked() {
  const RES = await window.locker.doSomething("That's kinda cool");
  console.info(RES);
}

function App() {
  const [selectedBoard, setSelectedBoard] = useState("Home");

  //let agarthaLogo = document.querySelector('#hidden-images #agartha-logo');

  const selectBoard = (boardName) => {
    setSelectedBoard(boardName);
  };

  return (
    <>
    <ToastContainer />
      <Nav onSelectBoard={selectBoard} />
      <div id="board">
        <div id="title-container">
          <h2 id="title">{selectedBoard}</h2>
          <hr></hr>
        </div>
        <div id="main-container">
          {selectedBoard === "Home" && <HomeBoard />}
          {selectedBoard === "Lockers" && <LockersBoard />}
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
