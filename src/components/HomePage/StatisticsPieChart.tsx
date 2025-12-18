import { useEffect, useMemo } from "react";
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { Todo } from "../../interfaces/Todos";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const [currentTodos] = useLocalStorageState();

  const todoList = useMemo(() => {
    const parsedTodos = currentTodos ? JSON.parse(currentTodos) : [];

    const completedTodos: Todo[] = parsedTodos.filter(
      (todo: Todo) => todo.completed === true
    );
    const pendingTodos: Todo[] = parsedTodos.filter(
      (todo: Todo) => todo.completed === false
    );
    return [
      { name: "Completed", value: completedTodos.length },
      { name: "Pending", value: pendingTodos.length },
    ];
  }, [currentTodos]);


  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "400px",
        maxHeight: "60vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={todoList}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
      >
        {todoList.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
}
