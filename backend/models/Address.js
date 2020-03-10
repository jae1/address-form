const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Address = new Schema({
  country: String,
  address1: {
    type: String,
    required: [true, 'Address1 is required.'],
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  address2: {
    type: String,
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  address3:{
    type: String,
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  locale: {
    type: String,
    required: [true, 'Locale is required.'],
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  region: {
    type: String,
    required: [true, 'Region is required.'],
    match: [/^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$/, 'is invalid']
  },

  postalCode: {
    type: String,
    required: [true, 'Postal Code is required.'],
    match: [/^(\w*\s*)+$/, 'is invalid']

  }
}, {
  collection: 'addresses'
});

module.exports = mongoose.model('Address', Address);
