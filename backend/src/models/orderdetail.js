const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    productId: String,
    id: Number,
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    category: String,
    image: String,
    sold: Boolean
});

const Orderdetail = mongoose.model('Orderdetail', transactionSchema);

module.exports = Orderdetail;
