import Footer from '../components/Footer.jsx';

function Careers() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F2EF] font-sans">
            <main className="flex-1 px-4 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0A66C2]">
                            Careers
                        </p>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Grow your next opportunity here.
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-7">
                            We do not list live openings in this demo, but the
                            platform is built around the idea of discovering
                            people, roles, and networks that help careers move
                            forward.
                        </p>
                        <p className="mt-4 text-slate-600 leading-7">
                            If you are exploring the codebase as a portfolio
                            project, this page represents the kind of employer
                            information and hiring journey a real product could
                            surface.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Careers;
