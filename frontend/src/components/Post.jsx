/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp, FaRegCommentDots } from 'react-icons/fa';
import { LuSendHorizontal } from 'react-icons/lu';
import axios from 'axios';
import dp from '../assets/dp.webp';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import Connection from './Connection';
import { SocketContext } from '../context/SocketContext';
import { Link } from 'react-router-dom';

const formatCount = (num) => {
    if (!num) return 0;
    if (num >= 1_000_000)
        return (num / 1_000_000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace('.0', '') + 'k';
    return num;
};

const parseDate = (dateInput) => {
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? new Date() : date;
};

function timeAgo(dateInput) {
    const date = parseDate(dateInput);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo`;
    const years = Math.floor(months / 12);
    return `${years}y`;
}

function Post({
    id,
    author,
    like = [],
    comment = [],
    description,
    image,
    createdAt,
}) {
    const { serverUrl } = useContext(authDataContext);
    const { userData } = useContext(userDataContext);

    // --- STATE ---
    const [likesList, setLikesList] = useState(Array.isArray(like) ? like : []);
    const [comments, setComments] = useState(
        Array.isArray(comment) ? comment : []
    );

    const likesCount = likesList.length;
    const isLiked = likesList.includes(userData?._id);

    const [commentContent, setCommentContent] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [time, setTime] = useState(timeAgo(createdAt));

    const CHAR_LIMIT = 150;

    useEffect(() => {
        const interval = setInterval(() => setTime(timeAgo(createdAt)), 60000);
        return () => clearInterval(interval);
    }, [createdAt]);

    useEffect(() => {
        setLikesList(Array.isArray(like) ? like : []);
        setComments(Array.isArray(comment) ? comment : []);
    }, [id]);

    const handleLike = async () => {
        const myId = userData?._id;
        if (!myId) return;

        const oldLikes = [...likesList];

        // optimistic update
        if (isLiked) {
            setLikesList((prev) => prev.filter((u) => u !== myId));
        } else {
            setLikesList((prev) => [...prev, myId]);
        }

        try {
            const result = await axios.put(
                `${serverUrl}/api/post/like/${id}`,
                {},
                { withCredentials: true }
            );

            if (Array.isArray(result.data.like)) {
                setLikesList(result.data.like);
            }
        } catch (error) {
            console.error('Like Error:', error);
            setLikesList(oldLikes);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;

        try {
            const result = await axios.post(
                `${serverUrl}/api/post/comment/${id}`,
                { content: commentContent },
                { withCredentials: true }
            );

            if (result.data.comment) {
                setComments(result.data.comment);
            }
            setCommentContent('');
        } catch (err) {
            console.error('Comment Error:', err);
        }
    };

    const formatText = (text) => {
        if (!text) return null;
        return text.split(/(#\w+)/g).map((p, i) =>
            p.startsWith('#') ? (
                <span
                    key={i}
                    className="text-[#0A66C2] font-semibold cursor-pointer"
                >
                    {p}
                </span>
            ) : (
                p
            )
        );
    };

    const shouldTruncate = description?.length > CHAR_LIMIT;
    const textToDisplay =
        isExpanded || !shouldTruncate
            ? description
            : description.slice(0, CHAR_LIMIT) + '...';

    const socket = useContext(SocketContext);

    useEffect(() => {
        if (!socket) return;
        socket.on('likeUpdated', ({ postId, likeCount }) => {
            if (postId === id) {
                setLikesList((prev) => {
                    const diff = likeCount - prev.length;

                    if (diff > 0) {
                        return [...prev, 'placeholder'];
                    } else if (diff < 0) {
                        return prev.slice(0, prev.length - 1);
                    }
                    return prev;
                });
            }
        });
        socket.on('commentUpdated', ({ postId, comments }) => {
            if (postId === id) {
                setComments(comments);
            }
        });
        return () => {
            socket.off('likeUpdated');
            socket.off('commentUpdated');
        };
    }, [socket, id]);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3 max-w-[800px] w-full mx-auto">
            {/* HEADER */}
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <Link to={`/profile/${author?.userName}`}>
                        <img
                            src={author?.profileImage || dp}
                            className="w-12 h-12 rounded-full border object-cover hover:scale-105 transition-transform"
                            alt=""
                        />
                    </Link>
                    <div>
                        <Link to={`/profile/${author?.userName}`}>
                            <h3 className="text-sm font-bold text-gray-900 hover:underline hover:text-[#0A66C2] hover:scale-105 inline-block transition-transform">
                                {author?.firstName} {author?.lastName}
                            </h3>
                        </Link>
                        <p className="text-xs text-gray-500">
                            {author?.headline || 'Member'}
                        </p>
                        <p className="text-xs text-gray-400">{time}</p>
                    </div>
                </div>

                {userData?._id !== author?._id && (
                    <Connection userId={author._id} />
                )}
            </div>

            {/* DESCRIPTION */}
            <div className="text-sm text-gray-800 whitespace-pre-line">
                {formatText(textToDisplay)}
                {shouldTruncate && (
                    <span
                        onClick={() => setIsExpanded((p) => !p)}
                        className="text-gray-500 ml-1 cursor-pointer hover:underline"
                    >
                        {isExpanded ? 'show less' : 'see more'}
                    </span>
                )}
            </div>

            {/* IMAGE */}
            {image && (
                <img
                    src={image}
                    className="w-full rounded-md border object-cover max-h-[500px]"
                    alt=""
                />
            )}

            {/* STATS */}
            <div className="flex justify-between text-xs text-gray-500 border-b pb-2">
                <div className="flex items-center gap-1">
                    {likesCount > 0 && (
                        <FaThumbsUp className="text-[#0A66C2] w-3 h-3" />
                    )}
                    <span className="cursor-pointer hover:text-[#0A66C2] hover:underline">
                        {formatCount(likesCount)} likes
                    </span>
                </div>

                <span
                    className="cursor-pointer hover:text-[#0A66C2] hover:underline"
                    onClick={() => setShowComment((p) => !p)}
                >
                    {showComment
                        ? 'Hide comments'
                        : `View all ${formatCount(comments.length)} comments`}
                </span>
            </div>

            {/* INLINE PREVIEW */}
            {!showComment && comments.length > 0 && (
                <div className="space-y-2">
                    {comments.slice(0, 2).map((com) => (
                        <div key={com._id} className="flex gap-2">
                            <img
                                src={com.user?.profileImage || dp}
                                className="w-8 h-8 rounded-full object-cover"
                                alt=""
                            />
                            <div>
                                <span className="text-sm font-semibold">
                                    {com.user?.firstName} {com.user?.lastName}
                                </span>
                                <span className="text-sm ml-2">
                                    {com.content}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-between px-2 pt-1">
                <ActionButton
                    onClick={handleLike}
                    active={isLiked}
                    label="Like"
                    icon={isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                />

                <ActionButton
                    onClick={() => setShowComment((p) => !p)}
                    label="Comment"
                    icon={<FaRegCommentDots />}
                />
            </div>

            {/* COMMENTS */}
            {showComment && (
                <div className="pt-3 space-y-3">
                    <form onSubmit={handleComment} className="flex gap-2">
                        <img
                            src={userData?.profileImage || dp}
                            className="w-8 h-8 rounded-full object-cover"
                            alt=""
                        />
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm outline-none"
                                placeholder="Add a comment..."
                                value={commentContent}
                                onChange={(e) =>
                                    setCommentContent(e.target.value)
                                }
                            />
                            {commentContent.trim() && (
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0A66C2] text-white p-1.5 rounded-full"
                                >
                                    <LuSendHorizontal size={14} />
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {comments.map((com) => (
                            <div key={com._id} className="flex gap-2">
                                <img
                                    src={com.user?.profileImage || dp}
                                    className="w-8 h-8 rounded-full"
                                    alt=""
                                />
                                <div className="bg-gray-100 px-3 py-2 rounded-xl flex-1">
                                    <h4 className="text-xs font-bold">
                                        {com.user?.firstName}{' '}
                                        {com.user?.lastName}
                                    </h4>
                                    <p className="text-sm">{com.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const ActionButton = ({ icon, label, onClick, active }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-colors w-full ${
            active ? 'text-[#0A66C2]' : 'text-gray-500 hover:bg-gray-100'
        }`}
    >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

export default Post;
