import React, { useState, useRef, useEffect, useContext } from 'react';
import { userDataContext } from '../context/UserContext.jsx';
import ProfileMenu from './ProfileMenu';

/* ---------------- DEFAULT AVATAR COMPONENT ---------------- */
function DefaultAvatar({ className = 'w-9 h-9' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${className} rounded-full bg-gray-200 text-gray-400 border border-gray-300`}
        >
            <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

/* ---------------- AVATAR IMAGE COMPONENT (moved outside!) ---------------- */
function AvatarImage({ userData }) {
    if (userData?.profileImage) {
        return (
            <img
                src={userData.profileImage}
                alt={`${userData.firstName || ''} ${userData.lastName || ''}`}
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
            />
        );
    }
    return <DefaultAvatar />;
}

/* ---------------- MAIN COMPONENT ---------------- */
function ProfileAvatar() {
    const { userData } = useContext(userDataContext);

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    /* Outside click */
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => setOpen((prev) => !prev);

    return (
        <div className="relative" ref={ref}>
            {/* BUTTON */}
            <button
                className="cursor-pointer focus:outline-none flex items-center justify-center transition-opacity hover:opacity-90"
                onClick={toggleMenu}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleMenu();
                    }
                }}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Open profile menu"
            >
                <AvatarImage userData={userData} />
            </button>

            {/* MENU */}
            {open && (
                <ProfileMenu onClose={() => setOpen(false)} user={userData} />
            )}
        </div>
    );
}

export default ProfileAvatar;
