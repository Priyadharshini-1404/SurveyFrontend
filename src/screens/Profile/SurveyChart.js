import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function SurveyChart({ route }) {
  const { surveyList } = route.params; // surveys passed from ProfileScreen
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const statusMap = { Pending: 0, "In Progress": 1, Completed: 2 };
  const statusLabels = ["Pending", "In Progress", "Completed"];

  useEffect(() => {
    if (surveyList && surveyList.length > 0) {
      // X-axis: Dates
      const labels = surveyList.map((s) =>
        new Date(s.SurveyDate).toLocaleDateString()
      );

      // Y-axis: status numbers
      const dataPoints = surveyList.map((s) => statusMap[s.Status] || 0);

      setChartData({
        labels,
        datasets: [
          {
            data: dataPoints,
            strokeWidth: 2,
          },
        ],
      });
    }
  }, [surveyList]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Survey Status Over Time</Text>

        {chartData.datasets.length > 0 ? (
          <LineChart
            data={chartData}
            width={screenWidth - 16}
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#fff" },
            }}
            bezier
            fromZero
            segments={2} // divides y-axis into 3 parts (0,1,2)
            formatYLabel={(y) => statusLabels[parseInt(y)]} // map numbers to status
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        ) : (
          <Text>No survey data available</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: "#fff" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a74da",
    marginBottom: 10,
  },
});
