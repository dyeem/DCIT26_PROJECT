// src/utils/productsLoader.js
export const productsLoader = async () => {
    const res = await fetch('http://localhost:4000/Products');
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json();
};
