import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Logo({ className = '' }) {
    return (
        <Link to="/" className={className}>
            <img src={logo} alt="LinkedIn logo" className="w-28 h-auto" />
        </Link>
    );
}
