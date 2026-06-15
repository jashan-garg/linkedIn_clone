import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Logo({ className = '' }) {
    return (
        <Link
            to="/"
            className={`inline-flex h-8 w-28 overflow-hidden ${className}`}
        >
            <img
                src={logo}
                alt="LinkedIn logo"
                className="h-28 w-28 max-w-none -translate-y-10"
            />
        </Link>
    );
}
