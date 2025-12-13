import { Button } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme} className={styles.button}>
      {theme === "light" ? "Dark" : "Light"} mode
    </Button>
  );
}
