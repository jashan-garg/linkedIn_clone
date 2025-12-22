import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.svg';

export default function Logo2({ className = '' }) {
    return (
        <Link to="/" className={`flex items-center ${className}`}>
            <img
                src={logo2}
                alt="LinkedIn logo"
                className="h-11 w-11 object-contain"
            />
        </Link>
    );
}
