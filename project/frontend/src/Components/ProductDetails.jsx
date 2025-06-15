import { Link, useLoaderData, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './Auth/AuthContext';


export default function ProductDetails() {
    const navigate = useNavigate();
    const { setIsLogin, user } = useAuth(); // grab context setters
    const product = useLoaderData()
    console.log("data: ", product)

    useEffect(() => {
        document.title = `Loop | ${product.product_name} | ${product.product_category}`;
    }, []);

    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const AddToCart = () => toast.success('Successfully added to Cart!');

    function handleAddToCart(id, name, img, size, color, price, category) {
       console.log(" data: ", id, name, img, size, color, price, category)

       if (size === "") {
           toast.error("Please select a size")
           return
       }

       if (color === "") {
           toast.error("Please select a color")
           return
       }

        AddToCart()

    }

    const [mainImage, setMainImage] = useState(
        Array.isArray(product.product_image) && product.product_image.length > 0 
            ? product.product_image[0] 
            : (product.product_image || '')
    )

    function handleClickImage(img) {
        setMainImage(img)
    }

    function handleSizeChange(e) {
        setSize(e.target.value);
    }

    function handleCheckout(id, name, img, size, color, price, category) {

        if (size === "") {
            toast.error("Please select a size")
            return
        }

        if (color === "") {
            toast.error("Please select a color")
            return
        }

        console.log("checkout data: ", id, name, img, size, color, price, category)

        if(setIsLogin === true) {
            console.log("user: ", user)

            
        }else{
            console.log("user: ", user)
            toast.error("Please login to continue. You wil be redirected to login page")
            // add a timer to redirect to login page
            setTimeout(() => {
                navigate('/login')
            }, 2500);
        }
    }
    
    return (
        <>
            <div className="w-full bg-white text-gray-900 py-4">
                <div className="max-w-7xl mx-auto shadow-xl rounded-xl p-3">
                    {product ? (
                        <div className="space-y-8 py-12">
                            <div className="px-7 flex justify-between items-center text-base font-noto font-medium text-gray-700">
                                <p className="flex flex-wrap items-center gap-1">
                                    <Link to={'/'}>Home</Link> {'>'} 
                                    <Link to={'/products'}>Products</Link> {'>'} 
                                    <Link to={`/products#${product.product_category}`}>{product.product_category}</Link> {">"} 
                                    <p className="underline">{product.product_name}</p>
                                </p>
                                <Link to='/products' className="font-noto">{"<"} Back to Product Page</Link>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center px-5">
                                <div className="">
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={`/Assets/Products/${product.product_category}/${mainImage}`}
                                            alt={product.product_name}
                                            className="xl:size-96 xsm:size-32 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-x-3 mt-3 flex-wrap">
                                        {product.product_image && Array.isArray(product.product_image) ? (
                                            product.product_image.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={`/Assets/Products/${product.product_category}/${img}`}
                                                    alt={`${product.product_name} ${index + 1}`}
                                                    className="w-32 cursor-pointer hover:scale-110 transition-transform duration-100 rounded-md "
                                                    title={`${product.product_name} - Image ${index + 1}`}
                                                    onClick={() => handleClickImage(img)}
                                                />
                                            ))
                                        ) : (
                                            product.product_image && (
                                                <img
                                                    src={`/Assets/Products/${product.product_category}/${product.product_image}`}
                                                    alt={product.product_name}
                                                    className="w-32 cursor-pointer hover:scale-110 transition-transform duration-100 rounded-md bg-gray-100 p-3"
                                                    title={product.product_name}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-3 flex flex-col xl:gap-y-2 xsm:gap-y-2 ">
                                    <div className="flex flex-col xl:gap-y-4 xsm:gap-y-2 mb-5">
                                        <p className="font-noto text-gray-500">Loop {product.product_category}</p>
                                        <p className="xl:text-5xl xsm:text-2xl font-noto font-semibold">{product.product_name}</p>
                                        <div className="flex flex-row justify-between items-center">
                                            <p className="font-noto font-semibold text-3xl">₱{product.product_price}</p>
                                            <div className="flex flex-wrap gap-x-1 text-3xl">
                                                <p className="text-yellow-400 ">⭐</p>
                                                <p>{product.product_rating}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="xl:w-full xsm:w-full xl:mb-4 xsm:mb-2" />

                                    <div className="mb-5">
                                        <p className="text-3xl font-noto font-semibold mb-2">Description:</p>
                                        <p className="xl:text-base xsm:text-sm text-gray-500 text-justify">{product.product_description}</p>
                                    </div>

                                    <hr className="xl:w-full xsm:w-full xl:mb-4 xsm:mb-2" />

                                    <div className="flex flex-row gap-x-4">
                                        <div className="w-full">
                                            <label htmlFor="" className="font-semibold text-gray-500">Sizes:</label>
                                            <select required name="size" className="w-full" onChange={(e) => handleSizeChange(e)}>
                                                <option value="" disabled selected className="xl:text-base xsm:text-sm">
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
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="" className="font-semibold text-gray-500">Colors:</label>
                                            <select required name="color" className="w-full" onChange={(e) => setColor(e.target.value)}>
                                                <option value="" disabled selected className="xl:text-base xsm:text-sm">
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
                                    </div>
                                    
                                    <div className="flex flex-row justify-between mt-8 gap-x-2">
                                        <div className="w-full">
                                            <button
                                                onClick={() => handleAddToCart(
                                                    product.product_id,
                                                    product.product_name,
                                                    mainImage,
                                                    size,
                                                    color,
                                                    product.product_price,
                                                    product.product_category
                                                )}
                                                className="w-full bg-[#885B56] text-white  px-2 py-3 font-semibold font-noto rounded-md hover:bg-[#69413D] transition-colors duration-300"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                        <div className="w-full">
                                            <button
                                                onClick={() => handleCheckout (
                                                    product.product_id,
                                                    product.product_name,
                                                    mainImage,
                                                    size,
                                                    color,
                                                    product.product_price,
                                                    product.product_category
                                                )}
                                                className="w-full text-black px-2 py-3 font-noto border border-[#69413D] rounded-md hover:bg-[#69413D] hover:text-white transition-colors duration-300"
                                            >
                                                Checkout Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>  
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            /> 
        </>
    )
}