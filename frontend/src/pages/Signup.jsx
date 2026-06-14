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
        <div className="min-h-screen bg-[#F3F2EF] flex flex-col font-sans text-[#191919]">
            <header className="w-full px-5 py-5 sm:px-10 sm:py-6">
                <Logo className="inline-flex" />
            </header>

            <main className="flex-1 px-4 pb-10 flex items-center justify-center">
                <section className="w-full max-w-6xl grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_460px] lg:gap-12">
                    <div className="hidden md:block">
                        <p className="mb-3 text-sm font-semibold text-[#0A66C2]">
                            LinkedIn Clone
                        </p>
                        <h1 className="max-w-xl text-4xl font-semibold leading-tight text-[#191919] lg:text-5xl">
                            Join a community built around professional growth
                        </h1>
                        <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                            Create your profile, connect with people, and start
                            sharing updates that move your career forward.
                        </p>

                        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F4FD] text-[#0A66C2]">
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

                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-md bg-[#F3F6F8] p-4">
                                    <p className="font-semibold text-[#191919]">
                                        Network
                                    </p>
                                    <p className="mt-1 text-gray-600">
                                        Find people you know
                                    </p>
                                </div>
                                <div className="rounded-md bg-[#F3F6F8] p-4">
                                    <p className="font-semibold text-[#191919]">
                                        Profile
                                    </p>
                                    <p className="mt-1 text-gray-600">
                                        Share your story
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center gap-3 rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                                <FaUsers className="shrink-0" />
                                <span>
                                    A clean profile helps people recognize and
                                    connect with you faster.
                                </span>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSignUp}
                        className="w-full max-w-[460px] justify-self-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <div className="mb-7">
                            <p className="text-sm font-semibold text-[#0A66C2]">
                                Create account
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold text-[#191919]">
                                Start your professional profile
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Use your real details so your network can
                                recognize you.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-gray-700">
                                        First name
                                    </span>
                                    <div className="relative">
                                        <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-gray-700">
                                        Last name
                                    </span>
                                    <div className="relative">
                                        <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                        />
                                    </div>
                                </label>
                            </div>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-gray-700">
                                    Username
                                </span>
                                <div className="relative">
                                    <FaIdBadge className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={userName}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                    />
                                </div>
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email address
                                </span>
                                <div className="relative">
                                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
                                    />
                                </div>
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-gray-700">
                                    Password
                                </span>
                                <div className="relative">
                                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-12 text-[15px] outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20"
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
                                <span className="mt-2 block text-xs text-gray-500">
                                    Use at least 8 characters.
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
                            className="mt-6 w-full rounded-full bg-[#0A66C2] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#004182] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="mt-6 border-t border-gray-200 pt-5 text-center text-sm text-gray-600">
                            <span>Already have an account? </span>
                            <Link
                                to="/login"
                                className="font-semibold text-[#0A66C2] hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Signup;
