import { useContext } from "react"
import { ThemeContext } from "../App"



function HomePage (){
    const {theme , setTheme} = useContext(ThemeContext)

    return(
        <div style={{ backgroundColor: theme === 'dark'? 'black': 'white' }}>
            Hello
        </div>
    )
}

export default HomePage