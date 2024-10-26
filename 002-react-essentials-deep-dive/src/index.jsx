import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);

// Alternative approach, here, instead of using JSX, we are using the createElement method which is converted from JSX during the build process
// ReactDOM.createRoot(entryPoint).render(React.createElement(App));
