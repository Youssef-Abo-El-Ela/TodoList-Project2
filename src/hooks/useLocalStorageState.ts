import { useEffect, useState } from "react"

export const useLocalStorageState = () => {
    const [currentTodos, setCurrentTodos] = useState< string>(() =>
        window.localStorage.getItem("todos") ?? "[]"
    )

    // Persist to localStorage and broadcast an in-window event so other
    // components/hooks in the same tab get notified.
    useEffect(() => {
        localStorage.setItem("todos", currentTodos)
        try {
            const event = new CustomEvent("todosUpdated", { detail: currentTodos })
            window.dispatchEvent(event)
        } catch (e) {
            // ignore if CustomEvent isn't supported
        }
    }, [currentTodos])

    // Listen for updates from other sources (other tabs via `storage` event,
    // or other components in the same tab via the custom `todosUpdated` event).
    useEffect(() => {
        const handleCustom = (e: Event) => {
            const ce = e as CustomEvent<string>
            const value = ce?.detail ?? window.localStorage.getItem("todos") ?? "[]"
            setCurrentTodos(value)
        }

        const handleStorage = (e: StorageEvent) => {
            if (e.key === "todos") {
                setCurrentTodos(e.newValue ?? "[]")
            }
        }

        window.addEventListener("todosUpdated", handleCustom as EventListener)
        window.addEventListener("storage", handleStorage as EventListener)

        return () => {
            window.removeEventListener("todosUpdated", handleCustom as EventListener)
            window.removeEventListener("storage", handleStorage as EventListener)
        }
    }, [])

    return [currentTodos, setCurrentTodos] as const
}