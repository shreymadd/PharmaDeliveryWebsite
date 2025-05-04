import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductItem = ({id, image, name, price, sizes}) => {
    const { currency, addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');

    // Handle both array and single image cases
    const imageUrl = Array.isArray(image) ? image[0] : image;

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation when clicking add to cart
        if (sizes && !selectedSize) {
            toast.error('Please select a size');
            return;
        }
        addToCart(id, selectedSize);
    };

    return (
        <div className='group'>
            <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
                <div className='overflow-hidden'>
                    <img 
                        className='hover:scale-110 transition ease-in-out w-full h-48 object-cover' 
                        src={imageUrl} 
                        alt={name} 
                    />
                </div>
                <p className='pt-3 pb-1 text-sm'>{name}</p>
                <p className='text-sm font-medium'>{currency}{price}</p>
            </Link>
            
            {/* Size selector if product has sizes */}
            {sizes && sizes.length > 0 && (
                <div className='mt-2 flex gap-2'>
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-2 py-1 text-xs border rounded ${
                                selectedSize === size 
                                    ? 'bg-black text-white' 
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            )}

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className='w-full mt-2 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors'
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;
