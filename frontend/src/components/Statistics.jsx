import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/statistics.css'; 

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const url = selectedMonth
          ? `http://localhost:1234/api/statistics/${selectedMonth}`
          : `http://localhost:1234/api/statistics`;

        console.log(`Fetching statistics from: ${url}`);
        const response = await axios.get(url);
        
        if (response.data) {
          console.log('Fetched statistics:', JSON.stringify(response.data, null, 2));
          setStatistics(response.data);
        } else {
          console.warn('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  console.log('Rendered statistics:', JSON.stringify(statistics, null, 2));

  return (
    <div className="statistics-container">
      <h3>Transactions Statistics</h3>
      <p>Total Sale Amount: <span className="stat-value">{statistics.totalSales.toFixed(2)} Rs</span></p>
      <p>Total Sold Items: <span className="stat-value">{statistics.totalSoldItems}</span></p>
      <p>Total Not Sold Items: <span className="stat-value">{statistics.totalNotSoldItems}</span></p>
    </div>
  );
};

export default Statistics;
