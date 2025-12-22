import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
        <div className="min-h-screen bg-white flex flex-col">
            {/* HEADER */}
            <header className="w-full px-10 py-6">
                <Logo className="absolute top-0.5" />
            </header>

            {/* MAIN */}
            <main className="flex-1 flex items-center justify-center">
                <form
                    onSubmit={handleSignUp}
                    className="w-[90%] max-w-[400px] -mt-12 shadow-xl rounded-lg flex flex-col gap-5 p-6 bg-white"
                >
                    <h1 className="text-3xl font-bold text-center">Signup</h1>

                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 pr-10 border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {err && (
                        <div className="text-red-500 text-sm text-center">
                            {err}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0077B5] text-white p-3 rounded-md hover:bg-[#0A66C2]"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="text-center text-sm">
                        <Link
                            to="/login"
                            className="text-[#0077B5] hover:underline"
                        >
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Signup;
