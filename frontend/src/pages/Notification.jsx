/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { FaTrash, FaBellSlash, FaEllipsisH } from 'react-icons/fa';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ProfileSection from '../components/ProfileSection.jsx';
import FriendSuggestions from '../components/FriendSuggestions.jsx';

// Assets
import dp from '../assets/dp.webp';

function Notification() {
    const { serverUrl } = useContext(authDataContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Helpers ---
    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + 'y';
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + 'mo';
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + 'd';
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + 'h';
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + 'm';
        return 'now';
    };

    // --- API Calls ---
    const getAllNotifications = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${serverUrl}/api/notification/get`, {
                withCredentials: true,
            });
            setNotifications(res.data);
        } catch (err) {
            console.error('Notification fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOne = async (e, id) => {
        e.preventDefault(); // Prevent link navigation if clicking delete
        e.stopPropagation();
        try {
            await axios.delete(
                `${serverUrl}/api/notification/deleteone/${id}`,
                { withCredentials: true }
            );
            setNotifications((prev) => prev.filter((n) => n._id !== id));
        } catch (err) {
            console.error('Delete one error:', err);
        }
    };

    const handleClearAll = async () => {
        if (
            !window.confirm('Are you sure you want to clear all notifications?')
        )
            return;
        try {
            await axios.delete(`${serverUrl}/api/notification/`, {
                withCredentials: true,
            });
            setNotifications([]);
        } catch (err) {
            console.error('Clear all error:', err);
        }
    };

    useEffect(() => {
        getAllNotifications();
    }, []);

    // --- Render Logic ---
    const renderContent = (n) => {
        const user = n.relatedUser;
        if (!user)
            return <span className="text-gray-500">Unknown activity</span>;

        const UserName = () => (
            <span className="font-semibold text-gray-900 hover:text-blue-600 hover:underline transition-colors duration-200">
                {user.firstName} {user.lastName}
            </span>
        );

        switch (n.type) {
            case 'like':
                return (
                    <span>
                        <UserName /> liked your post
                    </span>
                );
            case 'comment':
                return (
                    <span>
                        <UserName /> commented:{' '}
                        <span className="text-gray-600">"{n.content}"</span>
                    </span>
                );
            case 'connectionAccepted':
                return (
                    <span>
                        <UserName /> accepted your connection request
                    </span>
                );
            default:
                return (
                    <span>
                        New activity from <UserName />
                    </span>
                );
        }
    };

    return (
        <div className="bg-[#F3F2EF] min-h-screen flex flex-col font-sans">
            {/* --- Navigation --- */}
            <div className="sticky top-0 z-30 w-full">
                <Nav />
            </div>

            <main className="flex-grow pt-6 sm:pt-8 pb-10 relative z-0">
                <div className="max-w-[1250px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* --- Left Column (Profile) --- */}
                        <div className="hidden md:block md:col-span-4 lg:col-span-3">
                            <div className="sticky top-24">
                                <ProfileSection />
                            </div>
                        </div>

                        {/* --- Center Column (Notifications) --- */}
                        <div className="col-span-1 md:col-span-8 lg:col-span-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
                                {/* Header */}
                                <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Notifications
                                    </h2>
                                    {notifications.length > 0 && (
                                        <button
                                            onClick={handleClearAll}
                                            className="text-gray-500 hover:text-gray-700 text-sm font-medium px-2 py-1 rounded hover:bg-gray-100 transition"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                {/* Loading State */}
                                {loading && (
                                    <div className="p-4 space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className="flex gap-4 animate-pulse"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                                                <div className="flex-1 space-y-2 py-1">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Empty State */}
                                {!loading && notifications.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                                            <FaBellSlash className="text-4xl text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-medium text-gray-900">
                                            No notifications yet
                                        </h3>
                                        <p className="text-gray-500 mt-2 max-w-xs">
                                            When you get likes, comments, or new
                                            connections, they'll show up here.
                                        </p>
                                    </div>
                                )}

                                {/* Notifications List */}
                                <div className="divide-y divide-gray-100">
                                    {notifications.map((n) => (
                                        <div
                                            key={n._id}
                                            className="group relative flex items-start gap-3 p-4 hover:bg-sky-50 transition-colors duration-200 cursor-pointer"
                                        >
                                            {/* Avatar */}
                                            <Link
                                                to={`/profile/${n.relatedUser?.userName}`}
                                                className="flex-shrink-0"
                                            >
                                                <img
                                                    src={
                                                        n.relatedUser
                                                            ?.profileImage || dp
                                                    }
                                                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                                    alt="User"
                                                />
                                            </Link>

                                            {/* Content Block */}
                                            <div className="flex-1 min-w-0 pr-8">
                                                <div className="text-sm text-gray-900 leading-snug break-words">
                                                    {renderContent(n)}
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {formatTimeAgo(n.createdAt)}
                                                </div>
                                            </div>

                                            {/* Right Side: Post Image or Options */}
                                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                                {/* Delete Button (Visible on Hover/Focus for cleaner look, or subtle always) */}
                                                <button
                                                    onClick={(e) =>
                                                        handleDeleteOne(
                                                            e,
                                                            n._id
                                                        )
                                                    }
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                    title="Delete notification"
                                                >
                                                    <FaTrash size={14} />
                                                </button>

                                                {/* Related Post Thumbnail */}
                                                {n.relatedPost &&
                                                    n.relatedPost.image && (
                                                        <Link
                                                            to={`/post/${n.relatedPost._id}`}
                                                            className="block"
                                                        >
                                                            <img
                                                                src={
                                                                    n
                                                                        .relatedPost
                                                                        .image
                                                                }
                                                                className="w-12 h-12 object-cover rounded md:w-14 md:h-14 border border-gray-100"
                                                                alt="Post context"
                                                            />
                                                        </Link>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- Right Column (Suggestions/Ads) --- */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24 space-y-4">
                                <FriendSuggestions />
                                <div className="text-xs text-gray-500 text-center pt-4">
                                    <p>
                                        &copy; 2024 MystiQ. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Notification;
