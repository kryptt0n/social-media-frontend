import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { DashboardStats } from "../../lib/definitions";

Chart.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ stats }: { stats: DashboardStats }) => {
  const data = {
    labels: ["Public Accounts", "Private Accounts"],
    datasets: [
      {
        data: [stats.accountTypes.public, stats.accountTypes.private],
        backgroundColor: ["#f6c7b3", "#c3dedd"],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };

  return (
    <div style={{ width: "350px", height: "350px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
