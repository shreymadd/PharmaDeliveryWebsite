import React, { useEffect, useState} from 'react'
import { products } from '../assets/assets'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    
    useEffect(() => {
        // Sort products by date in descending order (newest first) and take first 4
        const sortedProducts = [...products].sort((a, b) => b.date - a.date);
        setLatestProducts(sortedProducts.slice(0, 4));
    }, []);

    return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'New'} text2={'Launches'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            "Discover Our Latest Collection of Medicines"
Stay ahead with the newest and most effective medicines, carefully selected to meet your healthcare needs. From advanced prescription treatments to essential over-the-counter solutions, explore our latest arrivals and ensure the best care for yourself and your loved ones. Shop now for trusted, high-quality medications at the best prices.
            </p>
        </div>
        {/* rendering products*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((items,index)=>(
                    <ProductItem key={items._id} id={items._id} image={items.image} name={items.name} price={items.price}/>
                ))
            }
        </div>
    </div>
    )
}

export default LatestCollection;
