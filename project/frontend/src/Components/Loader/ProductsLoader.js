import axios from "axios";

export async function ProductsLoader() {
  const { data } = await axios.get("http://localhost/loop_backend/products/fetchproducts.php");
  console.log("ProductsLoader: Response received:", data);
  return transformToStructuredProducts(data);
}

function transformToStructuredProducts(flatProducts) {
  const categoriesMap = {};
  let categoryId = 1;

  flatProducts.forEach((product) => {
    const {
      product_id,
      product_name,
      product_image,
      product_price,
      product_category,
      product_color,
      product_quantity,
      product_rating,
      product_description,
      created_at
    } = product;

    // Create category if it doesn't exist
    if (!categoriesMap[product_category]) {
      categoriesMap[product_category] = {
        id: categoryId++,
        name: product_category,
        Items: []
      };
    }

    // Check if product already exists in this category
    let existingProduct = categoriesMap[product_category].Items.find(
      item => item.name === product_name
    );

    if (!existingProduct) {
      // Create new product
      existingProduct = {
        id: parseInt(product_id),
        name: product_name,
        image: [product_image], // Start with array containing first image
        size: [], // Will be populated if you have size data
        color: [product_color],
        quantity: parseInt(product_quantity),
        price: parseFloat(product_price),
        category: product_category,
        rating: parseFloat(product_rating),
        stars: generateStars(parseFloat(product_rating)),
        description: product_description || `A ${product_name.toLowerCase()} that's perfect for any occasion.`,
        created_at: created_at
      };
      
      categoriesMap[product_category].Items.push(existingProduct);
    } else {
      // Update existing product with additional variants
      // Add image if not already present
      if (!existingProduct.image.includes(product_image)) {
        existingProduct.image.push(product_image);
      }
      
      // Add color if not already present
      if (!existingProduct.color.includes(product_color)) {
        existingProduct.color.push(product_color);
      }
      
      // Update quantity (sum or take max, depending on your business logic)
      existingProduct.quantity += parseInt(product_quantity);
    }
  });

  // Convert to array format matching your original JSON structure
  return {
    Products: Object.values(categoriesMap)
  };
}

// Helper function to generate star display
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) {
    stars += '☆'; // You might want to use a half-star character
  }
  stars += '☆'.repeat(emptyStars);
  
  return stars;
}
