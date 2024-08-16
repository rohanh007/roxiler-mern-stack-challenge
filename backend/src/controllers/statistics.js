const Orderdetail = require('../models/orderdetail');

function Statistics() {
    return {
        async calculation(req, res) {
            try {
                const { month } = req.params;

                let matchCondition = { $eq: ['$sold', true] };

                if (month) {
                    const monthNumber = parseInt(month);
                    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
                        return res.status(400).send('Invalid month');
                    }
                    matchCondition = {
                        $and: [
                            { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
                            { $eq: ['$sold', true] }
                        ]
                    };
                }

                // Total sales amount for sold items
                const totalSalesResult = await Orderdetail.aggregate([
                    {
                        $match: {
                            $expr: matchCondition
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: '$price' }
                        }
                    }
                ]);

                const totalSales = totalSalesResult[0]?.totalAmount || 0;

                // Count of sold items
                const totalSoldItems = await Orderdetail.countDocuments({
                    $expr: {
                        $and: [
                            ...(month ? [{ $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }] : []),
                            { $eq: ['$sold', true] }
                        ]
                    }
                });

                // Count of not sold items
                const totalNotSoldItems = await Orderdetail.countDocuments({
                    $expr: {
                        $and: [
                            ...(month ? [{ $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }] : []),
                            { $eq: ['$sold', false] }
                        ]
                    }
                });

                res.status(200).json({
                    totalSales,
                    totalSoldItems,
                    totalNotSoldItems
                });

            } catch (error) {
                console.error(error);
                res.status(500).send('Error fetching statistics');
            }
        }
    }
}

module.exports = Statistics;
