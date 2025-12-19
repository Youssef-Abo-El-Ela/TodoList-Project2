import PieChart from "./StatisticsPieChart";
import styles from "./HomePage.module.css";
import TodoViewer from "./TodoViewer";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Button } from "react-bootstrap";
import SearchBar from "../Header/SearchBar";

function HomePage() {
  const [currentTodos] = useLocalStorageState();

  return currentTodos === "[]" ? (
    <div style={{ textAlign: "center" }}>
      <h2>No todos available. Please add some todos.</h2>
      <Button href="/add" className={styles.btn_primary}>
        Add Todo
      </Button>
    </div>
  ) : (
    <div className={styles.homepage}>
      <PieChart />
      <h1>My Todos</h1>
      <Button href="/add" className={styles.btn_primary}>
        Add Todo
      </Button>
      <SearchBar/>
      <TodoViewer />
    </div>
  );
}

export default HomePage;
