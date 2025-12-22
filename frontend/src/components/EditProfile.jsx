import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxCross1 } from 'react-icons/rx';
import { userDataContext } from '../context/UserContext';
import dp from '../assets/dp.webp';
import {
    FiPlus,
    FiCamera,
    FiTrash2,
    FiBriefcase,
    FiBook,
} from 'react-icons/fi';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

// --- InputGroup Helper ---
const InputGroup = ({ label, value, onChange, placeholder, half = false }) => (
    <div
        className={`flex flex-col gap-1 ${
            half ? 'w-full md:w-[48%]' : 'w-full'
        }`}
    >
        <label className="text-[14px] text-gray-600 font-medium">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="w-full h-[38px] px-3 border border-gray-400 rounded-[4px] text-[16px] outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] transition-all"
            value={value}
            onChange={onChange}
        />
    </div>
);

function EditProfile() {
    let { setEdit, userData, setUserData } = useContext(userDataContext);
    let { serverUrl } = useContext(authDataContext);

    // --- State Management ---
    let [firstName, setFirstName] = useState(userData.firstName || '');
    let [lastName, setLastName] = useState(userData.lastName || '');
    let [userName, setUserName] = useState(userData.userName || '');
    let [headline, setHeadline] = useState(userData.headline || '');
    let [location, setLocation] = useState(userData.location || '');
    let [gender, setGender] = useState(userData.gender || '');
    let [skills, setSkills] = useState(userData.skills || []);
    let [education, setEducation] = useState(userData.education || []);
    let [experience, setExperience] = useState(userData.experience || []);
    let [newSkills, setNewSkills] = useState('');
    let [newEducation, setNewEducation] = useState({
        college: '',
        degree: '',
        fieldOfStudy: '',
    });
    let [newExperience, setNewExperience] = useState({
        title: '',
        company: '',
        description: '',
        startingYear: '',
        endingYear: '',
    });
    let [frontendProfileImage, setFrontendProfileImage] = useState(
        userData.profileImage || dp
    );
    let [backendProfileImage, setBackendProfileImage] = useState(null);
    let [frontendCoverImage, setFrontendCoverImage] = useState(
        userData.coverImage || null
    );
    let [backendCoverImage, setBackendCoverImage] = useState(null);
    let [saving, setSaving] = useState(false);
    const profileImageRef = useRef();
    const coverImageRef = useRef();

    // --- Handlers ---
    function addSkill(e) {
        e.preventDefault();
        if (newSkills.trim() && !skills.includes(newSkills)) {
            setSkills([...skills, newSkills]);
            setNewSkills('');
        }
    }
    function removeSkill(skill) {
        setSkills(skills.filter((s) => s !== skill));
    }
    function addEducation(e) {
        e.preventDefault();
        if (
            newEducation.college &&
            newEducation.degree &&
            newEducation.fieldOfStudy &&
            newEducation.startingYear &&
            newEducation.endingYear
        ) {
            setEducation([...education, newEducation]);
            setNewEducation({
                college: '',
                degree: '',
                fieldOfStudy: '',
                startingYear: '',
                endingYear: '',
            });
        }
    }
    function removeEducation(edu) {
        setEducation(education.filter((e) => e !== edu));
    }
    function addExperience(e) {
        e.preventDefault();
        if (
            newExperience.title &&
            newExperience.company &&
            newExperience.startingYear
        ) {
            setExperience([...experience, newExperience]);
            setNewExperience({
                title: '',
                company: '',
                description: '',
                startingYear: '',
                endingYear: '',
            });
        }
    }
    function removeExperience(exp) {
        setExperience(experience.filter((e) => e !== exp));
    }
    function handleProfileImage(e) {
        let file = e.target.files[0];
        if (file) {
            setBackendProfileImage(file);
            setFrontendProfileImage(URL.createObjectURL(file));
        }
    }
    function handleCoverImage(e) {
        let file = e.target.files[0];
        if (file) {
            setBackendCoverImage(file);
            setFrontendCoverImage(URL.createObjectURL(file));
        }
    }

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            let formdata = new FormData();
            formdata.append('firstName', firstName);
            formdata.append('lastName', lastName);
            formdata.append('userName', userName);
            formdata.append('headline', headline);
            formdata.append('location', location);
            formdata.append('gender', gender);
            formdata.append('skills', JSON.stringify(skills));
            formdata.append('education', JSON.stringify(education));
            formdata.append('experience', JSON.stringify(experience));
            if (backendProfileImage)
                formdata.append('profileImage', backendProfileImage);
            if (backendCoverImage)
                formdata.append('coverImage', backendCoverImage);

            let result = await axios.put(
                `${serverUrl}/api/user/updateProfile`,
                formdata,
                { withCredentials: true }
            );
            setUserData(result.data);
            setEdit(false);
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile.');
        } finally {
            setSaving(false);
        }
    };

    // --- RENDER LOGIC ---
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/60 backdrop-blur-sm">
            <input
                type="file"
                accept="image/*"
                hidden
                ref={profileImageRef}
                onChange={handleProfileImage}
            />
            <input
                type="file"
                accept="image/*"
                hidden
                ref={coverImageRef}
                onChange={handleCoverImage}
            />

            <div className="w-[90%] md:w-full max-w-[700px] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden relative animate-fadeIn">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-[20px] font-semibold text-gray-800">
                        Edit your Profile
                    </h2>
                    <button
                        onClick={() => setEdit(false)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <RxCross1 className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                    {/* FIX 1: Applied width constraint (w-96% + mx-auto) to the CONTAINER 
                       This ensures the profile picture stays aligned with the cover image. */}
                    <div className="relative mb-[80px] w-[96%] mx-auto md:w-full mt-4 md:mt-0">
                        {/* FIX 2: Added 'rounded-xl md:rounded-none' for better mobile aesthetics */}
                        <div
                            className="w-full h-[95px] md:h-[180px] bg-[#d9e5ef] relative group cursor-pointer overflow-hidden rounded-lg md:rounded-none"
                            onClick={() => coverImageRef.current.click()}
                        >
                            {frontendCoverImage && (
                                <img
                                    src={frontendCoverImage}
                                    alt="Cover"
                                    className="w-full h-full object-cover object-center block"
                                />
                            )}

                            <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#0a66c2] hover:text-[#004182] transition-colors">
                                <FiCamera size={17} />
                            </div>
                        </div>

                        <div className="absolute -bottom-[40px] md:-bottom-[60px] left-4 md:left-6">
                            <div
                                className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] rounded-full border-[4px] border-white overflow-hidden bg-white shadow-sm relative group cursor-pointer"
                                onClick={() => profileImageRef.current.click()}
                            >
                                <img
                                    src={frontendProfileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FiCamera className="text-white w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 flex flex-col gap-5">
                        <div className="flex flex-wrap justify-between gap-y-4">
                            <InputGroup
                                label="First Name*"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                half
                            />
                            <InputGroup
                                label="Last Name*"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                half
                            />
                        </div>
                        <InputGroup
                            label="Headline*"
                            placeholder="Ex: Software Engineer"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                        <div className="flex flex-wrap justify-between gap-y-4">
                            <InputGroup
                                label="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                half
                            />
                            <InputGroup
                                label="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                half
                            />
                        </div>
                        <InputGroup
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />

                        <hr className="border-gray-200 my-2" />

                        {/* Skills Section */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-semibold flex items-center gap-2"
                                    >
                                        {skill}
                                        <RxCross1
                                            className="cursor-pointer hover:text-red-500"
                                            onClick={() => removeSkill(skill)}
                                        />
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="text"
                                    placeholder="Add a new skill"
                                    className="flex-1 h-[40px] px-3 border border-gray-400 rounded outline-none focus:border-[#0a66c2]"
                                    value={newSkills}
                                    onChange={(e) =>
                                        setNewSkills(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && addSkill(e)
                                    }
                                />
                                <button
                                    onClick={addSkill}
                                    className="px-6 py-1 border border-[#0a66c2] text-[#0a66c2] font-semibold rounded-full hover:bg-blue-50 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <hr className="border-gray-200 my-2" />

                        {/* Education (Standard) */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FiBook /> Education
                            </h3>
                            <div className="flex flex-col gap-3">
                                {education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-start"
                                    >
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {edu.college}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {edu.degree} •{edu.fieldOfStudy}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {edu.startingYear} •
                                                {edu.endingYear}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeEducation(edu)}
                                            className="text-gray-400 hover:text-red-500 p-1"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col gap-3">
                                <h4 className="text-sm font-semibold text-gray-600">
                                    Add Education
                                </h4>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    placeholder="School / College"
                                    value={newEducation.college}
                                    onChange={(e) =>
                                        setNewEducation({
                                            ...newEducation,
                                            college: e.target.value,
                                        })
                                    }
                                />
                                <div className="flex gap-2">
                                    <input
                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                        placeholder="Degree"
                                        value={newEducation.degree}
                                        onChange={(e) =>
                                            setNewEducation({
                                                ...newEducation,
                                                degree: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                        placeholder="Field of Study"
                                        value={newEducation.fieldOfStudy}
                                        onChange={(e) =>
                                            setNewEducation({
                                                ...newEducation,
                                                fieldOfStudy: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                        placeholder="Start Year"
                                        value={newEducation.startingYear}
                                        onChange={(e) =>
                                            setNewEducation({
                                                ...newEducation,
                                                startingYear: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                        placeholder="End Year"
                                        value={newEducation.endingYear}
                                        onChange={(e) =>
                                            setNewEducation({
                                                ...newEducation,
                                                endingYear: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <button
                                    onClick={addEducation}
                                    className="self-start text-[#0a66c2] font-semibold text-sm flex items-center gap-1 hover:underline"
                                >
                                    <FiPlus /> Add Education
                                </button>
                            </div>
                        </div>

                        <hr className="border-gray-200 my-2" />

                        {/* Experience (Standard) */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FiBriefcase /> Experience
                            </h3>
                            <div className="flex flex-col gap-3">
                                {experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-start"
                                    >
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {exp.title}
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                {exp.company}
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                {exp.startingYear} -{' '}
                                                {exp.endingYear || 'Present'}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {exp.description}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeExperience(exp)
                                            }
                                            className="text-gray-400 hover:text-red-500 p-1"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col gap-3">
                                <h4 className="text-sm font-semibold text-gray-600">
                                    Add Experience
                                </h4>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    placeholder="Title"
                                    value={newExperience.title}
                                    onChange={(e) =>
                                        setNewExperience({
                                            ...newExperience,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    placeholder="Company"
                                    value={newExperience.company}
                                    onChange={(e) =>
                                        setNewExperience({
                                            ...newExperience,
                                            company: e.target.value,
                                        })
                                    }
                                />
                                <div className="flex gap-2">
                                    <input
                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                        placeholder="Start Year"
                                        value={newExperience.startingYear}
                                        onChange={(e) =>
                                            setNewExperience({
                                                ...newExperience,
                                                startingYear: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="w-1/2 p-2 border border-gray-300 rounded text-sm"
                                        placeholder="End Year"
                                        value={newExperience.endingYear}
                                        onChange={(e) =>
                                            setNewExperience({
                                                ...newExperience,
                                                endingYear: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    placeholder="Description"
                                    rows="2"
                                    value={newExperience.description}
                                    onChange={(e) =>
                                        setNewExperience({
                                            ...newExperience,
                                            description: e.target.value,
                                        })
                                    }
                                />

                                <button
                                    onClick={addExperience}
                                    className="self-start text-[#0a66c2] font-semibold text-sm flex items-center gap-1 hover:underline"
                                >
                                    <FiPlus /> Add Experience
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end bg-white">
                    <button
                        className="px-6 py-2 rounded-full bg-[#0a66c2] text-white font-semibold text-[16px] hover:bg-[#004182] transition-colors disabled:opacity-50"
                        disabled={saving}
                        onClick={handleSaveProfile}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default EditProfile;
