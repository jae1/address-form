const express = require('express');
const app = express;
const addressRoute = express.Router();


// Address model
let Address = require('../models/Address');

// Read All Countries
addressRoute.get('/country', (req, res) => {
    Address.find({}, {'country': 1}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
  });

// Read All Addresseses
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
addressRoute.post('/create', (req, res, next) => {
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
addressRoute.get('/read/:id', (req, res) => {
  Address.findById(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send('ID Not Found');
    }
    res.json(data);
    console.log('ID Found.')
  })
})

// Search a single address
addressRoute.get('/search', (req, res) => {
  Address.findOne(req.query, (error, data) => {
    if (error) {
      res.status(500).send('Error');
    }
    res.json(data);
    console.log('Search successful.')
  })
})

// Test same address in two countries
addressRoute.get('/searchAll', (req, res) => {
  Address.find({
    "country": new RegExp(req.body.country, "gi"),
    "address1": new RegExp(req.body.address1, "gi"),
    "address2": new RegExp(req.body.address2, "gi"),
    "address3": new RegExp(req.body.address3, "gi"),
    "locale": new RegExp(req.body.locale, "gi"),
    "region": new RegExp(req.body.region, "gi"),
    "postalCode": new RegExp(req.body.postalCode, "gi")
  }, (error, data) => {
    if (error) {
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