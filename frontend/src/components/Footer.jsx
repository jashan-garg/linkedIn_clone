import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="w-full bg-black text-gray-400">
            <div
                className="
                    max-w-7xl mx-auto
                    px-4 sm:px-6 lg:px-8
                    py-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-8
                "
            >
                {/* Branding */}
                <div className="text-center sm:text-left lg:col-span-2">
                    <h2 className="text-white text-2xl font-bold">LinkedIn</h2>
                    <p className="mt-2 text-sm max-w-sm">
                        Build meaningful professional relationships and grow
                        your career.
                    </p>
                    <p className="text-sm max-w-sm">Learn. Grow. Connect.</p>
                </div>

                {/* Explore */}
                <div className="text-center sm:text-left">
                    <h3 className="text-white font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/about" className="hover:text-white">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/careers" className="hover:text-white">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:text-white">
                                Terms
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div className="text-center sm:text-left">
                    <h3 className="text-white font-semibold mb-3">Connect</h3>
                    <div className="flex justify-center sm:justify-start gap-4 text-xl">
                        <a
                            href="https://github.com"
                            aria-label="GitHub"
                            className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://linkedin.com"
                            aria-label="LinkedIn"
                            className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://twitter.com"
                            aria-label="Twitter"
                            className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div
                    className="
                        max-w-7xl mx-auto
                        px-4 sm:px-6 lg:px-8
                        py-4
                        flex flex-col sm:flex-row
                        items-center justify-between
                        text-xs text-gray-500
                        gap-2
                    "
                >
                    <span>
                        © {new Date().getFullYear()} LinkedIn. By Jashan Garg.
                    </span>

                    <span>Built with React & Tailwind</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
