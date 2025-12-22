/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import Nav from '../components/Nav';
import EditProfile from '../components/EditProfile';
import Post from '../components/Post';
import Connection from '../components/Connection';
import dp from '../assets/dp.webp';
import Footer from '../components/Footer';
import { HiPencil } from 'react-icons/hi2';
import { MdSchool, MdWork } from 'react-icons/md';

function Profile() {
    const { userData, profileData, loadProfile, edit, setEdit, postData } =
        useContext(userDataContext);
    const { username } = useParams();
    const [profilePost, setProfilePost] = useState([]);

    useEffect(() => {
        if (username) loadProfile(username);
    }, [username]);

    useEffect(() => {
        if (postData && profileData) {
            setProfilePost(
                postData.filter(
                    (post) => post?.author?._id === profileData?._id
                )
            );
        }
    }, [postData, profileData]);

    if (!profileData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F3F2EF]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const isOwner = userData?._id === profileData?._id;

    return (
        <div className="bg-[#F3F2EF] min-h-screen flex flex-col font-sans">
            <Nav />

            {edit && <EditProfile />}

            <main className="flex-grow pt-6 pb-10 flex justify-center">
                <div className="w-full max-w-[1128px] px-0 sm:px-4 flex flex-col gap-4">
                    {/* HERO SECTION — ONLY PLACE WHERE EDIT BUTTON EXISTS */}
                    <div className="bg-white sm:rounded-lg shadow-sm border border-gray-300 overflow-hidden relative pb-6">
                        {/* Cover image */}
                        <div className="h-[150px] sm:h-[200px] bg-[#A0B4B7]">
                            {profileData.coverImage && (
                                <img
                                    src={profileData.coverImage}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="px-6 relative">
                            {/* Profile Image */}
                            <div className="absolute -top-[70px] sm:-top-[100px] left-6 border-4 border-white rounded-full bg-white w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] overflow-hidden shadow-sm">
                                <img
                                    src={profileData.profileImage || dp}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* TOP RIGHT EDIT BUTTON — ONLY ONE */}
                            {isOwner && (
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="flex items-center gap-2 px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                                    >
                                        <HiPencil size={20} /> Edit Profile
                                    </button>
                                </div>
                            )}

                            {/* TEXT INFORMATION */}
                            <div className="pt-14 sm:pt-16">
                                <h1 className="text-2xl font-bold text-[#191919]">
                                    {profileData.firstName}{' '}
                                    {profileData.lastName}
                                </h1>
                                <p className="text-[16px] text-[#191919] mt-1">
                                    {profileData.headline ||
                                        'No headline added'}
                                </p>

                                <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-500 mt-2">
                                    <span>
                                        {profileData.location ||
                                            'Location not set'}
                                    </span>
                                    <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                                        {profileData.connections?.length || 0}{' '}
                                        connections
                                    </span>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="mt-4 flex gap-2">
                                    {isOwner ? (
                                        <>
                                            <button className="bg-[#0a66c2] text-white px-6 py-1.5 rounded-full font-semibold hover:bg-[#004182]">
                                                Open to
                                            </button>
                                            <button className="border border-[#0a66c2] text-[#0a66c2] px-6 py-1.5 rounded-full font-semibold hover:bg-blue-50">
                                                Add profile section
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Connection
                                                userId={profileData._id}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPERIENCE */}

                    {profileData.experience?.length > 0 && (
                        <Section title="Experience">
                            {profileData.experience.map((ex, idx) => (
                                <CardRow
                                    key={idx}
                                    icon={
                                        <MdWork className="text-xl text-gray-700" />
                                    }
                                    title={ex.title}
                                    subtitle={ex.company}
                                    meta={`${ex.startingYear || ''} - ${
                                        ex.endingYear || 'Present'
                                    }`}
                                    desc={ex.description}
                                    isLast={
                                        idx ===
                                        profileData.experience.length - 1
                                    }
                                />
                            ))}
                        </Section>
                    )}

                    {/* EDUCATION */}

                    {profileData.education?.length > 0 && (
                        <Section title="Education">
                            {profileData.education.map((edu, idx) => (
                                <CardRow
                                    key={idx}
                                    icon={
                                        <MdSchool className="text-xl text-gray-700" />
                                    }
                                    title={edu.college}
                                    subtitle={edu.degree}
                                    meta={`${edu.startingYear || ''} - ${
                                        edu.endingYear || ''
                                    } • ${edu.fieldOfStudy}`}
                                    isLast={
                                        idx === profileData.education.length - 1
                                    }
                                />
                            ))}
                        </Section>
                    )}

                    {/* SKILLS */}

                    {profileData.skills?.length > 0 && (
                        <Section title="Skills">
                            <div className="flex flex-col gap-3">
                                {profileData.skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="text-[16px] font-semibold text-[#191919] border-b pb-2 last:border-none"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* ACTIVITY + POSTS */}

                    <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
                        <div className="px-6 py-4 flex justify-between items-center border-b">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Activity
                                </h2>
                                <p className="text-blue-600 text-sm font-semibold cursor-pointer hover:underline">
                                    {profileData.connections?.length || 0}{' '}
                                    followers
                                </p>
                            </div>

                            {isOwner && (
                                <button className="border border-[#0a66c2] text-[#0a66c2] font-semibold px-4 py-1 rounded-full hover:bg-blue-50 transition">
                                    Create a post
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 py-3">
                            {profilePost.length > 0 ? (
                                profilePost.map((post) => (
                                    <Post
                                        key={post._id}
                                        id={post._id}
                                        description={post.description}
                                        author={post.author}
                                        image={post.image}
                                        like={post.like}
                                        comment={post.comment}
                                        createdAt={post.createdAt}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    No posts to show yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

/* SECTION WRAPPER */
function Section({ title, children }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-[#191919] mb-4">{title}</h2>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
}

/* CARD ROW */
function CardRow({ icon, title, subtitle, meta, desc, isLast }) {
    return (
        <div className={`flex gap-4 ${!isLast ? 'border-b pb-4' : ''}`}>
            <div className="w-12 h-12 bg-[#F3F6F8] flex items-center justify-center rounded-sm text-gray-700">
                {icon}
            </div>

            <div className="flex flex-col">
                <h3 className="font-semibold text-[16px] text-[#191919]">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-[14px] text-[#555]">{subtitle}</p>
                )}
                {meta && <p className="text-[14px] text-gray-500">{meta}</p>}
                {desc && (
                    <p className="text-[14px] text-gray-600 mt-2">{desc}</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
