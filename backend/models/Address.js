const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Address = new Schema({
  country: String,
  address1: {
    type: String,
    required: [true, 'Address required.'],
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  address2: String,
  address3: String,
  locale: {
    type: String,
    required: [true, 'Locale required.'],
    match: [/^[A-z]+$/, 'is invalid']

  },

  region: {
    type: String,
    required: [true, 'Region required.'],
    match: [/^[A-z]+$/, 'is invalid']
  },

  postalCode: {
    type: String,
    required: [true, 'Postal Code required.'],
    match: [/^\d{5}$/, 'is invalid']

  }
}, {
  collection: 'addresses'
});

module.exports = mongoose.model('Address', Address);