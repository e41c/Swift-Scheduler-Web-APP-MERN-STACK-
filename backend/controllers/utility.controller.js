const User = require('../models/UserModel.js');

//add user
exports.createUser = async (req, res) => {
   
    try{
        const {user_name, firstName, lastName, email, password, role} = req.body;
        const user = new User({
            user_name,
            firstName,
            lastName,
            email,
            role: role || "student"
        });

        //setting the password using the virtual field
        
        user.password = password;
        await user.save();

        console.log('User saved successfully');
        console.log('Hashed Password:', user.hashed_password);
        res.status(200).send({ user });
    }catch(error){
        res.status(500).send({error: error.message});
    }
}
//list all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({users});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

//get user by username
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({user_name: req.params.username});
        if(!user) return res.status(404).send({error: "User not found"});
        res.status(200).send({user});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}
//delete user by username
exports.deleteUserByUsername = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({user_name: req.params.username});
        if(!user) return res.status(404).send({error: "User not found"});
        res.status(200).send({user});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}
//update user by username
exports.updateUserByUsername = async (req, res) => {
    try{
        let user = await User.findOne({user_name: req.params.username});
        if(!user) {
            return res.status(404).send({error: "User not found"});
        }
        user = Object.assign(user, req.body);
        await user.save();
    }catch(error){
        res.status(500).send({error: error.message});
    }

}