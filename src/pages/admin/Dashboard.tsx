import { useState, useEffect } from "react";
import ChartComponent from "../../components/admin/Chart";
import PieChartComponent from "../../components/admin/PieChart";
import { DashboardStats } from "../../lib/definitions";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";


  const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  
    useEffect(() => {
      // Simulated API response (Dummy Data)
      const dummyData: DashboardStats = {
        totalUsers: 1200,
        totalPosts: 5400,
        reportedPosts: 150,
        dailyPosts: [
          { date: "2024-02-20", count: 120 },
          { date: "2024-02-21", count: 140 },
          { date: "2024-02-22", count: 180 },
          { date: "2024-02-23", count: 200 },
          { date: "2024-02-24", count: 250 },
        ],
        accountTypes: { public: 900, private: 300 },
      };
  
      // Simulate API delay
      setTimeout(() => {
        setDashboardStats(dummyData);
      }, 1000); // Simulating a 1-second delay
    }, []);
  
  if (!dashboardStats) return <p>Loading...</p>;

  return (
    <Box sx={{ padding: 3 }}>
      {/* Stats Section */}
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography>{dashboardStats.totalUsers}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Posts</Typography>
            <Typography>{dashboardStats.totalPosts}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Reported Posts</Typography>
            <Typography>{dashboardStats.reportedPosts}</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Charts Section */}
      <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Daily Posts Chart</Typography>
          <ChartComponent stats={dashboardStats} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Public vs Private Accounts</Typography>
          <PieChartComponent stats={dashboardStats} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
