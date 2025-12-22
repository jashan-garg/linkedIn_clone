import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiver: req.userId,
        })
            .populate('relatedUser', 'firstName lastName userName profileImage')
            .populate('relatedPost', 'image description')
            .sort({ createdAt: -1 });

        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({
            message: `get notification error: ${error.message}`,
        });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Notification.findOneAndDelete({
            _id: id,
            receiver: req.userId,
        });

        if (!deleted) {
            return res.status(404).json({
                message: 'Notification not found or unauthorized',
            });
        }

        return res.status(200).json('Notification successfully deleted');
    } catch (error) {
        return res.status(500).json({
            message: `error deleting notification: ${error.message}`,
        });
    }
};

export const clearAllNotification = async (req, res) => {
    try {
        const result = await Notification.deleteMany({
            receiver: req.userId,
        });

        return res.status(200).json({
            message: 'All notifications cleared',
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error clearing notifications: ${error.message}`,
        });
    }
};
