import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axiosClient from '../components/axiosClient';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axiosClient.get('/Phones/Search', {
                params: { search: searchTerm },
            });

            // Log the data to check if it's retrieved successfully
            console.log('Data from API:', response.data);

            // Use navigate to go to the '/search' route with searchData as state
            navigate('/search', { state: { searchData: response.data } });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="button" onClick={handleSearch}>
                Tìm
            </button>
        </div>
    );
}

export default SearchBar;
