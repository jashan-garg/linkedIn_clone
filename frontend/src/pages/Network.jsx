/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
// import { io } from 'socket.io-client';
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { RxCrossCircled } from 'react-icons/rx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ProfileSection from '../components/ProfileSection.jsx';
import FriendSuggestions from '../components/FriendSuggestions.jsx';
import dp from '../assets/dp.webp';

// const socket = io('https://linkedin-backend-3b3o.onrender.com');

function Network() {
    const { suggestions, setSuggestions } = useContext(userDataContext);
    const { serverUrl } = useContext(authDataContext);
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleGetRequests = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/connection/requests`,
                { withCredentials: true }
            );
            setConnections(result.data);
        } catch (error) {
            console.log('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptConnection = async (requestId) => {
        try {
            await axios.put(
                `${serverUrl}/api/connection/accept/${requestId}`,
                {},
                { withCredentials: true }
            );
            // Optimistic UI update: remove the item immediately
            setConnections((prev) =>
                prev.filter((con) => con._id !== requestId)
            );
        } catch (error) {
            console.log('Error accepting:', error);
        }
    };

    const handleRejectConnection = async (requestId) => {
        try {
            await axios.put(
                `${serverUrl}/api/connection/reject/${requestId}`,
                {},
                { withCredentials: true }
            );
            // FIXED: Logic changed from === to !== to remove the item
            setConnections((prev) =>
                prev.filter((con) => con._id !== requestId)
            );
        } catch (error) {
            console.log('Error rejecting:', error);
        }
    };

    useEffect(() => {
        handleGetRequests();
    }, []);

    return (
        <div className="bg-[#F3F2EF] h-screen overflow-y-scroll flex flex-col font-sans scrollbar-hide">
            <div className="sticky top-0 z-30 w-full">
                <Nav />
            </div>

            <main className="flex-grow pt-6 sm:pt-8 pb-10 relative z-0">
                <div className="max-w-[1250px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
                        {/* --- LEFT SIDEBAR (Profile) --- */}
                        <div className="hidden md:block md:col-span-4 lg:col-span-3 relative z-40">
                            <div className="sticky top-24 space-y-4">
                                <ProfileSection />
                            </div>
                        </div>

                        {/* --- CENTER AREA (Invitations List) --- */}
                        <div
                            className={`${
                                suggestions ? 'hidden md:block' : 'block'
                            } col-span-1 md:col-span-8 lg:col-span-6 relative z-0`}
                        >
                            {/* Header Card */}
                            <div className="bg-white rounded-t-lg border-b border-gray-200 p-4 shadow-sm mb-2 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Invitations
                                </h2>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                                    {connections.length}
                                </span>
                            </div>

                            {/* Invitations List Card */}
                            <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 min-h-[200px]">
                                {loading ? (
                                    <div className="p-8 text-center text-gray-500">
                                        Loading...
                                    </div>
                                ) : connections.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {connections.map((connection) => (
                                            <div
                                                className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                                                key={connection._id}
                                            >
                                                {/* User Info */}
                                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                                    <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border border-gray-100 cursor-pointer">
                                                        <img
                                                            src={
                                                                connection
                                                                    .sender
                                                                    .profileImage ||
                                                                dp
                                                            }
                                                            alt={
                                                                connection
                                                                    .sender
                                                                    .firstName
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-lg font-semibold text-gray-800">
                                                            {`${connection.sender.firstName} ${connection.sender.lastName}`}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {connection.sender
                                                                .headline ||
                                                                'Software Engineer'}{' '}
                                                            {/* Fallback headline */}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() =>
                                                            handleRejectConnection(
                                                                connection._id
                                                            )
                                                        }
                                                        className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
                                                        title="Ignore"
                                                    >
                                                        <RxCrossCircled className="w-8 h-8" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleAcceptConnection(
                                                                connection._id
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-full transition-all"
                                                        title="Accept"
                                                    >
                                                        <IoIosCheckmarkCircleOutline className="w-9 h-9" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                                        <p>No pending invitations</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- RIGHT SIDEBAR (Suggestions) --- */}
                        <div
                            className={`${
                                suggestions ? 'block col-span-12' : 'hidden'
                            } lg:block lg:col-span-3 relative z-10`}
                        >
                            <div className="sticky top-24 space-y-4">
                                {suggestions && (
                                    <div className="lg:hidden mb-4">
                                        <button
                                            onClick={() =>
                                                setSuggestions(false)
                                            }
                                            className="flex items-center gap-2 text-gray-600 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm w-full border hover:bg-gray-50"
                                        >
                                            <FaArrowLeft /> Back to List
                                        </button>
                                    </div>
                                )}

                                <FriendSuggestions />

                                <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-300">
                                    <p>
                                        &copy; LinkedIn Clone. By Jashan Garg.
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

export default Network;
