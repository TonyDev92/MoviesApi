const User = require("../api/models/user.model");

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(String(email).toLocaleLowerCase())
}

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Minimo 8 characteres al menos 1 letra mayuscula y una minuscula y un numero
    return regex.test(String(password));
}
const emailAlreadyInUse = async (email) => {
    const users = await User.find({email:email})
    return users.length;
}
module.exports = {validateEmail , validatePassword, emailAlreadyInUse};