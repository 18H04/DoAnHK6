import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const FilterResult=()=> {
    const location = useLocation();
    const [filterData, setFilterData] = useState(null);

    useEffect(() => {
        // Access the state passed during navigation
        const { filterData } = location.state || {};
        console.log('filterData:',filterData);

        if (filterData ) {
            // Do something with the search data
            setFilterData(filterData);
        }
    }, [location.state]);

    return (
        <div>
            {filterData ? (
                // Render the search results as needed
                <div className="row isotope-grid">
                {filterData.map(item => (
        
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
                <p>Không kiếm thấy kết quả cần tìm !!!</p>
            )}
        </div>
    );
}

export default FilterResult;
