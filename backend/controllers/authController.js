const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const signup = async(req, res) => {
    try{
        const { username, name, email, password, role } = req.body;
        const userName = username || name;
        const existingUser1 = await User.findOne({ username: userName })
        const existingUser2 = await User.findOne({ email })

        if(existingUser1 || existingUser2){
            return res.status(404).json({ success: false, message: 'User already exists!'})
        }

        const newUser = new User({ username: userName, email, password });
        await newUser.save();
        const user = await User.findOne({ username: userName, email })

        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: '24h'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        });
        res.status(200).json({ success: true, message: 'User Created Successfully!', data: {token, user: {_id: user._id, username: user.username, email: user.email, role: user.role}}})
    }catch(e){
        res.status(500).json({
            success: false,
            message: 'User is not created',
            error: e.message
        });
    }
}

// Registers a vendor/seller account (role: 'admin'). Sellers get access to the
// seller dashboard and the admin product/order routes.
const sellerSignup = async(req, res) => {
    try{
        const { username, name, email, password } = req.body;
        const userName = username || name;

        if (!userName || !email || !password) {
            return res.status(400).json({ success: false, message: 'username, email and password are required' });
        }

        const existingUser1 = await User.findOne({ username: userName })
        const existingUser2 = await User.findOne({ email })

        if(existingUser1 || existingUser2){
            return res.status(409).json({ success: false, message: 'Seller already exists!'})
        }

        const newUser = new User({ username: userName, email, password, role: 'admin' });
        await newUser.save();

        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        });
        res.status(201).json({ success: true, message: 'Seller account created!', data: {token, user: {_id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role}}})
    }catch(e){
        res.status(500).json({
            success: false,
            message: 'Seller is not created',
            error: e.message
        });
    }
}

const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: { user } });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

const signin = async(req, res) => {
    try{
        const {email, password, role} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({message: 'Invalid Credentials'})
        }

        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: '24h'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        });

        res.status(200).json({ success: true, message: 'User LoggedIn successfully', data: {token, user: {_id: user._id, username: user.username, email: user.email, role: user.role}}})

    }catch(e){
        res.status(500).json({ success: false, message: 'Login Failed', error: e.message })
    }
}

const signout = (req, res) => {
    try{
        res.clearCookie('token')
        res.status(200).json({
            success: true,
            message: 'User logout successfully'
        })
    }
    catch(e){
      return 
        res.status(500).json({
            success: false,
            message: 'User doesnt logout successfully', data: e.message
        })
    }
}
module.exports = {
    signup, sellerSignup, signin, signout, isAuth
}