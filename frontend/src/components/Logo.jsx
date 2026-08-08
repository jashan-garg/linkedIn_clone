import { Link } from 'react-router-dom';
import logo from '../assets/orbit-logo.png';

export default function Logo({ className = '' }) {
    return (
        <Link
            to="/"
            className={`inline-flex items-center gap-2 ${className}`}
        >
            <img
                src={logo}
                alt="Orbit logo"
                className="h-9 w-9 object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-[#172B4D]">
                Orbit
            </span>
        </Link>
    );
}
