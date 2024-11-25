import {useLoaderData, Link } from 'react-router-dom'

export default function Sales() {
    const products = useLoaderData()
    return (
        <>
            <div>
                <h1>This is Sales</h1>
                <div className="">
                    {products.map((prod) => (
                        <Link to="/" key={prod.id}>
                            <p>{prod.name}</p>
                            <p>{prod.price}</p>
                            <p>{prod.description}</p>
                            <p>{prod.category}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export const productsLoader = async () => {
    const res = await fetch('http://localhost:4000/Products');
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json();
};
