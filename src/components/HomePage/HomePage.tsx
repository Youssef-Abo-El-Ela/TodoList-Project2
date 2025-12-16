import PieChart from "./StatisticsPieChart";
import styles from "./HomePage.module.css";
import TodoViewer from "./TodoViewer";

function HomePage() {
  return <div className = {styles.homepage}>
    {<PieChart/>}
    {<TodoViewer/>}
  </div>;
}

export default HomePage;
