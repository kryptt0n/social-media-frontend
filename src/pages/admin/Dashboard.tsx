import { useState, useEffect } from "react";
import ChartComponent from "../../components/admin/Chart";
import PieChartComponent from "../../components/admin/PieChart";
import { DashboardStats } from "../../lib/definitions";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import { getStats } from "../../lib/actions";


  const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  
      useEffect(() => {
        getStats()
          .then(response => {
            console.log("API Response:", response);
            setTimeout(() => {
              setDashboardStats(response);
            }, 1000); 
          })
          .catch(error => console.error("Error fetching users:", error));
  
      // Simulate API delay
     // Simulating a 1-second delay
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
