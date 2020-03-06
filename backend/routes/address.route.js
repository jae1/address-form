const express = require('express');
const app = express();
const addressRoute = express.Router();

// Address model
let Address = require('../models/Address');

// Read All Countries
addressRoute.route('/country')
  .get((req, res) => {
    Address.find({}, {'country': 1}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
  });

// Read All Addresses Formats
addressRoute.route('/')
  .get((req, res) => {
    Address.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
  });

// Create Address
addressRoute.route('/create').post((req, res, next) => {
  Address.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
  const name = String(req.param);
});

// Read single Address
addressRoute.route('/read/:id').get((req, res) => {
  Address.findById(req.params.id, (error, data) => {
    if (error) {
      // return next(error)
      res.status(500).send('ID not found');
    }
    res.json(data);
    console.log('Read successfully.')
  })
})

// Search for single Address
addressRoute.route('/search').get((req, res) => {
  Address.findOne(req.query, (error, data) => {
    if (error) {
      // return next(error)
      res.status(500).send('Error');
    }
    res.json(data);
    console.log('Search successful.')
  })

})

// Update Address
addressRoute.route('/update/:id').put((req, res, next) => {
  Address.findOneAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data)
      console.log('Data updated.');
    }
  })
})

// Delete Address
addressRoute.route('/delete/:id').delete((req, res, next) => {
  Address.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
      console.log('Data deleted.');
    }
  })
})

module.exports = addressRoute;
