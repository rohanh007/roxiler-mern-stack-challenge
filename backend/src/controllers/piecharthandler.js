const axios = require('axios');

function piecharthandler() {
    return {
        async piechart(req, res) {
            try {
                const { month } = req.params;
                const selectedMonth = month ? parseInt(month) : null;

                const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

                
                let products = response.data;
                if (selectedMonth) {
                    products = products.filter((product) => {
                        const saleMonth = new Date(product.dateOfSale).getMonth() + 1;
                        return saleMonth === selectedMonth;
                    });
                }

                const categories = {};
                products.forEach((product) => {
                    const { category } = product;
                    categories[category] = categories[category] ? categories[category] + 1 : 1;
                });

                res.json(categories);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
}

module.exports = piecharthandler;
