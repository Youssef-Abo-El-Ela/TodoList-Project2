import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/Header/NavBar";


function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <div className="font" id="main">
          <Routes>
            <Route element={<HomePage />} path="/" />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
