const User = require('../models/UserModel.js');


exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send({user});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({users});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}