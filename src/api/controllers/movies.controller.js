const Movies = require('../models/movies.model');

const getMovies = async (req, res) => {
    try{
        const allMovies = await Movies.find();
        return res.status(200).json(allMovies);
    }catch(error){
        return res.status(500).json(error);
    }
}

const getMoviesByDirector = async (req, res) => {
    try{
        const{director} = req.params;
        const directorMovies = await Movies.find({director:director});
        return res.status(200).json(directorMovies);
    }catch(error){
        return res.status(500).json(error);
    }   
}

const getMoviesById = async (req, res) => {
    try{
        const{id} = req.params;
        const movieId = await Movies.findById(id);
        !movieId ? res.status(404).json({'message' : 'movie not found'}) : res.status(200).json(movieId);
    }catch(error){
        return res.status(500).json(error);
    }
}

const getMoviesByTitle = async (req, res) => {
    try {
        const{title} = req.params;
        const moviesByTittle = await Movies.find({title:title});
        !moviesByTittle ? res.status(404).json({'message': 'no matches'}) : res.status(200).json(moviesByTittle);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getMoviesByGenre = async (req, res) => {
    try {
        const{genre} = req.params;
        const moviesByGenre = await Movies.find({genre:genre});
        !moviesByGenre ? res.status(404).json({'message' : 'movie not found'}) : res.status(200).json(moviesByGenre);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getMoviesByYear = async (req, res) => {
    try {
        const{year} = req.params;
        const moviesByYear = await Movies.find({year:year});
        !moviesByYear ? res.status(404).json({'message' : 'no matches'}) : res.status(200).json(moviesByYear);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getMoviesByLastYear = async (req, res) => {
    try{
        const {year} = req.params;
        const movieYearLast = await Movies.find({year:{$gt:2010}})
        !movieYearLast ? res.status(404).json({'message':'no matches'}) : res.status(200).json(movieYearLast);
    }catch(error){
        return res.status(500).json(error)  
    }
}

const postMovies = async (req, res) => {
    try{
        console.log(req.body);
        const newMovie = new Movies(req.body);
        const createMovie = await newMovie.save();
        return res.status(201).json(createMovie);
    }catch(error){
        return res.status(500).json(error);
    }
}

const putMovies = async (req , res) => {
    try{
        const{id} = req.params;
        const putMovies = new Movies(req.body);
        putMovies._id = id;
        const updateMovies = await Movies.findByIdAndUpdate(id, putMovies , {new:true});
        !updateMovies ? res.status(404).json({'message' : 'movie not found'}) : res.status(200).json(updateMovies);
    }catch(error){
        return res.status(500).json(error);
    }
}

const deleteMovies = async (req , res) => {
    try{
        const{id} = req.params;
        const deleteMovie = await Movies.findByIdAndDelete(id);
        ! deleteMovie ? res.status(404).json({'message' : 'movie not found'}) : res.status(200).json(deleteMovie);
    }catch(error){
        return res.status(500).json(error);
    }
}


module.exports = {
    getMovies ,
    getMoviesByDirector, 
    postMovies,
    putMovies,
    deleteMovies,
    getMoviesById,
    getMoviesByTitle,
    getMoviesByGenre,
    getMoviesByYear,
    getMoviesByLastYear
};

