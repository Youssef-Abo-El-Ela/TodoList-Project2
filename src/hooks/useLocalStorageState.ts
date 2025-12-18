import { useEffect, useState } from "react"


export const useLocalStorageState = () => {

    const [currentTodos, setCurrentTodos] = useState(()=>window.localStorage.getItem('todos') ?? '[]')

    useEffect(()=>{
        localStorage.setItem('todos' , currentTodos)
    }, [currentTodos])

    return [currentTodos, setCurrentTodos] as const
}