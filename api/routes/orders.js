const express = require('express');
const router = express.Router();

// handle incoming GET requeststo /orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Order was created'
  });
});

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    orderId: req.params.orderId
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order deletec',
    orderId: req.params.orderId
  });
});

module.exports = router;