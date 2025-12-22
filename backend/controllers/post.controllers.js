import Post from '../models/post.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import { io } from '../index.js';
import Notification from '../models/notification.model.js';

// ---------------- CREATE POST ----------------
export const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        let newPost;

        if (req.file) {
            const image = await uploadOnCloudinary(req.file.path);
            newPost = await Post.create({
                author: req.userId,
                description,
                image,
            });
        } else {
            newPost = await Post.create({
                author: req.userId,
                description,
            });
        }

        // Emit full post with population
        const populatedPost = await Post.findById(newPost._id).populate(
            'author',
            'firstName lastName userName profileImage headline'
        );

        io.emit('postCreated', populatedPost);

        return res.status(201).json(populatedPost);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating new post' });
    }
};

// ---------------- GET ALL POSTS ----------------
export const getPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate(
                'author',
                'firstName lastName profileImage headline userName'
            )
            .populate(
                'comment.user',
                'firstName lastName profileImage headline'
            )
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Post.countDocuments();

        return res.status(200).json({
            posts,
            total,
            hasMore: page * limit < total,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error getting posts' });
    }
};

// ---------------- LIKE / UNLIKE ----------------
export const like = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Toggle like
        const alreadyLiked = post.like.includes(userId);

        if (alreadyLiked) {
            post.like = post.like.filter(
                (id) => id.toString() !== userId.toString()
            );
        } else {
            post.like.push(userId);

            if (post.author.toString() !== userId.toString()) {
                await Notification.create({
                    receiver: post.author, // post owner
                    relatedUser: userId, // who liked
                    relatedPost: postId,
                    type: 'like',
                });
            }
        }

        await post.save();

        // SOCKET
        io.emit('likeUpdated', {
            postId,
            likeCount: post.like.length,
        });

        return res.status(200).json(post);
    } catch (error) {
        console.error('Like Error:', error);
        return res.status(500).json({ message: 'Error liking the post' });
    }
};

// ---------------- ADD COMMENT ----------------
export const comment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const { content } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Comment cannot be empty' });
        }

        // Add comment
        const postBefore = await Post.findByIdAndUpdate(
            postId,
            { $push: { comment: { content, user: userId } } },
            { new: true }
        );

        if (postBefore.author.toString() !== userId.toString()) {
            await Notification.create({
                receiver: postBefore.author, // post owner
                relatedUser: userId, // who commented
                relatedPost: postId,
                type: 'comment',
                content: content,
            });
        }

        // Fetch full comments with population
        const updatedPost = await Post.findById(postId).populate(
            'comment.user',
            'firstName lastName userName profileImage headline'
        );

        // SOCKET
        io.emit('commentUpdated', {
            postId,
            comments: updatedPost.comment,
        });

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Comment Error:', error);
        return res.status(500).json({ message: 'Error commenting on post' });
    }
};
