import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { FaArrowLeft } from 'react-icons/fa';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ProfileSection from '../components/ProfileSection.jsx';
import CenterFeed from '../components/CenterFeed.jsx';
import FriendSuggestions from '../components/FriendSuggestions.jsx';

function Home() {
    const { suggestions, setSuggestions } = useContext(userDataContext);

    return (
        <div className="bg-[#F3F2EF] h-screen overflow-y-scroll flex flex-col font-sans scrollbar-hide">
            <div className="sticky top-0 z-30 w-full">
                <Nav />
            </div>

            <main className="flex-grow pt-6 sm:pt-8 pb-10 relative z-0">
                <div className="max-w-[1250px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
                        <div className="hidden md:block md:col-span-4 lg:col-span-3 relative z-40">
                            <div className="sticky top-24 space-y-4">
                                <ProfileSection />
                            </div>
                        </div>

                        <div
                            className={`
                            ${suggestions ? 'hidden md:block' : 'block'} 
                            col-span-1 md:col-span-8 lg:col-span-6 relative z-0
                        `}
                        >
                            <CenterFeed />
                        </div>

                        <div
                            className={`
                            ${suggestions ? 'block col-span-12' : 'hidden'} 
                            lg:block lg:col-span-3 relative z-10
                        `}
                        >
                            <div className="sticky top-24 space-y-4">
                                {suggestions && (
                                    <div className="lg:hidden mb-4">
                                        <button
                                            onClick={() =>
                                                setSuggestions(false)
                                            }
                                            className="flex items-center gap-2 text-gray-600 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm w-full"
                                        >
                                            <FaArrowLeft /> Back to Feed
                                        </button>
                                    </div>
                                )}

                                <FriendSuggestions />

                                <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-300">
                                    <p>&copy; LinkedIn. By Jashan Garg.</p>
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

export default Home;
