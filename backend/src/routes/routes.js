const express=require('express');
const router=express.Router();
const initializer=require('../controllers/initializer');
const homepage=require('../controllers/homepagecontroller'); 
const statistics=require('../controllers/statistics');   
const barcharthandler = require('../controllers/barcharthandler');
const piecharthandler = require('../controllers/piecharthandler');
const combinedhandler = require('../controllers/combinedhandler');


// Routes //

router.get('/insertseeddata',initializer().seeddata);
//localhost:1234/api/allorders?page=1&perPage=10&search=productName&month=January
router.get('/api/allorders',homepage().index);
router.get('/api/statistics/:month?',statistics().calculation);
router.get('/api/barchart/:month?',barcharthandler().barchart);
router.get('/api/piechart/:month?',piecharthandler().piechart);
router.get('/api/combined/:month',combinedhandler().combined);






module.exports =router;