import "./App.css";
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
