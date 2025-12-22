import express from 'express';
import {
    getCurrentUser,
    getprofile,
    getSuggestedUser,
    search,
    updateProfile,
} from '../controllers/user.controllers.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';

let userRouter = express.Router();

userRouter.get('/currentUser', isAuth, getCurrentUser);
userRouter.put(
    '/updateProfile',
    isAuth,
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
    ]),
    updateProfile
);
userRouter.get('/profile/:username', isAuth, getprofile);
userRouter.get('/search', isAuth, search);
userRouter.get('/suggestedusers', isAuth, getSuggestedUser);

export default userRouter;
