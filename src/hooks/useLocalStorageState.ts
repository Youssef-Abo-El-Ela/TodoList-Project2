import { useState } from "react"


export const useLocalStorageState = () => {

    const initialTodos = window.localStorage.getItem('todos') ?? '[]'

    const [currentTodos, setCurrentTodos] = useState(initialTodos)


    return [currentTodos, setCurrentTodos] as const
}