import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
        <div className="min-h-screen bg-white flex flex-col">
            {/* HEADER */}
            <header className="absolute top-0 left-0 w-full px-10 py-6 flex items-center">
                <Logo className="absolute top-0.5" />
            </header>

            {/* MAIN */}
            <main className="min-h-screen flex items-center justify-center">
                <form
                    className="w-[90%] max-w-[400px] shadow-xl rounded-lg flex flex-col gap-5 p-6 bg-white"
                    onSubmit={handleLogin}
                >
                    <h1 className="text-3xl font-bold text-center">Login</h1>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Error Message */}
                    {err && (
                        <div className="text-red-500 text-sm text-center">
                            {err}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#0077B5] text-white p-3 rounded-md hover:bg-[#0A66C2] transition"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    {/* Already have an account? */}
                    <div className="text-center text-sm">
                        <Link
                            to="/signup"
                            className="text-[#0077B5] hover:underline"
                        >
                            New to LinkedIn? Signup
                        </Link>
                    </div>
                </form>
            </main>

            {/* <Footer /> */}
        </div>
    );
}

export default Login;
