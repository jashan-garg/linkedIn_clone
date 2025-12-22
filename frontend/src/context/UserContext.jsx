/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext.jsx';

export const userDataContext = createContext(null);

function UserContext({ children }) {
    const { serverUrl } = useContext(authDataContext);

    const [userData, setUserData] = useState(null);
    const [profileData, setProfileData] = useState(null); // ⭐ FIXED
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [suggestions, setSuggestions] = useState(false);
    const [postData, setPostData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(false);

    // --------------------------------------
    // Get logged-in user
    // --------------------------------------
    const getCurrentUser = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/user/currentUser`, {
                withCredentials: true,
            });
            setUserData(res.data);
            setProfileData(res.data); // ⭐ default profile = self
        } catch {
            setUserData(null);
            setProfileData(null);
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------
    // Load another user profile
    // --------------------------------------
    const loadProfile = async (username) => {
        try {
            if (!username) return;

            if (username === userData?.userName) {
                setProfileData(userData);
                return;
            }

            const res = await axios.get(
                `${serverUrl}/api/user/profile/${username}`,
                { withCredentials: true }
            );

            setProfileData(res.data);
        } catch (err) {
            console.log('Profile load error:', err);
            setProfileData(null);
        }
    };

    // --------------------------------------
    // Fetch all posts
    // --------------------------------------
    const getPost = async (pageNum = 1) => {
        try {
            setLoadingPosts(true);

            const res = await axios.get(
                `${serverUrl}/api/post/getpost?page=${pageNum}&limit=10`,
                { withCredentials: true }
            );

            if (pageNum === 1) {
                setPostData(res.data.posts);
            } else {
                setPostData((prev) => [...prev, ...res.data.posts]);
            }

            setHasMore(res.data.hasMore);
        } catch (err) {
            console.log('Post fetch error:', err);
        } finally {
            setLoadingPosts(false);
        }
    };

    // Load initial data
    useEffect(() => {
        getCurrentUser();
        getPost();
    }, []);

    const value = {
        userData,
        setUserData,
        profileData,
        setProfileData,
        loadProfile,
        loading,
        getCurrentUser,
        edit,
        setEdit,
        suggestions,
        setSuggestions,
        postData,
        setPostData,
        page,
        setPage,
        hasMore,
        getPost,
        loadingPosts,
    };

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;
