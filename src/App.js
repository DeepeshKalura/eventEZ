import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer.js";
import Navbar from "./Components/Navbar.js";
import backgroundImg from "./Assets/backgroundImage.webp"

function App() {
  return (
    <>
      <div 
      className="App flex flex-col">
        <Navbar />

        <Outlet />

        <Footer />
      </div>
    </>
  );
}

export default App;
