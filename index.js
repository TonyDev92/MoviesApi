const express = require('express');
const dotenv = require('dotenv');
const {connect} = require('./src/utils/database');
const routerMovies = require('./src/api/routes/movies.routes');
const routerCinemas = require('./src/api/routes/cinemas.routes');
const userRouter = require('./src/api/routes/users.routes');

dotenv.config();
const PORT = process.env.PORT || 9000;

const app = express();
connect();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/movies',routerMovies);
app.use('/cinemas',routerCinemas);
app.use('/user', userRouter);
app.listen(PORT, () => { 
    console.log(`listening on : http://localhost:${PORT}`);
})