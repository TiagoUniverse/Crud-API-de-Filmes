const express = require('express');
const app = express();
const movieRoutes = express.Router();

let Movie = require('../model/Movie');

// api to add movie
movieRoutes.route('/add').post(function (req, res) {
  let movie = new Movie(req.body);
  movie.save()
  .then(movie => {
    res.status(200).json({'status': 'success','mssg': 'movie added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get movies
movieRoutes.route('/').get(function (req, res) {
  Movie.find(function (err, movies){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','movies': movies});
    }
  });
});

// api to get movie
movieRoutes.route('/movie/:id').get(function (req, res) {
  let id = req.params.id;
  Movie.findById(id, function (err, movie){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','movie': movie});
    }
  });
});

// api to update route
movieRoutes.route('/update/:id').put(function (req, res) {
    Movie.findById(req.params.id, function(err, movie) {
    if (!movie){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        movie.name = req.body.name;
        movie.description = req.body.description;
        movie.director = req.body.director;
        movie.price = req.body.price;

        movie.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
movieRoutes.route('/delete/:id').delete(function (req, res) {
  Movie.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = movieRoutes;
