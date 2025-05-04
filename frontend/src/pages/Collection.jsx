import React, { useState } from 'react';
import { products, assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState('relevant');
  
  // Filter states
  const [categoryFilters, setCategoryFilters] = useState({
    'Health care': false,
    'personal care': false,
    'Men': false,
    'Women': false,
    'Kids': false
  });
  
  const [subCategoryFilters, setSubCategoryFilters] = useState({
    'gender-Specific': false,
    'summer Essentials': false,
    'Topwear': false,
    'Bottomwear': false
  });
  
  const [priceFilters, setPriceFilters] = useState({
    'Under ₹500': false,
    '₹500 - ₹1000': false,
    'Above ₹1000': false
  });

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setCategoryFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSubCategoryChange = (subCategory) => {
    setSubCategoryFilters(prev => ({
      ...prev,
      [subCategory]: !prev[subCategory]
    }));
  };

  const handlePriceChange = (priceRange) => {
    setPriceFilters(prev => ({
      ...prev,
      [priceRange]: !prev[priceRange]
    }));
  };

  // Apply filters to products
  const filteredProducts = products.filter(product => {
    // Category filter
    const categoryMatch = Object.keys(categoryFilters).every(key => 
      !categoryFilters[key] || product.category === key
    );
    
    // SubCategory filter
    const subCategoryMatch = Object.keys(subCategoryFilters).every(key => 
      !subCategoryFilters[key] || product.subCategory === key
    );
    
    // Price filter
    const priceMatch = 
      (!priceFilters['Under ₹500'] || product.price < 500) &&
      (!priceFilters['₹500 - ₹1000'] || (product.price >= 500 && product.price <= 1000)) &&
      (!priceFilters['Above ₹1000'] || product.price > 1000);
    
    return categoryMatch && subCategoryMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];
  if (sortOption === 'low-to-high') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-to-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'newest') {
    sortedProducts.sort((a, b) => b.date - a.date);
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter option */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle"
          />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-2 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(categoryFilters).map(category => (
              <label key={category} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type="checkbox" 
                  checked={categoryFilters[category]}
                  onChange={() => handleCategoryChange(category)}
                /> 
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Sub Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(subCategoryFilters).map(subCategory => (
              <label key={subCategory} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type="checkbox" 
                  checked={subCategoryFilters[subCategory]}
                  onChange={() => handleSubCategoryChange(subCategory)}
                /> 
                {subCategory}
              </label>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Price Range</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(priceFilters).map(range => (
              <label key={range} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type="checkbox" 
                  checked={priceFilters[range]}
                  onChange={() => handlePriceChange(range)}
                /> 
                {range}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          <select
            className='text-sm border border-gray-300 px-3 py-1 rounded-md'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='newest'>Sort by: Newest</option>
            <option value='low-to-high'>Sort by: Low to High</option>
            <option value='high-to-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductItem 
                key={product._id} 
                id={product._id} 
                image={product.image} 
                name={product.name} 
                price={product.price}
                sizes={product.sizes}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p>No products match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;