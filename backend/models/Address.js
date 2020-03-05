const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

let Address = new Schema({
   country: String,
   address1: String,
   address2: String,
   address3: String,
   locale: String,
   region: String,
   postalCode: String
}, {
collection: 'addresses'
});

let format = new Schema({

});

module.exports = mongoose.model('Address', Address);