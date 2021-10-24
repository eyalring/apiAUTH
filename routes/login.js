
const loginRouter = require('express').Router();
const validator = require('../validation');
const User = require('../model/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

loginRouter.post('/login',async (req,res) => {
    const {error} = validator.loginValidation(req.body);
    if(error){
     return res.status(400).send("request is invalid")
    }

    const user = await User.findOne({email : req.body.email});
    if(!user){
       return res.status(400).send('could not find user');
    }
    console.log(user);
    const valid = bcrypt.compareSync(req.body.password,user.password);
    if(!valid){
        return  res.status(403).send("cannot login , user name or pass is incorrect");
    }

    const token = jwt.sign({_id : user._id} ,process.env.TOKEN);
    res.header('auth-token', token).send(token);

})


module.exports = loginRouter;