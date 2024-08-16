const axios = require('axios');  // Make sure to include axios
const PORT = process.env.PORT || 1234;  // Use environment variable or default to 1234

function combinedhandler() {
    return {
        async combined(req, res) {
            const { month } = req.params;
            const selectedMonth = parseInt(month);


            if (!selectedMonth) {
                return res.status(400).json({ error: 'Month is required' });
            }

            try {
                const statisticsResponse = await axios.get(`http://localhost:${PORT}/api/statistics/${selectedMonth}`);
                const barChartResponse = await axios.get(`http://localhost:${PORT}/api/barchart/${selectedMonth}`);
                const pieChartResponse = await axios.get(`http://localhost:${PORT}/api/piechart/${selectedMonth}`);

                res.json({
                    statistics: statisticsResponse.data,
                    barChart: barChartResponse.data,
                    pieChart: pieChartResponse.data,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Error fetching combined data' });
            }
        }
    }
}

module.exports = combinedhandler;
