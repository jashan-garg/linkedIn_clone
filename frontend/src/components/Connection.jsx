import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config.js';

function Connection({ userId }) {
    const [status, setStatus] = useState('loading');
    const [requestId, setRequestId] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(
                    `${apiBaseUrl}/api/connection/getstatus/${userId}`,
                    { withCredentials: true }
                );

                setStatus(res.data.status || 'connect');
                if (res.data.requestId) setRequestId(res.data.requestId);
            } catch (err) {
                console.error('Status Error:', err);
                setStatus('connect');
            }
        };

        fetchStatus();
    }, [userId]);

    const handleSendConnection = async () => {
        try {
            setStatus('loading');

            const res = await axios.post(
                `${apiBaseUrl}/api/connection/send/${userId}`,
                {},
                { withCredentials: true }
            );

            setRequestId(res.data._id);
            setStatus('pending');
        } catch (err) {
            console.error('Send Error:', err);
            setStatus('connect');
        }
    };

    const handleAccept = async () => {
        try {
            setStatus('loading');

            await axios.put(
                `${apiBaseUrl}/api/connection/accept/${requestId}`,
                {},
                { withCredentials: true }
            );

            setStatus('disconnect');
        } catch (err) {
            console.error('Accept Error:', err);
            setStatus('received');
        }
    };

    const handleRemove = async () => {
        try {
            setStatus('loading');

            await axios.delete(
                `${apiBaseUrl}/api/connection/remove/${userId}`,
                { withCredentials: true }
            );

            setStatus('connect');
        } catch (err) {
            console.error('Remove Error:', err);
            setStatus('disconnect');
        }
    };

    const baseClass =
        'text-sm font-semibold px-4 py-1 rounded-full border transition disabled:opacity-60';

    if (status === 'loading') {
        return (
            <button
                className={`${baseClass} border-gray-400 text-gray-400`}
                disabled
            >
                ...
            </button>
        );
    }

    if (status === 'connect') {
        return (
            <button
                className={`${baseClass} text-[#0A66C2] border-[#0A66C2]`}
                onClick={handleSendConnection}
            >
                Connect
            </button>
        );
    }

    if (status === 'pending') {
        return (
            <button
                className={`${baseClass} text-gray-500 border-gray-500 cursor-not-allowed`}
                disabled
            >
                Pending
            </button>
        );
    }

    if (status === 'received') {
        return (
            <div className="flex gap-2">
                <button
                    className={`${baseClass} text-white bg-[#0A66C2] border-[#0A66C2] hover:bg-[#004182] hover:border-[#004182] hover:shadow-sm hover:transition hover:duration-150 hover:ease-in-out hover:transform hover:scale-105`}
                    onClick={handleAccept}
                >
                    Accept
                </button>
                <button
                    className={`${baseClass} text-gray-600 border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:text-gray-800 hover:shadow-sm hover:transition hover:duration-150 hover:ease-in-out hover:transform hover:scale-105`}
                    onClick={() => setStatus('connect')}
                >
                    Reject
                </button>
            </div>
        );
    }

    if (status === 'disconnect') {
        return (
            <button
                className={`${baseClass} text-red-600 border-red-600 hover:bg-red-50 hover:border-red-700 hover:text-red-700 hover:shadow-sm hover:transition hover:duration-150 hover:ease-in-out hover:transform hover:scale-105`}
                onClick={handleRemove}
            >
                Disconnect
            </button>
        );
    }

    return null;
}

export default Connection;
