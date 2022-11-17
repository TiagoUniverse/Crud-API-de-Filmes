const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movie = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  director: {
    type: String
  },
  price: {
    type: Number
  }
},{
    collection: 'movie'
});

module.exports = mongoose.model('Movie', Movie);