import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TicketApp from "./TicketApp";
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./context/UIContext";

ReactDOM.render(
  <BrowserRouter>
    <TicketApp />
  </BrowserRouter>,
  document.getElementById("root")
);
