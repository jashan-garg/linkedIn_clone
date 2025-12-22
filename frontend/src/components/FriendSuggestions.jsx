import { useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { userDataContext } from '../context/UserContext.jsx';
import { FaInfoCircle, FaArrowRight, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import dp from '../assets/dp.webp';
import Connection from './Connection.jsx';
import { Link } from 'react-router-dom';

function FriendSuggestions() {
    const { suggestions } = useContext(userDataContext);

    const [showInfo, setShowInfo] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSuggestedUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                'http://localhost:8000/api/user/suggestedusers',
                { withCredentials: true }
            );
            setSuggestedUsers(res.data);
        } catch (error) {
            console.error('Error fetching suggested users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSuggestedUsers();
    }, []);

    return (
        <>
            {/* MAIN SIDEBAR */}
            <aside
                className={`col-span-12 md:col-span-3 space-y-4 ${
                    suggestions ? 'block' : 'hidden md:block'
                }`}
            >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden md:sticky md:top-20">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 pb-2">
                        <h3 className="font-semibold text-sm text-slate-900">
                            Add to your feed
                        </h3>
                        <FaInfoCircle
                            onClick={() => setShowInfo(true)}
                            className="text-slate-400 cursor-pointer hover:text-slate-600"
                            size={14}
                        />
                    </div>

                    {/* Suggested user list */}
                    <ul className="px-4 pb-2 space-y-4 md:max-h-[calc(100vh-12rem)] md:overflow-y-auto no-scrollbar pt-2">
                        {/* If loading, show skeletons */}
                        {loading &&
                            Array.from({ length: 5 }).map((_, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 animate-pulse"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                    <div>
                                        <div className="w-28 h-3 bg-gray-200 rounded mb-1"></div>
                                        <div className="w-20 h-3 bg-gray-200 rounded"></div>
                                    </div>
                                </li>
                            ))}

                        {/* Render real suggestions */}
                        {!loading &&
                            suggestedUsers.map((user) => (
                                <li key={user._id} className="flex gap-3">
                                    <Link to={`/profile/${user.userName}`}>
                                        <img
                                            src={user.profileImage || dp}
                                            className="w-10 h-10 rounded-full object-cover border hover:scale-105 transition-transform"
                                            alt=""
                                        />
                                    </Link>
                                    <div className="flex-1">
                                        <Link to={`/profile/${user.userName}`}>
                                            <p className="font-semibold text-sm text-slate-900 hover:underline hover:text-[#0A66C2] hover:scale-105 inline-block transition-transform">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                @{user.userName}
                                            </p>
                                        </Link>
                                    </div>

                                    <Connection userId={user._id} />
                                </li>
                            ))}

                        {!loading && suggestedUsers.length === 0 && (
                            <p className="text-sm text-gray-500 py-3">
                                No suggestions found
                            </p>
                        )}
                    </ul>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-1 text-sm font-semibold text-slate-500 group-hover:text-slate-700">
                            <span>View all recommendations</span>
                            <FaArrowRight size={12} />
                        </div>
                    </div>
                </div>
            </aside>

            {showInfo &&
                createPortal(
                    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
                        {/* Overlay click to close */}
                        <div
                            className="absolute inset-0"
                            onClick={() => setShowInfo(false)}
                        />

                        <div className="relative bg-white w-full max-w-md p-5 rounded-xl shadow-xl z-10">
                            {/* Close */}
                            <button
                                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                                onClick={() => setShowInfo(false)}
                            >
                                <FaTimes size={16} className="text-gray-700" />
                            </button>

                            {/* Title */}
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">
                                About These Suggestions
                            </h2>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                These recommendations are based on your profile
                                details, skills, and network interactions. We
                                suggest the most relevant connections to help
                                grow your professional circle.
                            </p>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export default FriendSuggestions;
