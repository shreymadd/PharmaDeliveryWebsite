import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { staticProductsList, backendProducts } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (staticProductsList?.length > 0 || backendProducts?.length > 0) {
            // Combine both static and backend products
            let allProducts = [...staticProductsList, ...backendProducts];
            
            // Filter products marked as bestseller
            const bestProducts = allProducts.filter((item) => item.bestseller);
            setBestSeller(bestProducts.slice(0, 5));
        }
    }, [staticProductsList, backendProducts]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover our most popular and trusted medicines, carefully selected based on customer satisfaction and effectiveness.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item) => (
                    <ProductItem 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        image={item.image} 
                        price={item.price}
                        sizes={item.sizes}
                    />
                ))}
            </div>
        </div>
    )
}

export default BestSeller
