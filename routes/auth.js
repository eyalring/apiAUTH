
const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../model/user');
const validator = require('../validation')
const brcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');


router.post('/register', async (req,res) => {
    console.log("req",req.body);

    const { error } = validator.registerVallidation(req.body)
    if(error){
        res.status(400).send('schema is incorrect')
    }
   
    const emailExists = await User.findOne({email : req.body.email});
    if(emailExists){
        return res.status(400).send('user already exists(email)')
    }

    const salt = await brcrypt.genSaltSync(10)
    /*.then((err,salt) => {
bcrypt.hash(req.body.password,salt)*/
 //   });
    console.log(salt);
    const hashedpassword = await brcrypt.hash(req.body.password,salt);
    console.log(hashedpassword);
    const user = new User({
        name :req.body.name,
        email : req.body.email,
        password : hashedpassword
    })
    console.log(user.password)
    console.log(user.name)
    console.log(user.email)

    try{
        console.log("reached here")
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err){
        console.log(err)
        res.status(400).send(err)
    }
    
});

module.exports = router;