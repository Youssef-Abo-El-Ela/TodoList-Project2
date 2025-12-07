import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/Header/NavBar";
import React, { useState } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
});

function App() {
  const [theme , setTheme] = useState('light')
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{theme , setTheme}}>
        <NavBar />
        <Routes>
          <Route element={<HomePage />} path="/"/>
        </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
