import Connection from '../models/connection.model.js';
import User from '../models/user.model.js';

// SEND REQUEST
export const sendConnection = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.userId;

        if (senderId === receiverId)
            return res
                .status(400)
                .json({ message: 'Cannot send request to yourself' });

        const sender = await User.findById(senderId);

        if (sender.connections.includes(receiverId))
            return res.status(400).json({ message: 'Already connected' });

        const existingReq = await Connection.findOne({
            sender: senderId,
            receiver: receiverId,
            status: 'pending',
        });

        if (existingReq)
            return res.status(400).json({ message: 'Request already sent' });

        const newRequest = await Connection.create({
            sender: senderId,
            receiver: receiverId,
            status: 'pending',
        });

        return res.status(200).json(newRequest);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ACCEPT REQUEST
export const acceptConnection = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const currentUserId = req.userId;

        const connection = await Connection.findById(connectionId);

        if (!connection)
            return res.status(400).json({ message: 'Request does not exist' });

        if (connection.receiver.toString() !== currentUserId.toString())
            return res.status(403).json({ message: 'Not authorized' });

        if (connection.status !== 'pending')
            return res.status(400).json({ message: 'Already processed' });

        connection.status = 'accepted';
        await connection.save();

        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { connections: connection.sender },
        });

        await User.findByIdAndUpdate(connection.sender, {
            $addToSet: { connections: currentUserId },
        });

        await Connection.findByIdAndDelete(connectionId);

        return res.status(200).json({ message: 'Connection accepted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// REJECT REQUEST
export const rejectConnection = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const currentUserId = req.userId;

        const connection = await Connection.findById(connectionId);

        if (!connection)
            return res.status(400).json({ message: 'Request does not exist' });

        if (connection.receiver.toString() !== currentUserId.toString())
            return res.status(403).json({ message: 'Not authorized' });

        await Connection.findByIdAndDelete(connectionId);

        return res.status(200).json({ message: 'Request rejected' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET STATUS
export const getConnectionStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const currentUserId = req.userId;

        const currentUser = await User.findById(currentUserId);

        if (currentUser.connections.includes(targetUserId))
            return res.json({ status: 'disconnect' });

        const pending = await Connection.findOne({
            $or: [
                { sender: currentUserId, receiver: targetUserId },
                { sender: targetUserId, receiver: currentUserId },
            ],
            status: 'pending',
        });

        if (pending) {
            if (pending.sender.toString() === currentUserId.toString())
                return res.json({ status: 'pending' });

            return res.json({
                status: 'received',
                requestId: pending._id,
            });
        }

        return res.json({ status: 'connect' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET PENDING REQUESTS
export const getConnectionRequests = async (req, res) => {
    try {
        const requests = await Connection.find({
            receiver: req.userId,
            status: 'pending',
        }).populate(
            'sender',
            'firstName lastName userName profileImage headline'
        );

        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// REMOVE CONNECTION
export const removeConnection = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const otherUserId = req.params.userId;

        await User.findByIdAndUpdate(currentUserId, {
            $pull: { connections: otherUserId },
        });

        await User.findByIdAndUpdate(otherUserId, {
            $pull: { connections: currentUserId },
        });

        return res.json({ message: 'Connection removed' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET USER CONNECTIONS
export const getUserConnections = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate(
            'connections',
            'firstName lastName userName profileImage headline'
        );

        return res.status(200).json(user.connections);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
