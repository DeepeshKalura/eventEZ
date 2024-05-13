import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import { Outlet } from "react-router-dom";

import Footer from "./Components/Footer.js";
import Navbar from "./Components/Navbar.js";

function App() {
  return (
    <>
     <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    </>
  );
}

export default App;
