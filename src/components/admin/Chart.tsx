import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DashboardStats } from "../../lib/definitions";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ stats }: { stats: DashboardStats }) => {
  const data = {
    labels: ["Today"],
    datasets: [
      {
        label: "Posts",
        data: [stats.dailyPosts],
        backgroundColor: "#82b2c0",
      },
    ],
  };

  return <Bar data={data} />;
};

export default ChartComponent;
