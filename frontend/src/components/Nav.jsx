import { useState } from 'react';
import Logo2 from './Logo2.jsx';
import SearchBar from './SearchBar.jsx';
import { FaHome, FaUserFriends, FaPen } from 'react-icons/fa';
import NotificationBell from './NotificationBell.jsx';
import ProfileAvatar from './ProfileAvatar.jsx';
import CreatePost from './CreatePost.jsx';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <nav className="w-full bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* LEFT */}
                    <div className="flex items-center gap-2">
                        <Logo2 />
                        <SearchBar />
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4 text-gray-600 scale-105 relative">
                        <div className="hidden md:flex items-center gap-4">
                            <NavItem
                                icon={<FaHome />}
                                label="Home"
                                onClick={() => navigate('/')}
                            />
                            <NavItem
                                icon={<FaUserFriends />}
                                label="My Network"
                                onClick={() => navigate('/network')}
                            />
                            <NotificationBell count={5} />
                        </div>

                        <button
                            onClick={() => setOpenCreatePost(true)}
                            className="md:hidden p-2 rounded-full hover:bg-gray-100"
                            aria-label="Create post"
                        >
                            <FaPen className="text-xl text-gray-700" />
                        </button>

                        <ProfileAvatar />
                    </div>
                </div>
            </nav>

            {/* KEEP Modal at very high Z-index */}
            {openCreatePost && (
                <div className="relative z-[100]">
                    <CreatePost onClose={() => setOpenCreatePost(false)} />
                </div>
            )}
        </>
    );
}

function NavItem({ icon, label, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center cursor-pointer hover:text-black min-w-[72px]"
        >
            <div className="text-2xl">{icon}</div>
            <span className="mt-1 text-xs">{label}</span>
        </div>
    );
}

export default Nav;
