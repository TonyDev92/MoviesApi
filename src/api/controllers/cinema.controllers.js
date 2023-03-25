const Cinema = require('../models/cinema.model');

const getCinemas = async(req,res) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        return res.status(200).json(allCinemas);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postCinemas = async(req,res) => {
    try {
        const newCinema = new Cinema(req.body);
        const createdCinema = await newCinema.save();
        return res.status(200).json(createdCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putCinemas = async(req,res) => {
    try {
        const{id} = req.params;
        const putCinema = new Cinema(req.body);
        const{movieId} = req.body;
        putCinema._id = id;
        const updateCinema = await Cinema.findByIdAndUpdate(id, putCinema,{$push:{movies:movieId}}, {new:true});
        !updateCinema ? res.status(404).json({'message' : 'not found'}) : res.status(200).json(updateCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCinema = async(req,res) => {
    try {
        const{id} = req.params;
        const deleteCinema = await Cinema.findByIdAndDelete(id);
        !deleteCinema ? res.status(404).json({'message' : 'no matches'}) : res.status(200).json(deleteCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getCinemas,putCinemas,postCinemas,deleteCinema};