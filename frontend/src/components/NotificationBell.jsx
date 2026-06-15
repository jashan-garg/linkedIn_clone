import { useContext, useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NotificationBell() {
    const { serverUrl } = useContext(authDataContext);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let isActive = true;

        axios
            .get(`${serverUrl}/api/notification/get`, {
                withCredentials: true,
            })
            .then((res) => {
                if (isActive) {
                    setCount(res.data.length);
                }
            })
            .catch((err) => {
                console.error('Notification count error:', err);
            });

        // OPTIONAL: add socket.io real-time update later
        // socket.on("newNotification", fetchNotificationCount);

        return () => {
            isActive = false;
            // socket.off("newNotification");
        };
    }, [serverUrl]);

    return (
        <div
            className="relative flex flex-col items-center cursor-pointer min-w-[72px] text-gray-600 hover:text-black"
            onClick={() => navigate('/notifications')}
        >
            <div className="text-2xl relative">
                <FaBell />

                {count > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] rounded-full px-1.5 leading-none">
                        {count}
                    </span>
                )}
            </div>

            <span className="mt-1 text-xs">Notifications</span>
        </div>
    );
}

export default NotificationBell;
