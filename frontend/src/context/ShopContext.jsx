import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { products as initialProducts } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState(initialProducts);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    // Function to update product stock after adding to cart
    const updateProductStock = (itemId, size) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product._id === itemId) {
                    // If product has sizes
                    if (product.sizes) {
                        return {
                            ...product,
                            sizes: product.sizes.filter(s => s !== size)
                        };
                    }
                    // If product doesn't have sizes
                    return {
                        ...product,
                        inStock: false
                    };
                }
                return product;
            });
        });
    };

    const addToCart = async (itemId, size) => {
        if (!size && products.find(p => p._id === itemId)?.sizes) {
            toast.error('Select Product Size');
            return;
        }

        // Check if product is in stock
        const product = products.find(p => p._id === itemId);
        if (!product) {
            toast.error('Product not found');
            return;
        }

        if (product.sizes && !product.sizes.includes(size)) {
            toast.error('Selected size is out of stock');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
        updateProductStock(itemId, size);
        toast.success('Added to cart successfully!');

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        if (quantity < 0) return;

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const removeFromCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
            setCartItems(cartData);

            // Restore product stock
            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    if (product._id === itemId) {
                        if (product.sizes) {
                            return {
                                ...product,
                                sizes: [...(product.sizes || []), size]
                            };
                        }
                        return {
                            ...product,
                            inStock: true
                        };
                    }
                    return product;
                });
            });

            if (token) {
                try {
                    await axios.post(
                        backendUrl + '/api/cart/remove',
                        { itemId, size },
                        { headers: { token } }
                    );
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                // Sort products by date in descending order (newest first)
                const sortedProducts = response.data.products.sort((a, b) => b.date - a.date);
                setProducts(sortedProducts);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity,
        removeFromCart,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;