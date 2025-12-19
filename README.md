**Todo App — Local Development & Overview**

**Run Locally**

- **Install dependencies:** Run `npm install` in the project root.
- **Start dev server:** Run `npm start` and open http://localhost:3000.
- **Build for production:** Run `npm run build`.

**Project Purpose**

This repository is a small Todo application built with React + TypeScript. It demonstrates basic state management, theming, local persistence, and a multi-page UI.

**Major Components & Responsibilities**

- **`src/App.tsx`**: App shell and top-level routing; wires up context providers.
- **`src/index.tsx`**: Application entry; renders `App` into the DOM and registers performance reporting.
- **`src/context/ThemeContext.tsx`**: Theme provider and context for light/dark mode.
- **`src/hooks/useLocalStorageState.ts`**: Custom hook that persists state to `localStorage` and provides a stable API for components.
- **`src/enums/theme.ts`**: Theme-related enums used by the context and UI.
- **`src/interfaces/Todos.ts`**: Type definitions for todo items and related data shapes.
- **`src/interfaces/ThemeContext.ts`**: Type definition for the theme context value.

Components:

- **`src/components/Header/NavBar.tsx`**: Top navigation and layout wrapper; contains the app title and primary actions.
- **`src/components/Header/SearchBar.tsx`**: Search input for filtering todos by title/description.
- **`src/components/Header/ThemeButton.tsx`**: Toggles app theme via `ThemeContext`.
- **`src/components/HomePage/HomePage.tsx`**: Main todo list page — orchestrates list rendering, filtering and summary widgets.
- **`src/components/HomePage/TodoViewer.tsx`**: Renders the list of todos and handles selection/navigation to details.
- **`src/components/HomePage/StatisticsPieChart.tsx`**: Small visual summary of todo status (completed vs active).
- **`src/components/AddTodoPage/AddTodoPage.tsx`**: Form for creating a new todo; validates input and saves via local state hook.
- **`src/components/TodoDetailsPage/TodoDetailsPage.tsx`**: Shows a single todo's full details and allows editing/completing/removal.

**Data & Persistence**

- The app stores todos in `localStorage` via `useLocalStorageState`, so no backend is required.

**Useful Notes**

- Static assets (favicon, manifest) live in the `public/` folder.
