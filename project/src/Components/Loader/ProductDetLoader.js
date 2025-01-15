export const ProductDetailsLoader = async ({ params }) => {
    const { id } = params;

    const res = await fetch('http://localhost:4000/Products');
    if (!res.ok) {
        throw new Error("Failed to fetch products data");
    }

    const data = await res.json();
    console.log("Response Data:", data); // Debugging: Verify the API response

    // Find the product in the nested structure
    let product = null;
    for (const category of data) {
        product = category.Items.find((item) => item.id === parseInt(id));
        if (product) break; // Stop searching once the product is found
    }

    if (!product) {
        throw new Error("Product not found!");
    }

    console.log("Response Data:", product);
    return product;
};
