import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../css/piechart.css';

// Register the components with Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Product Categories',
      data: [],
      backgroundColor: []
    }]
  });

  useEffect(() => {
    const fetchPieChart = async () => {
      try {
        const apiUrl = selectedMonth
          ? `http://localhost:1234/api/piechart/${selectedMonth}`
          : `http://localhost:1234/api/piechart`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && Object.keys(data).length > 0) {
          const labels = Object.keys(data);
          const values = Object.values(data);
          const colors = generateColors(labels.length);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Product Categories',
                data: values,
                backgroundColor: colors,
              }
            ]
          });
        } else {
          console.warn('No data received from API');
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchPieChart();
  }, [selectedMonth]);

  const generateColors = (count) => {
    const colors = [];
    const colorPalette = ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,159,64,0.6)', 'rgba(153,102,255,0.6)', 'rgba(255,205,86,0.6)'];
    for (let i = 0; i < count; i++) {
      colors.push(colorPalette[i % colorPalette.length]);
    }
    return colors;
  };

  return (
    <div className="pcontainer">
      <div className="pheader">
        <h3 className="ptitle">Product Categories Pie Chart</h3>
      </div>
      {chartData.labels && chartData.labels.length > 0 ? (
        <div className="pchartContainer">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      return `${label}: ${value}`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default PieChart;
