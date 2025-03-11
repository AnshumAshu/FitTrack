import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import ProgressLineChart from "../charts/ProgressLineChart";
import FitnessRadarChart from "../charts/FitnessRadarChart";
import WorkoutBarChart from "../charts/WorkoutBarChart";
// import ResistanceBarChart from "../charts/ResistanceBarChart";
import DietPieChart from "../charts/DietPieChart";
import { getMe } from "../utils/API";
import Auth from "../utils/auth";
import Header from "../components/Header";
const Status = () => {
  const [cardioData, setCardioData] = useState([]);
  const [resistanceData, setResistanceData] = useState([]);
  const [dietData, setDietData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        console.log(user.cardio);
        // Set the cardio, resistance, and diet data here
        setCardioData(user.cardio || []);
        setResistanceData(user.resistance || []);
        setDietData(user.diet || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedIn]);

  // Show loading message until data is fetched
  if (loading) return <Typography align="center">Loading...</Typography>;

  return (
    <>
      <Header />
      <Container className="status-container">
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
          User Fitness Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Weekly Progress Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, boxShadow: 3 }}>
              <Typography variant="h6" align="center">
                Weekly Progress
              </Typography>
              {/* Pass the cardioData to the chart */}
              <ProgressLineChart cardioData={cardioData} />
            </Paper>
          </Grid>

          {/* Fitness Level Breakdown Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, boxShadow: 3 }}>
              <Typography variant="h6" align="center">
                Fitness Level Breakdown
              </Typography>
              <FitnessRadarChart
                cardioData={cardioData}
                resistanceData={resistanceData}
                dietData={dietData}
              />
            </Paper>
          </Grid>

          {/* Workout Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, boxShadow: 3 }}>
              <Typography variant="h6" align="center">
                Workout Distribution
              </Typography>
              <WorkoutBarChart
                cardioData={cardioData}
                resistanceData={resistanceData}
              />
            </Paper>
          </Grid>

          {/* Diet Adherence Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, boxShadow: 3 }}>
              <Typography variant="h6" align="center">
                Diet Adherence
              </Typography>
              <DietPieChart dietData={dietData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Status;
