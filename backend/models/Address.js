const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Address = new Schema({
  country: String,
  address1: {
    type: String,
    required: [true, 'Address required.'],
    //match: "^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$"
  },

  address2: String,
  address3: String,
  locale: {
    type: String,
    required: [true, 'Locale required.'],
    //match: "^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$"
  },

  region: {
    type: String,
    required: [true, 'Region required.'],
    //match: "^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$"
  },

  postalCode: {
    type: String,
    required: [true, 'Postal Code required.'],
    //match: "^(\w*\s*[\#\-\,\/\.\(\)\&]*)+$"
  }
}, {
  collection: 'addresses'
});

module.exports = mongoose.model('Address', Address);


// Define collection and schema
// let Address = new Schema({
//       country,
//       address1: [{
//          display: String,
//          columnName: String,
//          pattern: String
//       }],

//       address2: [{
//          display: String,
//          columnName: String,
//          pattern: String
//       }],

//       address3: [{
//          display: String,
//          columnName: String,
//          pattern: String
//       }],

//       locale: [{
//          display: String,
//          columnName: String,
//          pattern: String
//       }],

//       region: [{
//          display: String,
//          columnName: String,
//          pattern: String,
//          name: [String]
//       }],

//       postalCode: [{
//          display: String,
//          columnName: String,
//          pattern: String
//       }],

//       required: [String]
// }, {
//    collection: 'addresses'
// });
