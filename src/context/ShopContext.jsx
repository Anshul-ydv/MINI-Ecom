import { createContext, useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cart State with LocalStorage initialization
    const [cart, setCart] = useState(() => {
        try {
            const localCart = localStorage.getItem('cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch {
            return [];
        }
    });

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState(''); // 'low-high', 'high-low' or ''

    // Fetch initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [productsData, categoriesData] = await Promise.all([
                fetchProducts(),
                fetchCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
            setLoading(false);
        };
        loadData();
    }, []);

    // Persist cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Cart Actions
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= existing.stock) return prev; // Stock limit reached
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            if (product.stock < 1) return prev; // Should be handled by UI, but safety check
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                if (newQuantity > item.stock) return item; // exceed stock
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    // Derived State: Filtered Products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(lowerQuery));
        }

        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory || p.category.slug === selectedCategory);
        }

        if (sortOrder === 'low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortOrder]);

    return (
        <ShopContext.Provider value={{
            products: filteredProducts,
            allCategories: categories,
            loading,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            sortOrder,
            setSortOrder
        }}>
            {children}
        </ShopContext.Provider>
    );
};
