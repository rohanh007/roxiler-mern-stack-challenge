const Orderdetail=require('../models/orderdetail')
function homepagecontroller() {
    return {
      async index(req, res) {
        const { page = 1, perPage = 10, search = '', month } = req.query;
  
        try {
          const query = {};
  
         
          if (search) {
            const searchConditions = [
              { title: new RegExp(search, 'i') }, 
              { category: new RegExp(search, 'i') } 
            ];
  
            if (!isNaN(search)) {
              const numericSearch = parseFloat(search);
              searchConditions.push({ price: numericSearch }); 
            }
  
            query.$or = searchConditions;
          }
  
          if (month) {
            const monthNumber = parseInt(month, 10);
  
            if (monthNumber >= 1 && monthNumber <= 12) {
              query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, monthNumber]
              };
            } else {
              return res.status(400).json({ error: "Invalid month parameter" });
            }
          }
  
          console.log('Constructed Query:', query); 
  
          const orders = await Orderdetail.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));
  
          const total = await Orderdetail.countDocuments(query);
  
          res.status(200).json({
            orders,
            totalPages: Math.ceil(total / perPage),
            currentPage: Number(page),
          });
        } catch (error) {
          console.log('Error fetching transactions:', error);
          res.status(500).send('Error fetching transactions');
        }
      }
    };
  }
  
  module.exports = homepagecontroller;
  