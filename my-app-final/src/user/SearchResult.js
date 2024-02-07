import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SearchResult=()=> {
    const location = useLocation();
    const [searchData, setSearchData] = useState(null);

    useEffect(() => {
        // Access the state passed during navigation
        const { searchData } = location.state || {};
        console.log('searchData:', searchData);

        if (searchData) {
            // Do something with the search data
            setSearchData(searchData);
        }
    }, [location.state]);

    return (
        <div>
            {searchData ? (
                // Render the search results as needed
                <div className="row isotope-grid">
                {searchData.map(item => (
        
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    image={`https://localhost:7186/${item.thumbnail}`}
                    name={item.name}
                    description={item.description}
                    stock={item.stock}
                  />
        
                ))}
              </div>
            ) : (
                <p>No search results available.</p>
            )}
        </div>
    );
}

export default SearchResult;
