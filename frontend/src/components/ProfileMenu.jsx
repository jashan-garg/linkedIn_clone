/* eslint-disable no-unused-vars */
import { useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserFriends, FaSignOutAlt, FaHome, FaBell } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';

// 1. Updated DefaultAvatar to accept extra classes (like border)
function DefaultAvatar({
    className = 'w-[60px] h-[60px] border border-gray-300',
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`${className} rounded-full bg-gray-200 text-gray-400 fill-current`}
        >
            <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

// 2. Updated AvatarImage to accept className for the white border effect
function AvatarImage({ userData, className }) {
    const defaultClasses =
        'w-[60px] h-[60px] rounded-full object-cover border border-gray-300';
    const combinedClasses = className ? className : defaultClasses;

    if (userData?.profileImage) {
        return (
            <img
                src={userData.profileImage}
                alt={userData.firstName || 'Profile'}
                className={combinedClasses}
            />
        );
    }
    return <DefaultAvatar className={combinedClasses} />;
}

function ProfileMenu({ onClose }) {
    const firstItemRef = useRef(null);
    const navigate = useNavigate();

    const { serverUrl } = useContext(authDataContext);
    const { userData, setUserData, setSuggestions, setEdit } =
        useContext(userDataContext);

    // Close on Escape key
    useEffect(() => {
        firstItemRef.current?.focus();
        function handleKeyDown(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Handlers
    const handleHomeClick = () => {
        setSuggestions(false);
        onClose();
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${serverUrl}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setUserData(null);
            onClose();
            navigate('/login');
        }
    };

    return (
        <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 top-14 w-[280px] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden"
        >
            {/* --- HEADER --- */}

            {/* 1. Cover Image Area - VISIBLE ONLY ON MOBILE */}
            {/* Added 'block md:hidden' to show on mobile and hide on desktop+ */}
            <div className="block md:hidden h-16 w-full relative bg-[#A0B4B7] overflow-hidden">
                {userData?.coverImage && (
                    <img
                        src={userData.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* 2. Profile Info Area */}
            <div className="flex flex-col items-center px-4 pb-3 pt-4 relative">
                {/* Avatar - Adjusted margin for mobile vs desktop */}
                {/* On mobile (with cover), use -mt-12 to pull it up. On desktop (no cover), use mt-0. */}
                <div className="-mt-12 md:mt-0 mb-2 transition-all duration-200">
                    <AvatarImage
                        userData={userData}
                        // On mobile, add white border. On desktop, remove it.
                        className="w-[62px] h-[62px] rounded-full object-cover border-[3px] border-white md:border-transparent shadow-sm"
                    />
                </div>

                <h3 className="font-semibold text-base text-gray-900 text-center leading-tight">
                    {userData
                        ? `${userData.firstName} ${userData.lastName}`
                        : 'Welcome'}
                </h3>

                {userData?.headline && (
                    <p className="text-xs text-gray-500 text-center mt-1 line-clamp-1">
                        {userData.headline}
                    </p>
                )}

                <Link
                    to="/profile"
                    ref={firstItemRef}
                    onClick={onClose}
                    className="mt-3 w-full text-center text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-1 hover:bg-[#E8F4FD] transition-colors"
                >
                    View Profile
                </Link>

                {/* Mobile-only Edit button */}
                <button
                    onClick={() => {
                        setEdit(true);
                        onClose();
                    }}
                    className="md:hidden mt-2 w-full text-center text-sm font-semibold text-gray-600 border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100 transition-colors"
                >
                    Edit Profile
                </button>
            </div>

            <div className="border-t border-gray-200" />

            {/* ACTIONS */}
            <div className="py-2">
                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <MenuButton
                        icon={<FaHome />}
                        label="Home"
                        onClick={handleHomeClick}
                    />
                    <MenuButton
                        icon={<FaUserFriends />}
                        label="My Network"
                        onClick={onClose}
                    />
                    <MenuButton
                        icon={<FaBell />}
                        label="Notifications"
                        onClick={onClose}
                    />

                    <MenuButton
                        icon={<IoIosPeople />}
                        label="Suggestions"
                        onClick={() => {
                            setSuggestions((prev) => !prev);
                            onClose();
                        }}
                    />

                    <div className="border-t border-gray-200 my-2" />
                </div>

                {/* Account Actions */}
                <div className="px-4 py-2">
                    <h4 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                        Account
                    </h4>
                </div>

                <MenuButton
                    icon={<FaSignOutAlt />}
                    label="Sign Out"
                    danger
                    onClick={handleLogout}
                />
            </div>
        </motion.div>
    );
}

function MenuButton({ icon, label, onClick, danger = false }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                danger
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <span className="text-lg opacity-70">{icon}</span>
            {label}
        </button>
    );
}

export default ProfileMenu;
