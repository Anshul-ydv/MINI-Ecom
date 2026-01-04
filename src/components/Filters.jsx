import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import useDebounce from '../hooks/useDebounce';

export default function Filters() {
    const {
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortOrder,
        setSortOrder,
        allCategories
    } = useContext(ShopContext);

    const [localSearch, setLocalSearch] = useState('');
    const debouncedSearch = useDebounce(localSearch, 300);

    useEffect(() => {
        setSearchQuery(debouncedSearch);
    }, [debouncedSearch, setSearchQuery]);

    return (
        <div className="filters container">
            <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="search-input"
            />

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
            >
                <option value="">All Categories</option>
                {allCategories.map(cat => (
                    <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                ))}
            </select>

            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
            >
                <option value="">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
            </select>

            {(localSearch || selectedCategory || sortOrder) && (
                <button
                    onClick={() => {
                        setLocalSearch('');
                        setSelectedCategory('');
                        setSortOrder('');
                    }}
                    className="clear-filters-btn"
                >
                    Clear
                </button>
            )}
        </div>
    );
}
