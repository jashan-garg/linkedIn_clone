import { useState, useRef, useEffect, useContext } from 'react';
import { FaTimes, FaImage } from 'react-icons/fa';
import { userDataContext } from '../context/UserContext.jsx';
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';

const CreatePost = ({ onClose }) => {
    const { userData, getPost } = useContext(userDataContext);
    const { serverUrl } = useContext(authDataContext);

    const imageRef = useRef(null);
    const textareaRef = useRef(null);

    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [description, setDescription] = useState('');
    const [posting, setPosting] = useState(false);

    const initials =
        userData?.firstName && userData?.lastName
            ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
            : 'U';

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.focus();
    }, []);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.max(
                150,
                textareaRef.current.scrollHeight
            )}px`;
        }
    };

    const handleInput = (e) => {
        setDescription(e.target.value);
        adjustHeight();
    };

    const handleAddHashtag = () => {
        setDescription((prev) => {
            const prefix = prev.length > 0 && !prev.endsWith(' ') ? ' ' : '';
            return prev + prefix + '#';
        });

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(
                    textareaRef.current.value.length,
                    textareaRef.current.value.length
                );
                adjustHeight();
            }
        }, 0);
    };

    const renderHighlightedText = (content) => {
        return content.split(/(\s+)/).map((part, index) => {
            if (part.startsWith('#')) {
                return (
                    <span
                        key={index}
                        className="text-[#0A66C2] font-semibold leading-[1.4] tracking-normal break-words"
                    >
                        {part}
                    </span>
                );
            }
            return (
                <span
                    key={index}
                    className="leading-[1.4] tracking-normal break-words"
                >
                    {part}
                </span>
            );
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFrontendImage(null);
        setBackendImage(null);
        if (imageRef.current) imageRef.current.value = '';
    };

    const triggerImageUpload = () => {
        if (imageRef.current) imageRef.current.click();
    };

    async function handleUploadPost() {
        if (!description.trim() && !backendImage) return;

        setPosting(true);
        try {
            let formdata = new FormData();
            formdata.append('description', description);
            if (backendImage) formdata.append('image', backendImage);

            const response = await axios.post(
                `${serverUrl}/api/post/create`,
                formdata,
                { withCredentials: true }
            );

            if (response.status === 200 || response.status === 201) {
                if (getPost) await getPost();
                setPosting(false);
                onClose();
            }
        } catch (error) {
            console.error('Error uploading post:', error);
            setPosting(false);
        }
    }

    const isTextValid =
        description.trim() &&
        description.trim() !== '#' &&
        !description.includes(' # ');

    const isPostDisabled = !(isTextValid || frontendImage) || posting;

    return (
        <div className="flex flex-col w-full max-w-[700px] bg-white rounded-xl md:max-h-[90vh] shadow-xl">
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    {userData?.profileImage ? (
                        <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-600">
                            {initials}
                        </div>
                    )}

                    <div className="flex flex-col items-start">
                        <h4 className="text-[17px] font-semibold text-slate-900 leading-tight">
                            {userData
                                ? `${userData.firstName} ${userData.lastName}`
                                : 'User'}
                        </h4>
                        <span className="text-xs text-gray-500">
                            Post to Anyone
                        </span>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <FaTimes size={20} className="text-gray-600" />
                </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 relative">
                <div className="relative min-h-[150px]">
                    {/* Overlay div */}
                    <div
                        className="absolute inset-0 whitespace-pre-wrap break-words text-[17px] text-slate-700 pointer-events-none leading-[1.4] tracking-normal"
                        aria-hidden="true"
                    >
                        {renderHighlightedText(description)}
                        {description.endsWith('\n') && <br />}
                    </div>

                    {/* Transparent textarea */}
                    <textarea
                        ref={textareaRef}
                        value={description}
                        onChange={handleInput}
                        placeholder="What do you want to talk about?"
                        className="relative w-full bg-transparent text-transparent caret-gray-800 outline-none resize-none text-[17px] overflow-hidden leading-[1.4] tracking-normal break-words"
                        style={{ minHeight: '150px' }}
                        spellCheck="false"
                    />

                    <input
                        type="file"
                        ref={imageRef}
                        hidden
                        onChange={handleImage}
                        accept="image/*"
                    />
                </div>

                {/* IMAGE PREVIEW */}
                {frontendImage && (
                    <div className="mt-4 relative rounded-lg overflow-hidden border bg-gray-50">
                        <img
                            src={frontendImage}
                            alt="Preview"
                            className="w-full max-h-[350px] md:max-h-[400px] object-contain"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 backdrop-blur-sm"
                        >
                            <FaTimes size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4 text-gray-600">
                    <FooterIcon
                        icon={<FaImage size={20} />}
                        tooltip="Add a photo"
                        onClick={triggerImageUpload}
                    />

                    <div className="h-6 w-[1px] bg-gray-300"></div>

                    <button
                        onClick={handleAddHashtag}
                        className="text-[#0A66C2] text-[14px] font-semibold px-3 py-1.5 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
                    >
                        Add hashtag
                    </button>
                </div>

                <button
                    onClick={handleUploadPost}
                    disabled={isPostDisabled}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                        isPostDisabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                    }`}
                >
                    {posting ? 'Posting...' : 'Post'}
                </button>
            </div>
        </div>
    );
};

const FooterIcon = ({ icon, tooltip, onClick }) => (
    <button
        onClick={onClick}
        title={tooltip}
        className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors"
    >
        {icon}
    </button>
);

export default CreatePost;
