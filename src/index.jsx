//index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppWithAuthProvider from "./component/App";
import { Provider } from "react-redux"; // Import the Provider
import store from "./component/utils/redirect"; // Import your Redux store

const container = document.getElementById("root");

ReactDOM.createRoot(container).render(
  <Provider store={store}>
    <AppWithAuthProvider />
  </Provider>
);
