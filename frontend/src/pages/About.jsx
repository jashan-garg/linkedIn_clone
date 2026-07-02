import Footer from '../components/Footer.jsx';

function About() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F2EF] font-sans">
            <main className="flex-1 px-4 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
                            About
                        </p>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Built for professional connection.
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-7">
                            This LinkedIn clone is designed to help people build
                            profiles, share posts, connect with others, and stay
                            updated with notifications in a clean social
                            workspace.
                        </p>
                        <p className="mt-4 text-slate-600 leading-7">
                            It includes authentication, networking, posting,
                            comments, likes, search, and real-time updates using
                            a React and Node.js stack.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default About;
