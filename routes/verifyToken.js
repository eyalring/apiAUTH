const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Invalid Credentials');
    }

    try{
        const verified = jwt.verify(token,process.env.TOKEN);
        req.user = verified;

    }catch(err) {
        res.status(400).send('Invalid Token');
    }
    next();
}