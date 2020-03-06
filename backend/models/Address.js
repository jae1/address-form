const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Address = new Schema({
  country: String,
  address1: {
    type: String,
    required: [true, 'Address1 is required.'],
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  address2: String,
  address3: String,
  locale: {
    type: String,
    required: [true, 'Locale is required.'],
    match: [/^[A-z]+$/, 'is invalid']

  },

  region: {
    type: String,
    required: [true, 'Region is required.'],
    match: [/^[A-z]+$/, 'is invalid']
  },

  postalCode: {
    type: String,
    required: [true, 'Postal Code is required.'],
    match: [/^\d{5}$/, 'is invalid']

  }
}, {
  collection: 'addresses'
});

module.exports = mongoose.model('Address', Address);
