const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword, emailAlreadyInUse } = require('../../utils/validators');
const{ generateSign } = require('../../utils/jwt');


const login = async(req,res) => {
    try {
        const userData = await User.findOne({ email: req.body.email})
        if(!userData){
            return res.status(404).json({message:'invalid email address'});
        }
        if(!bcrypt.compareSync(req.body.password , userData.password)){
            return res.status(404).json({message:'invalid password'});
        }
        const token = generateSign(userData._id, userData.email)
        return res.status(200).json({userData, token});
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

const register = async(req,res) => {
    try {
        const newUser = new User(req.body);
        if(!validateEmail(newUser.email)){
            return res.status(400).send({message:'invalid email'})
        }
        if(!validatePassword(newUser.password)){
            return res.status(400).send({message:'invalid password'})
        }
        if(await emailAlreadyInUse(newUser.email) > 0){
            return res.status(400).send({message:'Email is alredy in use'})
        }
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const created = await newUser.save();
        return res.status(201).json(created);
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

const checksession = async(req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

module.exports = {login,register,checksession};

