import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../App";


export default function ThemeButton(){
    const {theme , setTheme} = useContext(ThemeContext);
    
    const toggleTheme = ()=>{
        setTheme(theme=== "light" ? "dark" : "light")
    }

    return(
        <Button onClick={toggleTheme} className={`text-nowrap ${theme === 'light' ? 'btn-dark' : 'btn-light'}`}>
            {theme === 'light' ? 'Dark' : 'Light'} mode
        </Button>
    )
}