import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer.js";
import Navbar from "./Components/Navbar.js";

function App() {
  return (
    <>
     <div className="App ">
      <Navbar/>
      <div className="px-16 py-6">
      <Outlet />
      </div>
      <Footer />
    </div>
    </>
  );
}

export default App;
