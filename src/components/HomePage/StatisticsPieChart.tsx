import { useEffect, useMemo } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { Todo } from "../../interfaces/Todos";

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
  //   const todos = localStorage.getItem("todos");

  const todos = JSON.stringify([
    { title: "Task 1", completed: true, content: "Content 1" },
    { title: "Task 2", completed: true, content: "Content 2" },
    { title: "Task 3", completed: true, content: "Content 3" },
    { title: "Task 4", completed: false, content: "Content 4" },
  ]);
  const todoList = useMemo(() => {
    const parsedTodos = todos ? JSON.parse(todos) : [];

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
  }, [todos]);

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
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
    </PieChart>
  );
}
