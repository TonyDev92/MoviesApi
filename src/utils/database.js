const mongoose = require('mongoose');

const connect = async () => {
    try{
        const db = await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const { name , host} = db.connection;
        console.log(`conected to ${name}DB in host: ${host}`);
    }catch(error){
        console.log(`error al conectar a la base de datos ${error}`);
    }
}

module.exports = {connect};