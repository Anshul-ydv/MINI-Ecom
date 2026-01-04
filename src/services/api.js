
const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
    try {
        // Fetch a mix of categories to include food (groceries) and some other items
        const [groceriesRes, homeRes] = await Promise.all([
            fetch(`${BASE_URL}/products/category/groceries`),
            fetch(`${BASE_URL}/products/category/kitchen-accessories`)
        ]);

        if (!groceriesRes.ok || !homeRes.ok) {
            throw new Error('Failed to fetch products');
        }

        const groceriesData = await groceriesRes.json();
        const homeData = await homeRes.json();

        // Combine and limit to ~20 items
        let allProducts = [...groceriesData.products, ...homeData.products];

        // Filter out non-veg and pet food items
        const nonVegKeywords = ['Beef', 'Chicken', 'Meat', 'Fish', 'Cat Food', 'Dog Food'];
        allProducts = allProducts.filter(product => {
            const title = product.title.toLowerCase();
            return !nonVegKeywords.some(keyword => title.includes(keyword.toLowerCase()));
        });

        return allProducts.slice(0, 20);
    } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to default if categories fail
        try {
            const res = await fetch(`${BASE_URL}/products?limit=20`);
            const data = await res.json();
            return data.products;
        } catch (e) { return []; }
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        // dummyjson returns array of objects for categories now, we just need slugs or names
        return data.map(c => c.slug || c);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
