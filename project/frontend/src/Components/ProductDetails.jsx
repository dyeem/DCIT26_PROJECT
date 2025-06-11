import { Link, useLoaderData, useNavigate} from "react-router-dom"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';



export default function ProductDetails() {


    const product = useLoaderData()
    console.log("data: ", product)

    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const AddToCart = () => toast.success('Successfully added to Cart!');

    function handleAddToCart(id, name, img, size, color, price, category) {

        // if(!currentUser){
        //   navigate('/login'); //redirect to login if theres no current user
        // }else{
        //   const cartId =  uuidv4();
          
        //   AddToCart()
        //   setColor(null)
        //   setSize(null)
        // }
    }

    const [mainImage, setMainImage] = useState(Array.isArray(product.image) ? product.image[0] : product.image)

    function handleClickImage (img) {
        setMainImage(img)
    }

    function handleSizeChange (e) {
        setSize(e.target.value);
    }
    
    return (
        <>
            <div className="w-full min-h-screen bg-white text-gray-900 py-24">
                <div className=" max-w-7xl mx-auto">
                    {product ? (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                                <p className="flex flex-wrap items-center gap-1">
                                    <Link to={'/products'} >Products</Link> {'>'} 
                                    <Link to={`/products#${product.product_category}`}>{product.product_category}</Link> {">"} 
                                    <p>{product.product_name}</p></p>
                                {/* <BreadCrumbs/> */}
                                <Link to='/products' className="font-noto">{"<"} Back to Product Page</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center px-5">
                                <div className="flex justify-center items-center">
                                    <img src={`/src/assets/products/${product.product_category}/${product.product_image}`} alt="" className="xl:size-96 xsm:size-32 rounded-md"/>
                                </div>
                                <div className="p-3 flex flex-col xl:gap-y-4 xsm:gap-y-2">
                                    <p className="xl:text-5xl xsm:text-2xl font-noto">{product.product_name}</p>
                                    <p>₱{product.product_price}</p>
                                    <div className="flex flex-row  gap-x-4">
                                    <select name="size" className="w-full" onChange={(e) => handleSizeChange(e)}>
                                        <option value="none" disabled selected className="xl:text-base xsm:text-sm">
                                        Select a size
                                        </option>
                                        {product.product_size && Array.isArray(product.product_size) ? (
                                        product.product_size.map((size, index) => (
                                            <option key={index} value={size}>
                                                {size}
                                            </option>
                                        ))
                                        ) : (
                                        <option disabled>No sizes available</option>
                                        )}
                                    </select>
                                    <select name="color" className="w-full" onChange={(e) => setColor(e.target.value)}>
                                        <option value="none" disabled selected className="xl:text-base xsm:text-sm">
                                        Select a color
                                        </option>
                                        {product.product_color && Array.isArray(product.product_color) ? (
                                        product.product_color.map((color, index) => (
                                            <option key={index} value={color}>
                                                {color}
                                            </option>
                                        ))
                                        ) : (
                                        <option disabled>No colors available</option>
                                        )}
                                    </select>
                                    </div>
                                    <div className="flex flex-wrap gap-x-2">
                                    <p className="text-yellow-400">{product.product_stars}</p>
                                    <p >{product.product_rating} rating</p>
                                    </div>
                                    <div className="">
                                    <p>Description</p>
                                    <p className="xl:text-base xsm:text-sm">{product.product_description}</p>
                                    </div>
                                    <div className="flex self-center">
                                    <button onClick={() => handleAddToCart(product.id, product.name, product.image, size, color, product.price, product.category)} className="bg-[#885B56] text-white font-light px-2 py-2 font-serif">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-x-3 mt-3">
                                {product.product_image && Array.isArray(product.product_image) ? (
                                    product.product_image.map((img, index) => (
                                        <img
                                        key={index}
                                        src={`/Assets/Products/${product.product_category}/${product.product_image}`}
                                        alt={`Product ${index + 1}`}
                                        className="w-32 cursor-pointer hover:scale-110 transition-transform duration-100 rounded-md bg-gray-200 p-2"
                                        title={product.name}
                                        onClick={() => handleClickImage(img)}
                                        />
                                    ))
                                    ) : (
                                    product.product_image && (
                                        <img
                                        src={`/Assets/Products/${product.product_category}/${product.product_image}`}
                                        alt="Product"
                                        className="w-32 cursor-pointer hover:scale-110 transition-transform duration-100 rounded-md bg-gray-100 p-3"
                                        title={product.name}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ) :
                        <p>Loading...</p>
                    }
                </div>
            </div>  
            <Toaster
              position="top-right"
              reverseOrder={false}
            /> 
        </>
    )
}