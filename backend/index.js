const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors=require('cors');
const userroute = require('./src/routes/routes');

const PORT = 1234;

const url = 'mongodb+srv://myechakar:RcnlzsYXAMV5tygO@cluster0.jnqqg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use(cors({
  origin:'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}))
app.use('/', userroute);

app.listen(PORT, () => {
    console.log(`Server Started listening on PORT ${PORT}`);
});
