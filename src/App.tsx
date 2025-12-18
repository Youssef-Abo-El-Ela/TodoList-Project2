import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/Header/NavBar";
import TodoDetailsPage from "./components/TodoDetailsPage/TodoDetailsPage";
import AddTodoPage from "./components/AddTodoPage/AddTodoPage";


function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <div className="font" id="main">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<TodoDetailsPage/>} path="/view/:id"/>
            <Route element={<AddTodoPage/>} path="/add"/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
