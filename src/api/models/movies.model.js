const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema( 
    {
        title: {type:String ,required : true},
        director: {type:String, required: true},
        year: {type: String, required:true},
        genre: {type:String , required: true}
    },{
        timestamps: true
    }
)
const Movies = mongoose.model('movies', moviesSchema);

module.exports = Movies;