const express = require('express');
const app = express();
const addressRoute = express.Router();

const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

// Search multiple addresses
addressRoute.route('/searchAll').get((req, res) => {
  Address.find(req.query, (error, data) => {
    if (error) {
      // return next(error)
      res.status(500).send('Error');
    }
    res.json(data);
    console.log('Search successful.')
  }).limit(10)
})


// Update Address
addressRoute.route('/update/:id').put((req, res, next) => {
  Address.findByIdAndUpdate(req.params.id, {
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
  Address.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
      console.log('Data deleted.');
    }
  })
})

module.exports = addressRoute;