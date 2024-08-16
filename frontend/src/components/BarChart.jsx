import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../css/barchart.css';

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateColors = (count) => {
  const colors = [];
  const colorPalette = ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,159,64,0.6)', 'rgba(153,102,255,0.6)', 'rgba(255,205,86,0.6)'];
  for (let i = 0; i < count; i++) {
    colors.push(colorPalette[i % colorPalette.length]);
  }
  return colors;
};

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: []
    }]
  });

  useEffect(() => {
    const fetchBarChart = async () => {
      try {
        const apiUrl = selectedMonth
          ? `http://localhost:1234/api/barchart/${selectedMonth}`
          : `http://localhost:1234/api/barchart`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.length > 0) {
          const labels = data.map(item => item.priceRange);
          const values = data.map(item => item.count);
          const colors = generateColors(values.length);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Number of Items',
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

    fetchBarChart();
  }, [selectedMonth]);

  useEffect(() => {
    console.log('Updated chartData:', chartData);
  }, [chartData]);

  return (
    <div className='container'>
      <div className="header">
        <h3 className="title">Transactions Bar Chart</h3>
      </div>
      {chartData.labels && chartData.labels.length > 0 ? (
        <div className="chartContainer">
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  type: 'linear', 
                  title: {
                    display: true,
                    text: 'Number of Items',
                  },

                },
                x: {
                  type: 'category', 
                  title: {
                    display: true,
                    text: 'Price Range',
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default BarChart;