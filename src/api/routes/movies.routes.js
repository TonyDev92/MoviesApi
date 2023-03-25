const express = require('express');
const {
    getMovies ,
    getMoviesByDirector ,
    getMoviesById,
    postMovies ,
    putMovies , 
    deleteMovies,
    getMoviesByTitle,
    getMoviesByGenre,
    getMoviesByYear,
    getMoviesByLastYear
} = require('../controllers/movies.controller');
const router = express.Router();



router.get('/director/:director',getMoviesByDirector);
router.get('/lastYear/:lastyear' , getMoviesByLastYear);
router.get('/genre/:genre',getMoviesByGenre);
router.get('/title/:title',getMoviesByTitle);
router.get('/year/:year' , getMoviesByYear);
router.get('/:id', getMoviesById);
router.put('/:id',putMovies);
router.delete('/:id',deleteMovies);
router.post('/',postMovies);
router.get('/',getMovies);



module.exports = router;