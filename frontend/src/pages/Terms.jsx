import Footer from '../components/Footer.jsx';

function Terms() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F2EF] font-sans">
            <main className="flex-1 px-4 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
                            Terms
                        </p>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Use the platform responsibly.
                        </h1>
                        <p className="mt-4 text-slate-600 leading-7">
                            By using this application, you agree to respect
                            other users, avoid abusive behavior, and follow the
                            intended scope of the demo features.
                        </p>
                        <p className="mt-4 text-slate-600 leading-7">
                            Content, connections, and notifications are managed
                            by the app’s backend and frontend logic as part of a
                            local development project.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Terms;
