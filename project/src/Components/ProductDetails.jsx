import { Link, useLoaderData, useNavigate} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast';

// REDUX
import { userActions } from "./RTK/User/userSlice";
import BreadCrumbs from "./BreadCrumbs";
import { HashLink } from "react-router-hash-link";

export default function ProductDetails() {

    const currentUser = useSelector((state) => state.user.currentUser)

    const product = useLoaderData()
    const navigate = useNavigate()
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const AddToCart = () => toast.success('Successfully added to Cart!');
    const dispatch = useDispatch()

    function handleAddToCart(id, name, img, size, color, price, category) {

        if(!currentUser){
          navigate('/login'); //redirect to login if theres no current user
        }else{
          const cartId =  uuidv4();
          dispatch(userActions.addToUserListCart({
            email: currentUser.email, 
            product: {cartId, id, name, img, size, color, price, category }, 
          }));
          AddToCart()
          setColor(null)
          setSize(null)
        }
    }
    return (
        <>
            <div className="w-full flex justify-center items-center bg-white text-gray-900 py-20">
                <div className="flex justify-center items-center w-[80rem]">
                    {product ? (
                        <div>
                            <div className="flex flex-wrap justify-between xsm:px-3 xsm:py-2 xl:px-1 xl:py-1">
                                {/* <p className="flex flex-row font-noto gap-x-2"><Link>Products</Link> {">"} <HashLink smooth to={`/products#${product.category.replace(/\s+/g, '-')}`}>{product.category}</HashLink> {">"} <p>{product.name}</p></p> */}
                                <BreadCrumbs/>
                            </div>
                            <div className="flex xl:flex-row xsm:flex-col xsm:items-center gap-x-3">
                                <img src={product.image} alt="" className="xl:size-96 xsm:size-32"/>
                                <div className="p-3 flex flex-col xl:gap-y-4 xsm:gap-y-2">
                                    <p className="xl:text-3xl xsm:text-2xl font-noto">{product.name}</p>
                                    <p>₱{product.price}.00</p>
                                    <div className="flex flex-row  gap-x-4">
                                    <select name="size" className="w-full">
                                        <option value="none" disabled selected className="xl:text-base xsm:text-sm">
                                        Select a size
                                        </option>
                                        {product.size && Array.isArray(product.size) ? (
                                        product.size.map((size, index) => (
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
                                        {product.color && Array.isArray(product.color) ? (
                                        product.color.map((color, index) => (
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
                                    <p className="text-yellow-400">{product.stars}</p>
                                    <p >{product.rating}</p>
                                    </div>
                                    <div className="">
                                    <p>Description</p>
                                    <p className="xl:text-base xsm:text-sm">{product.description}</p>
                                    </div>
                                    <div className="flex self-center">
                                    <button onClick={() => handleAddToCart(product.id, product.name, product.image, size, color, product.price, product.category)} className="bg-[#885B56] text-white font-light px-2 py-2 font-serif">Add To Cart</button>
                                    </div>
                                </div>
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