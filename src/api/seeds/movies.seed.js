const mongoose = require('mongoose');
const Movies = require('../models/movies.model');
const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.DB_URL;
const myMovies = [
    {
        title: 'The Matrix',
        director: 'Hermanas Wachowski',
        year: 1999,
        genre: 'Acción',
    },
    {
        title: 'The Matrix Reloaded',
        director: 'Hermanas Wachowski',
        year: 2003,
        genre: 'Acción',
    },
    {
        title: 'Buscando a Nemo',
        director: 'Andrew Stanton',
        year: 2003,
        genre: 'Animación',
    },
    {
        title: 'Buscando a Dory',
        director: 'Andrew Stanton',
        year: 2016,
        genre: 'Animación',
    },
    {
        title: 'Interestelar',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Ciencia ficción',
    },
    {
        title: '50 primeras citas',
        director: 'Peter Segal',
        year: 2004,
        genre: 'Comedia romántica',
    },
]

mongoose.set('strictQuery',true);

mongoose.connect(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})


.then(async() => {
    const allMovies = await Movies.find();
    allMovies.length > 0 ? await Movies.collection.drop() : console.log('Deleted Movies');
})

.catch((error) => console.log('error to erase movies', error))
.then(async () => {
    const MoviesMap = myMovies.map((e) => new Movies(e));
    await Movies.insertMany(MoviesMap);
    console.log('Inserted Movies');
})
.catch((error) => console.log('error to insert movies', error))
.finally(() => mongoose.disconnect());