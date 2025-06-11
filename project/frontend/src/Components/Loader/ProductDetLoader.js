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

    console.log('[Loader] Valid product loaded:', product);
    return product;

  } catch (err) {
    console.error('[Loader] Error fetching product details:', err.message);
    throw new Error('Product not found');
  }
};
