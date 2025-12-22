import getToken from '../config/token.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
    try {
        let { firstName, lastName, userName, email, password } = req.body;

        let existEmail = await User.findOne({ email });
        if (existEmail)
            return res.status(400).json({ message: 'Email already taken!' });

        let existUsername = await User.findOne({ userName });
        if (existUsername)
            return res.status(400).json({ message: 'Username already taken!' });

        if (password.length < 8)
            return res.status(400).json({ message: ' Password too short!' });

        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
        });

        let token = await getToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log('Signed Up Successfully');
        return res.status(201).json(user);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Signup Error: ${error.message}` });
    }
};

export const logIn = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Wrong email!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Wrong email/password!' });

        let token = await getToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log('Logged In Successfully');
        return res.status(201).json(user);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Login Error: ${error.message}` });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.status(200).json({
            message: 'Log Out Successful!',
        });
    } catch (error) {
        return res.status(500).json({
            message: `Logout Error: ${error.message}`,
        });
    }
};
