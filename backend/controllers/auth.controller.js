const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');

// signin endpoint
exports.signIn = async (req, res) => {
    try{
        let user = await User.findOne({user_name: req.body.user_name});
        if(!user) {
            return res.status(401).send({error: "User not found"});
        }
        if(!user.authenticate(req.body.password)){
            return res.status(401).send({error: "Username and password don't match"});
        }
    
    const token = jwt.sign({user_name: user.user_name}, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjcyNzU1NCwiaWF0IjoxNzA2NzI3NTU0fQ.vNymv_ch6QX7CKgLLRsd1mluQmyPD88ThwlYY-imcn0");
    res.cookie("t", token, {expire: new Date() + 9999});
    return res.json({
        token,
        user: {
            _id: user._id,
            user_name: user.user_name,
            email: user.email,
            role: user.role
        }
    })

    }catch(error){
        res.status(401).json({error: "Could not sign in"});
    }
}

//signout endpoint

exports.signOut = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({message: "Signed out"});
}