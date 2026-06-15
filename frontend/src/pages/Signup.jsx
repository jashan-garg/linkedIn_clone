import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaIdBadge,
    FaLock,
    FaUser,
    FaUserPlus,
    FaUsers,
} from 'react-icons/fa';
import axios from 'axios';
import Logo from '../components/Logo.jsx';
import { authDataContext } from '../context/AuthContext.jsx';
import { userDataContext } from '../context/UserContext.jsx';

function Signup() {
    const navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);
    const { getCurrentUser } = useContext(userDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (loading) return;

        setErr('');

        // frontend validation
        if (!firstName || !lastName || !userName || !email || !password) {
            return setErr('All fields are required');
        }

        if (password.length < 8) {
            return setErr('Password must be at least 8 characters');
        }

        setLoading(true);

        try {
            await axios.post(
                `${serverUrl}/api/auth/signup`,
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password,
                },
                { withCredentials: true }
            );

            // cookie is already set → just fetch current user
            await getCurrentUser();

            // clear form
            setFirstName('');
            setLastName('');
            setUserName('');
            setEmail('');
            setPassword('');

            navigate('/');
        } catch (error) {
            setErr(error.response?.data?.message || 'Signup failed');
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
                <section className="mx-auto grid h-full w-full max-w-6xl items-center gap-6 md:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
                    <div className="hidden md:block">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#0A66C2]">
                            LinkedIn Clone
                        </p>
                        <h1 className="max-w-xl text-4xl font-semibold leading-tight text-[#191919] lg:text-5xl">
                            Join a community built around professional growth
                        </h1>
                        <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                            Create your profile, connect with people, and start
                            sharing updates that move your career forward.
                        </p>

                        <div className="mt-8 grid max-w-xl gap-3">
                            <div className="flex items-start gap-4 rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F4FD] text-[#0A66C2]">
                                    <FaUserPlus />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#191919]">
                                        Set up your identity
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Start with the details people will see
                                        on your profile.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#191919]">
                                        Find people you know
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Build your network around classmates,
                                        colleagues, and new opportunities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                                    <FaIdBadge />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#191919]">
                                        Shape your profile
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Your name and username become the first
                                        pieces of your professional identity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSignUp}
                        className="w-full max-w-[420px] justify-self-center rounded-lg border border-gray-200 bg-white p-4 shadow-xl shadow-black/5 sm:p-6"
                    >
                        <div className="mb-4 sm:mb-5">
                            <p className="text-sm font-semibold text-[#0A66C2]">
                                Create account
                            </p>
                            <h1 className="mt-2 text-2xl font-semibold text-[#191919] sm:text-3xl">
                                Start your professional profile
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Use your real details so your network can
                                recognize you.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="sr-only">
                                        First name
                                    </span>
                                    <div className="relative">
                                        <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-3 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="sr-only">
                                        Last name
                                    </span>
                                    <div className="relative">
                                        <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-3 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                        />
                                    </div>
                                </label>
                            </div>

                            <label className="block">
                                <span className="sr-only">Username</span>
                                <div className="relative">
                                    <FaIdBadge className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder="Username"
                                        value={userName}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                        className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-4 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                    />
                                </div>
                            </label>

                            <label className="block">
                                <span className="sr-only">
                                    Email address
                                </span>
                                <div className="relative">
                                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-4 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
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
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="h-12 w-full rounded-md border border-gray-300 bg-white pl-11 pr-12 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
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
                                <span className="mt-1.5 block text-xs text-gray-500">
                                    Use 8 or more characters.
                                </span>
                            </label>
                        </div>

                        {err && (
                            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {err}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-5 h-12 w-full rounded-full bg-[#0A66C2] px-5 text-base font-semibold text-white transition hover:bg-[#004182] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                        >
                            {loading ? 'Creating account...' : 'Agree & join'}
                        </button>

                        <p className="mt-3 hidden text-center text-xs leading-5 text-gray-500 sm:block">
                            Build a profile that helps people recognize your
                            work and connect with you.
                        </p>

                        <div className="mt-4 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                            <span>Already have an account? </span>
                            <Link
                                to="/login"
                                className="font-semibold text-[#0A66C2] hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Signup;
