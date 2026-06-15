import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
    FaBriefcase,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaShieldAlt,
    FaUsers,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;
        setErr('');

        if (!email || !password) return setErr('Both fields are required');
        setLoading(true);

        try {
            await axios.post(
                `${serverUrl}/api/auth/login`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );

            setEmail('');
            setPassword('');
            navigate('/');
        } catch (error) {
            setErr(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-[100dvh] overflow-hidden bg-[#F4F2EE] font-sans text-[#191919]">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-white/70" />

            <header className="fixed left-5 top-4 z-20 sm:left-10 sm:top-6">
                <Logo className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-4 focus:ring-offset-[#F4F2EE]" />
            </header>

            <main className="relative z-10 h-full px-4 pb-4 pt-20 sm:px-8 sm:pb-8 sm:pt-24">
                <section className="mx-auto grid h-full w-full max-w-6xl items-center gap-6 md:grid-cols-[minmax(0,1fr)_390px] lg:gap-12">
                    <div className="hidden md:block">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#0A66C2]">
                            LinkedIn Clone
                        </p>
                        <h1 className="max-w-xl text-4xl font-semibold leading-tight text-[#191919] lg:text-5xl">
                            Welcome back to your professional community
                        </h1>
                        <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                            Sign in to keep building your network, follow
                            conversations, and discover relevant updates from
                            people you know.
                        </p>

                        <div className="mt-8 grid max-w-xl gap-3">
                            <div className="flex items-start gap-4 rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F4FD] text-[#0A66C2]">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#191919]">
                                        Stay close to your network
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Catch up on posts, connections, and
                                        professional updates in one focused
                                        feed.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <FaBriefcase />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#191919]">
                                        Build your profile presence
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Share updates and keep your professional
                                        identity ready for new opportunities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                                    <FaShieldAlt />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#191919]">
                                        Secure account access
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Your session continues only after your
                                        credentials are verified.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        className="w-full max-w-[390px] justify-self-center rounded-lg border border-gray-200 bg-white p-5 shadow-xl shadow-black/5 sm:p-6"
                        onSubmit={handleLogin}
                    >
                        <div className="mb-5">
                            <p className="text-sm font-semibold text-[#0A66C2]">
                                Sign in
                            </p>
                            <h1 className="mt-2 text-2xl font-semibold text-[#191919] sm:text-3xl">
                                Good to see you again
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Continue to your feed, network, and profile.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <label className="block">
                                <span className="sr-only">
                                    Email address
                                </span>
                                <div className="relative">
                                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-4 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </label>

                            <label className="block">
                                <span className="sr-only">Password</span>
                                <div className="relative">
                                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        placeholder="Enter your password"
                                        className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-12 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((p) => !p)
                                        }
                                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                            </label>
                        </div>

                        {err && (
                            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {err}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-5 h-12 w-full rounded-full bg-[#0A66C2] px-5 text-base font-semibold text-white transition hover:bg-[#004182] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        <div className="mt-5 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                            <span>New to LinkedIn? </span>
                            <Link
                                to="/signup"
                                className="font-semibold text-[#0A66C2] hover:underline"
                            >
                                Join now
                            </Link>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Login;
