import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeState } from "../enums/theme";
import { ThemeContextType } from "../interfaces/ThemeContext";



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme , setTheme] = useState(()=>{
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme) return savedTheme

        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            return ThemeState.DARK
        }

        return ThemeState.LIGHT
    })

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove(ThemeState.LIGHT, ThemeState.DARK)
        root.classList.add(theme)

        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === ThemeState.DARK ? ThemeState.LIGHT : ThemeState.DARK)
    }

    const value  = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

};


export const useTheme = ()=>{
    const context =  useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context;
}