import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
    const { staticProductsList, backendProducts } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (staticProductsList?.length > 0 || backendProducts?.length > 0) {
            // Combine both static and backend products
            let allProducts = [...staticProductsList, ...backendProducts];
            
            // Filter products by category and subCategory
            let filteredProducts = allProducts.filter((item) => 
                category === item.category && subCategory === item.subCategory
            );

            // Remove the current product from related products
            filteredProducts = filteredProducts.slice(0, 5);
            
            setRelated(filteredProducts);
        }
    }, [staticProductsList, backendProducts, category, subCategory]);

    if (related.length === 0) return null;

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item) => (
                    <ProductItem 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        price={item.price} 
                        image={item.image}
                        sizes={item.sizes}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
