const postRouter = require('express').Router();
const verify = require('./verifyToken')

postRouter.get('/post', verify, (req,res) => {
    res.json({
        posts : {
            title : 'my first post' ,
            description : 'my first description'
        }
    });
});

module.exports = postRouter;