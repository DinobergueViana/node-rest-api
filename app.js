const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// conecting to database
mongoose.connect(
  'mongodb+srv://dinobergviana:' + 
  process.env.MONGO_ATLAS_PW + 
  '@node-api-1.2n3wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)

// importing routes
const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// setting middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// this line will fix possibles cors problems
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, W-Requested-With, Content-Type, Accept, Authorization'
  );

  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

// routes which should handle requests
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;