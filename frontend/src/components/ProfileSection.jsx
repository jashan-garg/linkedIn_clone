import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import EditProfile from './EditProfile.jsx';
import CreatePost from './CreatePost.jsx';

import {
    FaPen,
    FaMapMarkerAlt,
    FaBriefcase,
    FaGraduationCap,
    FaLightbulb,
    FaVenusMars,
    FaAt,
} from 'react-icons/fa';

function ProfileSection() {
    const { userData, edit, setEdit } = useContext(userDataContext);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const getInitials = (first, last) =>
        first && last ? `${first[0]}${last[0]}`.toUpperCase() : 'U';
    const initials = getInitials(userData?.firstName, userData?.lastName);
    const fullName = userData
        ? `${userData.firstName} ${userData.lastName}`
        : 'Loading...';

    return (
        <>
            <aside className="hidden md:block col-span-12 md:col-span-3">
                <div className="md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto space-y-3 pb-4 no-scrollbar">
                    {/* MAIN IDENTITY CARD */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative shrink-0">
                        {/* Cover Image */}
                        <div
                            className="h-16 bg-slate-200 relative"
                            style={{
                                backgroundImage: userData?.coverImage
                                    ? `url(${userData.coverImage})`
                                    : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {!userData?.coverImage && (
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-200" />
                            )}
                        </div>

                        {/* Profile Image */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                            <Link to="/profile">
                                {userData?.profileImage ? (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-[72px] h-[72px] rounded-full border-[3px] border-white shadow-sm object-cover bg-white cursor-pointer"
                                    />
                                ) : (
                                    <div className="w-[72px] h-[72px] rounded-full border-[3px] border-white shadow-sm bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-bold cursor-pointer">
                                        {initials}
                                    </div>
                                )}
                            </Link>
                        </div>

                        {/* Basic Info */}
                        <div className="mt-14 pb-4 px-4 text-center border-b border-gray-200">
                            <Link to="/profile" className="group">
                                <h3 className="text-base font-semibold text-slate-900 group-hover:underline decoration-1 underline-offset-2">
                                    {fullName}
                                </h3>
                            </Link>

                            {/* Username & Gender */}
                            <div className="flex items-center justify-center gap-3 text-xs text-slate-500 mt-1">
                                {userData?.userName && (
                                    <div className="flex items-center gap-1">
                                        <FaAt size={10} />
                                        <span>{userData.userName}</span>
                                    </div>
                                )}
                                {userData?.gender && (
                                    <div className="flex items-center gap-1 capitalize">
                                        <FaVenusMars size={10} />
                                        <span>{userData.gender}</span>
                                    </div>
                                )}
                            </div>

                            {/* Headline */}
                            {userData?.headline && (
                                <p className="mt-2 text-xs text-slate-500 leading-tight line-clamp-2">
                                    {userData.headline}
                                </p>
                            )}

                            {/* Location */}
                            {userData?.location && (
                                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-400">
                                    <FaMapMarkerAlt size={10} />
                                    <span>{userData.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Connections */}
                        <div className="py-2 border-b border-gray-200">
                            <div className="cursor-pointer hover:bg-gray-100 px-4 py-1 transition-colors duration-200">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-slate-500">
                                            Connections
                                        </span>
                                        <span className="text-xs font-bold text-slate-900">
                                            Grow your network
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600">
                                        {userData?.connections?.length || 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Edit Profile Action */}
                        <div className="px-4 pb-4 pt-1">
                            <button
                                onClick={() => setEdit(true)}
                                className="w-full flex items-center justify-center gap-2 mt-2.5 py-1.5 rounded-full border border-slate-600 text-slate-600 font-semibold text-sm hover:border-[2px] hover:bg-slate-100 transition-all duration-150"
                            >
                                <FaPen size={12} />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* CREATE POST */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 shrink-0">
                        <div className="flex items-center gap-3 mb-2">
                            <Link to="/profile" className="shrink-0">
                                {userData?.profileImage ? (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                        {initials}
                                    </div>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsPostModalOpen(true)}
                                className="flex-grow h-10 px-4 text-left border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-sm font-semibold text-slate-500">
                                    Start a post
                                </span>
                            </button>
                        </div>

                        {/* Professional Prompt */}
                        <div className="px-1 mt-1">
                            <p className="text-xs text-slate-500 pl-1">
                                Share updates, news, or insights with your
                                network.
                            </p>
                        </div>
                    </div>

                    {/* SKILLS CARD */}
                    {userData?.skills && userData.skills.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 shrink-0">
                            <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-sm">
                                <FaLightbulb className="text-yellow-500" />
                                <h3>Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {userData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EXPERIENCE CARD */}
                    {userData?.experience && userData.experience.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 shrink-0">
                            <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-sm">
                                <FaBriefcase className="text-slate-500" />
                                <h3>Experience</h3>
                            </div>
                            <div className="space-y-4">
                                {userData.experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 relative"
                                    >
                                        {/* Timeline line */}
                                        {index !==
                                            userData.experience.length - 1 && (
                                            <div className="absolute left-[11px] top-8 bottom-[-16px] w-[1px] bg-gray-200"></div>
                                        )}
                                        {/* Icon */}
                                        <div className="shrink-0 mt-1">
                                            <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                                                <FaBriefcase
                                                    size={10}
                                                    className="text-slate-500"
                                                />
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                                                {exp.title || 'Job Title'}
                                            </h4>
                                            <p className="text-xs text-slate-700">
                                                {exp.company || 'Company Name'}
                                            </p>
                                            <p className="text-xs text-slate-700">
                                                {exp.startingYear} -{' '}
                                                {exp.endingYear || 'Present'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EDUCATION CARD */}
                    {userData?.education && userData.education.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 shrink-0">
                            <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-sm">
                                <FaGraduationCap className="text-slate-500" />
                                <h3>Education</h3>
                            </div>
                            <div className="space-y-4">
                                {userData.education.map((edu, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="shrink-0 mt-1">
                                            <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                                                <FaGraduationCap
                                                    size={12}
                                                    className="text-slate-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                                                {edu.college || 'School Name'}
                                            </h4>
                                            <p className="text-xs text-slate-700">
                                                {edu.degree || 'Degree'} •{' '}
                                                {edu.fieldOfStudy ||
                                                    'Field of Study'}
                                            </p>
                                            <p className="text-xs text-slate-700">
                                                {edu.startingYear} -{' '}
                                                {edu.endingYear || 'Present'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* MODALS */}

            {edit &&
                createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div
                            className="absolute inset-0"
                            onClick={() => setEdit(false)}
                        />
                        <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
                            <EditProfile onClose={() => setEdit(false)} />
                        </div>
                    </div>,
                    document.body
                )}

            {isPostModalOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        {/* Clicking outside closes modal */}
                        <div
                            className="absolute inset-0"
                            onClick={() => setIsPostModalOpen(false)}
                        />

                        {/* Proper LinkedIn desktop modal */}
                        <div className="relative w-full max-w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden">
                            <CreatePost
                                onClose={() => setIsPostModalOpen(false)}
                            />
                        </div>
                    </div>,
                    document.body
                )}

            {/* To hide scrollbar */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </>
    );
}

export default ProfileSection;
