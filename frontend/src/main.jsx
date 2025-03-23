import React from "react";
import ReactDOM from "react-dom/client";
/*import { createRoot } from 'react-dom/client'*/
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />  {/*we have wrapped the App component inside the StoreContextProvider and BrowserRouter*/} {/*Now we have the support of context API in our project*/}
    </StoreContextProvider>
  </BrowserRouter>
);
