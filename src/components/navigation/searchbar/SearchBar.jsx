import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SEARCH_COOKIE_NAME = 'searchHistory';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const history = Cookies.get(SEARCH_COOKIE_NAME);
        if (history) {
            const parsedHistory = JSON.parse(history);
            setSearchHistory(parsedHistory);
            if (parsedHistory.length > 0) {
                setSearchTerm(parsedHistory[0]); 
            }
        }
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = searchHistory.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredHistory(filtered);
        } else {
            setFilteredHistory([]);
        }
    }, [searchTerm, searchHistory]);

    const handleSearch = (event) => {
        event.preventDefault();

        if (searchTerm !== '') {

            const newHistory = [searchTerm, ...searchHistory];
            setSearchHistory(newHistory);

            Cookies.set(SEARCH_COOKIE_NAME, JSON.stringify(newHistory), { expires: 30 });

            navigate(`/search/${searchTerm}`);
        }
        else {
            navigate('/')
        }
    };


    const handleSuggestionClick = (term) => {
        setSearchTerm(term);
        handleSearch(new Event('submit'));
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <div className="input-container">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Я шукаю..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn search-btn">Шукати</button>
            </div>
            {/* {filteredHistory.length > 0 && (
                <ul className="suggestions-list">
                    {filteredHistory.map((item, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(item)} className="suggestion-item">
                            {item}
                        </li>
                    ))}
                </ul>
            )} */}
        </form>
    );
};

export default SearchBar;
