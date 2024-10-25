import ReactDOM from "react-dom/client";

import App from "./App.jsx";
{/* 
  When we need to import css instead of adding style in index.html so that the css is also added to the final bundle and production safe path is used (css will load in dev build as well as prod build)
  It also helps with hot reloading since only edited files are imported again after changes.
*/}
import "./index.css";

// Fetch the div with id root from the index.html file and inject the complete react app
// Recursively generates the component tree from App and generate the html code and add it to the DOM.
const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
