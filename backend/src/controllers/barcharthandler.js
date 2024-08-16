const Orderdetail = require('../models/orderdetail');

function barcharthandler() {
    return {
        async barchart(req, res) {
            const { month } = req.params;
            const monthNumber = parseInt(month, 10);

            try {
                const priceRanges = [
                    { min: 0, max: 100 },
                    { min: 101, max: 200 },
                    { min: 201, max: 300 },
                    { min: 301, max: 400 },
                    { min: 401, max: 500 },
                    { min: 501, max: 600 },
                    { min: 601, max: 700 },
                    { min: 701, max: 800 },
                    { min: 801, max: 900 },
                    { min: 901, max: Infinity },
                ];

                const barChartData = [];

                for (const priceRange of priceRanges) {
                    let matchCondition = {
                        price: { $gte: priceRange.min, $lte: priceRange.max }
                    };

                    if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
                        matchCondition.$expr = {
                            $eq: [{ $month: "$dateOfSale" }, monthNumber]
                        };
                    }

                    const count = await Orderdetail.countDocuments(matchCondition);
                    const priceRangeLabel = `$${priceRange.min}-${priceRange.max}`;
                    barChartData.push({ priceRange: priceRangeLabel, count: count });
                }

                res.json(barChartData);
            } catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }
    };
}

module.exports = barcharthandler;
