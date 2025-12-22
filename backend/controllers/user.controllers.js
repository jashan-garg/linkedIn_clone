import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Get current user error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            headline,
            location,
            gender,
            skills,
            education,
            experience,
        } = req.body;

        /* ---------- Helper to parse JSON strings ---------- */
        const parseIfString = (value) => {
            if (!value) return undefined;
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                } catch {
                    return undefined;
                }
            }
            return value;
        };

        const parsedSkills = parseIfString(skills);
        const parsedEducation = parseIfString(education);
        const parsedExperience = parseIfString(experience);

        let profileImage;
        let coverImage;

        /* ---------- Upload images to Cloudinary ---------- */
        if (req.files?.profileImage) {
            const uploadedProfile = await uploadOnCloudinary(
                req.files.profileImage[0].path
            );
            profileImage = uploadedProfile?.secure_url || uploadedProfile;
        }

        if (req.files?.coverImage) {
            const uploadedCover = await uploadOnCloudinary(
                req.files.coverImage[0].path
            );
            coverImage = uploadedCover?.secure_url || uploadedCover;
        }

        /* ---------- Update User ---------- */
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                ...(firstName !== undefined && { firstName }),
                ...(lastName !== undefined && { lastName }),
                ...(userName !== undefined && { userName }),
                ...(headline !== undefined && { headline }),
                ...(location !== undefined && { location }),
                ...(gender !== undefined && { gender }),
                ...(parsedSkills !== undefined && { skills: parsedSkills }),
                ...(parsedEducation !== undefined && {
                    education: parsedEducation,
                }),
                ...(parsedExperience !== undefined && {
                    experience: parsedExperience,
                }),
                ...(profileImage && { profileImage }),
                ...(coverImage && { coverImage }),
            },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in updating profile' });
    }
};

export const getprofile = async (req, res) => {
    try {
        // FIX: use username (not userName)
        let { username } = req.params;

        // FIX: search using userName field in DB
        let user = await User.findOne({ userName: username }).select(
            '-password'
        );

        if (!user) {
            return res.status(400).json({ message: 'username does not exist' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `get profile error ${error}` });
    }
};

export const search = async (req, res) => {
    try {
        let { query } = req.query;

        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'query is required' });
        }

        // Escape regex meta chars
        const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const users = await User.find({
            _id: { $ne: req.userId }, // 🚀 EXCLUDE current user
            $or: [
                { firstName: { $regex: safeQuery, $options: 'i' } },
                { lastName: { $regex: safeQuery, $options: 'i' } },
                { userName: { $regex: safeQuery, $options: 'i' } },
                { skills: { $regex: safeQuery, $options: 'i' } },
            ],
        }).select('-password');

        return res.status(200).json(users);
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({ message: 'error searching for users' });
    }
};

export const getSuggestedUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId).select(
            'connections'
        );

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const suggestedUsers = await User.find({
            _id: {
                $ne: req.userId,
                $nin: currentUser.connections,
            },
        })
            .select('firstName lastName userName profileImage headline')
            .limit(6);

        return res.status(200).json(suggestedUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'suggested user error' });
    }
};
