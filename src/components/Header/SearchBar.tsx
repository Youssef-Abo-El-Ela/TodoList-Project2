import { Form } from "react-bootstrap";
import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [currentTodos] = useLocalStorageState();

  useEffect(() => {
    const timeHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeHandler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const debouncedSearchTerm = useDebounce(searchText, 300);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const searchEvent = new CustomEvent("searchTodos", { detail: debouncedSearchTerm });
    window.dispatchEvent(searchEvent);
  }, [debouncedSearchTerm]);

  return (
    <Form className={`d-flex ${styles.searchForm}`}>
      <Form.Control
        type="search"
        placeholder="Search..."
        aria-label="Search for todos"
        className={styles.searchInput}
        onChange={handleSearchTextChange}
        value={searchText}
      />
    </Form>
  );
}
