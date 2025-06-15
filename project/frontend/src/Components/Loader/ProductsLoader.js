import axios from "axios";

export async function ProductsLoader() {
  const { data } = await axios.get("http://localhost/loop_backend/products/fetchproducts.php");
  console.log("ProductsLoader: Response received:", data);
  
  const transformedData = transformToStructuredProducts(data);
  console.log("ProductsLoader: Transformed data:", transformedData);
  
  return transformedData;
}

function transformToStructuredProducts(flatProducts) {
  console.log("Transform: Input flatProducts:", flatProducts);
  
  const categoriesMap = {};
  let categoryId = 1;

  flatProducts.forEach((product, index) => {
    console.log(`Transform: Processing product ${index}:`, product);
    
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
      product_size,
      created_at
    } = product;

    console.log(`Transform: Raw product_image for ${product_name}:`, product_image, typeof product_image);
    console.log(`Transform: Raw product_color for ${product_name}:`, product_color, typeof product_color);
    console.log(`Transform: Raw product_size for ${product_name}:`, product_size, typeof product_size);

    // Transform comma-separated strings to arrays with type checking
    const imageArray = product_image && typeof product_image === 'string' 
      ? product_image.split(',').map(img => img.trim()).filter(Boolean) 
      : Array.isArray(product_image) 
        ? product_image 
        : [];

    const colorArray = product_color && typeof product_color === 'string' 
      ? product_color.split(',').map(color => color.trim()).filter(Boolean) 
      : Array.isArray(product_color) 
        ? product_color 
        : [];

    const sizeArray = product_size && typeof product_size === 'string' 
      ? product_size.split(',').map(size => size.trim()).filter(Boolean) 
      : Array.isArray(product_size) 
        ? product_size 
        : [];

    console.log(`Transform: Processed arrays for ${product_name}:`, {
      imageArray,
      colorArray,
      sizeArray
    });

    // Create category if it doesn't exist
    if (!categoriesMap[product_category]) {
      categoriesMap[product_category] = {
        id: categoryId++,
        name: product_category,
        Items: []
      };
      console.log(`Transform: Created new category: ${product_category}`);
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
        image: imageArray,
        size: sizeArray,
        color: colorArray,
        quantity: parseInt(product_quantity),
        price: parseFloat(product_price),
        category: product_category,
        rating: parseFloat(product_rating),
        stars: generateStars(parseFloat(product_rating)),
        description: product_description || `A ${product_name.toLowerCase()} that's perfect for any occasion.`,
        created_at: created_at
      };
      
      console.log(`Transform: Created new product:`, existingProduct);
      categoriesMap[product_category].Items.push(existingProduct);
    } else {
      console.log(`Transform: Found existing product, merging data for: ${product_name}`);
      
      // Update existing product with additional variants
      // Merge images if not already present
      imageArray.forEach(img => {
        if (!existingProduct.image.includes(img)) {
          existingProduct.image.push(img);
          console.log(`Transform: Added image ${img} to existing product`);
        }
      });
      
      // Merge colors if not already present
      colorArray.forEach(color => {
        if (!existingProduct.color.includes(color)) {
          existingProduct.color.push(color);
          console.log(`Transform: Added color ${color} to existing product`);
        }
      });

      // Merge sizes if not already present
      sizeArray.forEach(size => {
        if (!existingProduct.size.includes(size)) {
          existingProduct.size.push(size);
          console.log(`Transform: Added size ${size} to existing product`);
        }
      });
      
      // Update quantity
      const oldQuantity = existingProduct.quantity;
      existingProduct.quantity += parseInt(product_quantity);
      console.log(`Transform: Updated quantity from ${oldQuantity} to ${existingProduct.quantity}`);
    }
  });

  console.log("Transform: Final categoriesMap:", categoriesMap);

  const result = {
    Products: Object.values(categoriesMap)
  };
  
  console.log("Transform: Final result structure:", result);
  
  return result;
}

// Helper function to generate star display
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) {
    stars += '☆';
  }
  stars += '☆'.repeat(emptyStars);
  
  return stars;
}
