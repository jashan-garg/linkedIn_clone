/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dp from '../assets/dp.webp';

function SearchBar() {
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1); // For keyboard navigation

    const resultsRef = useRef([]);

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            setSearchData([]);
            return;
        }

        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/user/search?query=${searchInput}`,
                { withCredentials: true }
            );
            setSearchData(data);
        } catch (err) {
            console.error('Search error:', err);
        }
    };

    // Auto-focus on mobile
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    // Trigger search on input
    useEffect(() => {
        if (searchInput.trim() !== '') {
            handleSearch();
        } else {
            setSearchData([]);
        }
        setActiveIndex(-1); // reset selection
    }, [searchInput]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (searchData.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev < searchData.length - 1 ? prev + 1 : 0
            );
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : searchData.length - 1
            );
        }

        if (e.key === 'Enter' && activeIndex !== -1) {
            e.preventDefault();
            const chosen = searchData[activeIndex];
            if (chosen) {
                window.location.href = `/profile/${chosen.userName}`;
                setSearchInput('');
            }
        }
    };

    const renderResults = (mobile = false) => {
        return (
            <div
                className={`${
                    mobile
                        ? 'border-t max-h-64'
                        : 'absolute top-12 left-0 right-0'
                } bg-white rounded-md shadow-lg border max-h-60 overflow-y-auto z-50`}
            >
                {searchData.length === 0 && searchInput.trim() !== '' ? (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                        No users found
                    </div>
                ) : (
                    searchData.map((user, index) => (
                        <Link
                            key={user._id}
                            to={`/profile/${user.userName}`}
                            onClick={() => {
                                setSearchInput('');
                                if (mobile) setOpen(false);
                            }}
                            ref={(el) => (resultsRef.current[index] = el)}
                            className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                                activeIndex === index
                                    ? 'bg-gray-200'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <img
                                src={user.profileImage || dp}
                                alt="dp"
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    @{user.userName}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        );
    };

    return (
        <>
            {/* DESKTOP SEARCH BAR */}
            <div
                className="
                relative hidden md:flex items-center
                bg-[#EDF3F8] px-3 py-2 rounded-md w-56
                transition-all duration-300 ease-in-out
                focus-within:w-[420px]
                focus-within:ring-2 focus-within:ring-[#0A66C2]
            "
            >
                <FaSearch className="text-gray-500 text-sm mr-2 shrink-0" />

                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm w-full placeholder-gray-600"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    onKeyDown={handleKeyDown}
                />

                {/* Results */}
                {searchInput.trim() !== '' && renderResults(false)}
            </div>

            {/* MOBILE SEARCH ICON */}
            <button
                className="md:hidden p-2 text-gray-600 hover:text-black"
                onClick={() => setOpen((p) => !p)}
                aria-label="Toggle search"
            >
                <FaSearch className="text-lg" />
            </button>

            {/* MOBILE DROPDOWN SEARCH */}
            {open && (
                <div className="md:hidden absolute left-2 right-2 top-16 bg-white border rounded-xl shadow-lg z-40">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <FaSearch className="text-gray-500 shrink-0" />

                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none text-sm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            onClick={() => setOpen(false)}
                            className="text-gray-600 hover:text-black"
                            aria-label="Close search"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {searchInput.trim() !== '' && renderResults(true)}
                </div>
            )}
        </>
    );
}

export default SearchBar;
