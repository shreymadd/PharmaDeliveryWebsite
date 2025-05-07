import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
  const { staticProductsList } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState('relevant');
  const [search, setSearch] = useState('');

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
    'summer Essentials': false
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

  // Apply filters + search
  const filteredProducts = staticProductsList.filter(product => {
    // Search match
    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());

    // Category match
    const activeCategories = Object.keys(categoryFilters).filter(cat => categoryFilters[cat]);
    const categoryMatch = activeCategories.length === 0 || activeCategories.includes(product.category);

    // Subcategory match
    const activeSubCategories = Object.keys(subCategoryFilters).filter(sub => subCategoryFilters[sub]);
    const subCategoryMatch = activeSubCategories.length === 0 || activeSubCategories.includes(product.subCategory);

    return searchMatch && categoryMatch && subCategoryMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];
  if (sortOption === 'low-to-high') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-to-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'newest') {
    sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
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
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Category</p>
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
          <p className='mb-3 text-sm font-medium'>SubCategory</p>
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
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center text-base sm:text-2xl mb-4 gap-3 sm:gap-0'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm px-2 py-1 border border-gray-300 rounded-md sm:w-64"
          />

          {/* Sort dropdown */}
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
