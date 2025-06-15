import axios from 'axios';

export const ProductDetailsLoader = async ({ params }) => {
  const { id } = params;
  console.log(`[Loader] Fetching product with ID: ${id}`);

  try {
    const res = await axios.get('http://localhost/loop_backend/products/fetch_detail_products.php', {
      params: { id },
      withCredentials: true
    });

    console.log('[Loader] Axios response:', res);
    console.log('[Loader] Raw response data:', res.data);

    const product = res.data;

    if (!product || product.error || !product.product_id) {
      console.error('[Loader] Invalid or missing product data:', product);
      throw new Error('Product not found');
    }

    // Transform product_image from comma-separated string to array
    if (product.product_image) {
      product.product_image = product.product_image.split(',').map(img => img.trim()).filter(Boolean);
    } else {
      product.product_image = [];
    }

    // Also handle colors and sizes if they're comma-separated
    if (product.product_color && typeof product.product_color === 'string') {
      product.product_color = product.product_color.split(',').map(color => color.trim()).filter(Boolean);
    }

    if (product.product_size && typeof product.product_size === 'string') {
      product.product_size = product.product_size.split(',').map(size => size.trim()).filter(Boolean);
    }

    console.log('[Loader] Valid product loaded:', product);
    return product;

  } catch (err) {
    console.error('[Loader] Error fetching product details:', err.message);
    throw new Error('Product not found');
  }
};
