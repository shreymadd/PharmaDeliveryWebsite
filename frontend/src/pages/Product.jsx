import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; // Assuming star icons exist here
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { staticProductsList, backendProducts, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Check both static and backend products
    const staticProduct = staticProductsList.find(item => item._id === productId);
    const backendProduct = backendProducts.find(item => item._id === productId);
    const product = staticProduct || backendProduct;

    if (product) {
      setProductData(product);
      setMainImage(Array.isArray(product.image) ? product.image[0] : product.image);
      setSelectedSize(product.sizes?.[0] || '');
    }
  }, [productId, staticProductsList, backendProducts]);

  const handleAddToCart = async () => {
    if (productData.sizes?.length && !selectedSize) {
      alert('Please select a size');
      return;
    }
    setIsAdding(true);

    addToCart(productData._id, selectedSize || 'default');

    await new Promise(res => setTimeout(res, 500));
    setIsAdding(false);
  };

  if (!productData) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8 border-t'>
      <div className='flex flex-col md:flex-row gap-8'>

        {/* Images */}
        <div className='md:w-1/2'>
          <img src={mainImage} alt={productData.name} className='w-full h-96 object-contain rounded' />
          <div className='flex gap-2 mt-4 overflow-x-auto'>
            {(Array.isArray(productData.image) ? productData.image : [productData.image]).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 cursor-pointer border-2 rounded ${mainImage === img ? 'border-blue-500' : 'border-gray-200'}`}
                alt=''
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='md:w-1/2'>
          <h1 className='text-3xl font-bold'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt='star' className='w-4' />)}
            <img src={assets.star_dull_icon} alt='star' className='w-4' />
            <span className='text-sm text-gray-500'>(122)</span>
          </div>
          <p className='text-2xl mt-4 font-semibold'>{currency}{productData.price}</p>
          <p className='mt-4 text-gray-600'>{productData.description}</p>

          {/* Size */}
          {productData.sizes?.length > 0 && (
            <div className='mt-6'>
              <p className='text-sm font-medium'>Select Size</p>
              <div className='flex gap-2 mt-2'>
                {productData.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${selectedSize === size ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className='mt-6'>
            <p className='text-sm font-medium'>Quantity</p>
            <div className='flex items-center gap-4 mt-2'>
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className='px-3 py-1 border rounded hover:bg-gray-100'
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className='px-3 py-1 border rounded hover:bg-gray-100'
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className='w-full mt-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400'
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>

          {/* Return Policy */}
          <div className='mt-6 text-sm text-gray-600 space-y-1'>
            <p>✔ 100% Genuine Medicines sourced only from licensed pharmacies</p>
            <p>✔ Easy 7-day returns for unopened products</p>
            <p>✔ Cash on Delivery available for all orders</p>
            <p>✔ Free delivery on orders above ₹500</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className='mt-12'>
        <h2 className='text-lg font-semibold mb-4'>Product Description</h2>
        <p className='text-gray-600'>
          An e-commerce platform that enables fast, reliable, and secure transactions for users. With detailed product listings, seamless cart integration, and responsive design, customers can shop with confidence and ease.
        </p>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
