const axios=require('axios');
const Orderdetail = require('../models/orderdetail');

function initializer(){
    return{
        async seeddata(req,res){
             try{
                const seedata= await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');  
                if(seedata)
                {
                    const orderdetails=seedata.data;

                    Orderdetail.insertMany(orderdetails);
                }
            res.status(200).send("Database initializer successfull")
             }catch(error)
             {
                es.status(500).send('Error initializing database');
            }
             
        }
    }
}

module.exports=initializer;