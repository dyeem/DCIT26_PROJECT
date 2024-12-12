// REDUX
import { useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import { fetchProducts } from "./RTK/Products/productSlice"
import { cartActions } from './RTK/Cart/cartSlice'
import { userActions } from "./RTK/user/userSlice"


// TOASTER
import toast, { Toaster } from 'react-hot-toast';

import { HashLink } from 'react-router-hash-link';
import { useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Dialog,
  Description,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Decor', href: '#' },
  { name: 'Wearable', href: '#' },
  { name: 'Gifts', href: '#' },
  { name: 'Toys', href: '#' },
  { name: 'Functional Items', href: '#' }, 
];
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Dolls', label: 'Dolls', checked: false },
      { value: 'Jacket', label: 'Jacket', checked: false },
      { value: 'Bouquet', label: 'Bouquet', checked: false },
      { value: 'Sweater', label: 'Sweater', checked: false },
      { value: 'Accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'Small', checked: false },
      { value: 'M', label: 'Medium', checked: false },
      { value: 'L', label: 'Large', checked: false },
      { value: 'EL', label: 'Extra-large', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sales() {
  const navigate = useNavigate();
  
  // const { loading, productsByCategory, error } = useSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null); // Added state for selected product ID
  const currentUser = useSelector((state) => state.user.currentUser)

  const dispatch = useDispatch()

  const AddToCart = () => toast.success('Successfully added to Cart!');
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  // useEffect(() => {
  //   dispatch(fetchProducts())
  // }, [])

  function handleAddToCart(id, name, img, size, color, price, category) {

    if(!currentUser){
      navigate('/login'); //redirect to login if theres no current user
    }else{
      dispatch(userActions.addToUserListCart({
        email: currentUser.email, 
        product: { id, name, img, size, color, price, category }, 
      }));
      AddToCart()
      setColor(null)
      setSize(null)
    }
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const products = [
    {
      "id": 1,
      "name": "Dolls",
      "Items": [
        {
          "id": 111,
          "name": "Baby Whale",
          "image": "/src/assets/products/Keychain/babywhale.png",
          "size": ["Small", "Medium", "Large"],
          "color": ["Red", "Yellow", "Black", "Pink", "Green"],
          "quantity": 10,
          "price": 25.00,
          "category": "Dolls",
          "rating": 4.5,
          "stars": "★★★★★",
          "description": "This adorable Baby Whale doll is made with soft crochet material and comes in a variety of colors, including Red, Yellow, Black, Pink, and Green. Perfect for kids or as a charming decoration."
        },
        {
          "id": 112,
          "name": "Crochet Doll Clothes",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Purple",
          "quantity": 14,
          "price": 22.00,
          "category": "Dolls",
          "rating": 4.0,
          "stars": "★★★★☆",
          "description": "These Crochet Doll Clothes in a beautiful purple color are perfect for dressing up your favorite doll. Handmade with care, they add a stylish touch to any collection."
        },
        {
          "id": 113,
          "name": "Crochet Toy",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Orange",
          "quantity": 4,
          "price": 28.00,
          "category": "Dolls",
          "rating": 3.5,
          "stars": "★★★★☆",
          "description": "This vibrant Crochet Toy in bright orange is a fun and unique addition to any playtime. Soft, safe, and perfect for young children, it’s a great gift idea."
        }
      ]
    },
    {
      "id": 2,
      "name": "Flowers",
      "Items": [
        {
          "id": 211,
          "name": "Crochet Bouquet",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Yellow",
          "quantity": 8,
          "price": 35.00,
          "category": "Flowers",
          "rating": 4.7,
          "stars": "★★★★★",
          "description": "This Crochet Bouquet in yellow is a stunning handmade arrangement that adds a warm, cheerful touch to any home or event. A perfect gift for special occasions."
        },
        {
          "id": 212,
          "name": "Crochet Flower Bouquet",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Pink",
          "quantity": 13,
          "price": 40.00,
          "category": "Flowers",
          "rating": 4.8,
          "stars": "★★★★★",
          "description": "This elegant Crochet Flower Bouquet in soft pink is the perfect way to brighten someone's day. Crafted with love and attention to detail, it makes an ideal gift for any occasion."
        }
      ]
    },
    {
      "id": 3,
      "name": "Hairclips",
      "Items": [
        {
          "id": 311,
          "name": "Floral Hairclip",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Pink",
          "quantity": 12,
          "price": 15.00,
          "category": "Hairclips",
          "rating": 4.6,
          "stars": "★★★★★",
          "description": "This Floral Hairclip in soft pink adds a touch of elegance and charm to any hairstyle. The beautiful flower design makes it perfect for special occasions or casual wear."
        },
        {
          "id": 312,
          "name": "Pearl Hairpin",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "White",
          "quantity": 8,
          "price": 18.00,
          "category": "Hairclips",
          "rating": 4.4,
          "stars": "★★★★☆",
          "description": "This sophisticated Pearl Hairpin in white adds a chic, vintage flair to any look. Perfect for weddings, parties, or simply dressing up your everyday style."
        },
        {
          "id": 313,
          "name": "Bow Hairclip",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Blue",
          "quantity": 10,
          "price": 12.00,
          "category": "Hairclips",
          "rating": 4.3,
          "stars": "★★★★☆",
          "description": "This cute Bow Hairclip in blue is a fun and playful accessory for all ages. It adds a pop of color to your hair and is perfect for both casual and formal occasions."
        }
      ]
    },
    {
      "id": 4,
      "name": "Hat",
      "Items": [
        {
          "id": 411,
          "name": "Crochet Hat",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Pink",
          "quantity": 6,
          "price": 20.00,
          "category": "Hat",
          "rating": 4.3,
          "stars": "★★★★☆",
          "description": "This cute Crochet Hat in pink adds a stylish, cozy touch to any outfit. Perfect for cooler weather or as a fashionable accessory for everyday wear."
        }
      ]
    },
    {
      "id": 5,
      "name": "Keychain",
      "Items": [
        {
          "id": 511,
          "name": "Mini Teddy Bear Keychain",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Brown",
          "quantity": 25,
          "price": 8.00,
          "category": "Keychain",
          "rating": 4.7,
          "stars": "★★★★★",
          "description": "This cute Mini Teddy Bear Keychain is the perfect accessory to add some charm to your keys or bag. Its adorable design and soft material make it a fun gift for all ages."
        },
        {
          "id": 512,
          "name": "Leather Tassel Keychain",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Black",
          "quantity": 18,
          "price": 12.00,
          "category": "Keychain",
          "rating": 4.5,
          "stars": "★★★★☆",
          "description": "This sleek Leather Tassel Keychain adds a touch of sophistication to your keys or purse. Its minimalist design and durable leather make it both stylish and practical."
        },
        {
          "id": 513,
          "name": "Personalized Wooden Keychain",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Natural Wood",
          "quantity": 15,
          "price": 10.00,
          "category": "Keychain",
          "rating": 4.8,
          "stars": "★★★★★",
          "description": "This Personalized Wooden Keychain allows you to customize it with initials or a special message. It’s a thoughtful and unique gift, perfect for any occasion."
        }
      ]
    },
    {
      "id": 6,
      "name": "Miscellaneous",
      "Items": [
        {
          "id": 611,
          "name": "Crochet Accessory",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Green",
          "quantity": 15,
          "price": 15.00,
          "category": "Miscellaneous",
          "rating": 4.0,
          "stars": "★★★★☆",
          "description": "This versatile Crochet Accessory in green is perfect for adding a pop of color to any outfit. Lightweight and stylish, it's a great addition to your accessory collection."
        },
        {
          "id": 612,
          "name": "Crochet Scarf",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Black",
          "quantity": 7,
          "price": 30.00,
          "category": "Miscellaneous",
          "rating": 4.5,
          "stars": "★★★★★",
          "description": "This Crochet Scarf in black is not only stylish but also incredibly cozy. A perfect accessory to keep warm during chilly weather while looking fashionable."
        },
        {
          "id": 613,
          "name": "Crochet Purse",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Brown",
          "quantity": 20,
          "price": 18.00,
          "category": "Miscellaneous",
          "rating": 4.3,
          "stars": "★★★★☆",
          "description": "This Crochet Purse in brown is a chic and practical accessory that adds a natural, earthy touch to any outfit. Spacious and stylish, it’s a perfect everyday carry."
        },
        {
          "id": 614,
          "name": "Crochet Earrings",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Gold",
          "quantity": 25,
          "price": 10.00,
          "category": "Miscellaneous",
          "rating": 4.2,
          "stars": "★★★★☆",
          "description": "These Crochet Earrings in gold are a beautiful blend of elegance and handmade craftsmanship. Lightweight and comfortable, they make a perfect accessory for any outfit."
        }
      ]
    },
    {
      "id": 7,
      "name": "Top",
      "Items": [
        {
          "id": 711,
          "name": "Crochet Jacket",
          "image": "/src/assets/avatar.jpg",
          "size": ["Small", "Medium", "Large"],
          "color": "Blue",
          "quantity": 5,
          "price": 50.00,
          "category": "Top",
          "rating": 4.7,
          "stars": "★★★★★",
          "description": "This Crochet Jacket in blue is a perfect blend of style and comfort. Its medium size fits most body types, making it a versatile piece for both casual and semi-formal occasions."
        }
      ]
    }
  ];
  
  const handleImageClick = (productId) => {
    setSelectedProductId(productId); 
    setIsOpen(true); 
  };
  
  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6" >
              <h2 id="products-heading" className="sr-only">Products</h2>
              <div className="flex flex-row gap-x-8 gap-y-10 ">
                {/* Filters */}
                <form className="hidden lg:block sticky top-0 right-0">
                  <h3 className="sr-only">Categories</h3>
                  <nav className="relative">
                    <ul role="list" className="sticky top-0 space-y-4 border-b border-gray-200 pb-6 text-base font-medium text-gray-900">
                      {products.map((category) => (
                        <li key={category.name}>
                          <HashLink smooth to={`#${category.name.replace(/\s+/g, '-')}`}>{category.name}</HashLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="size-4 rounded border-gray-300 text-[#885b56] focus:ring-[#885b56]"
                              />
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="bg-white">
                  <div className="leading-relaxed text-black mx-auto px-4 sm:px-4 max-w-full flex justify-center items-center">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-1 bwlnx:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xsm:grid-cols-1 xsm:gap-1 lg:p-4 group place-self-center">
                        {products.map((product) => ( 
                          <div className="" key={product.id} id={product.name.replace(/\s+/g, '-')}>
                              <p className="text-4xl font-playfair">{product.name}</p>
                              <div className="flex flex-wrap gap-x-4 p-4">
                                {product.Items.map((prod) =>
                                  <div className="bg-gray-100 p-4 " key={prod.id}>
                                      <img onClick={() => handleImageClick(prod.id)} src={prod.image} alt="" className="w-56 cursor-pointer"/>
                                      <p className="text-black text-lg font-noto">{prod.name}</p>
                                      <p className="text-gray-800 font-noto">{prod.category}</p>
                                      <p className="text-gray-800 ">₱{prod.price}.00</p>
                                      <div className="flex flex-wrap">
                                        <p>{prod.stars}</p>
                                        <p>{prod.rating}</p>
                                      </div>
                                  </div>
                                )}
                              </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className={`${isOpen ? 'backdrop-blur-sm fixed z-30' : ''}  inset-0 bg-black/40 z-0`}>
              <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 text-gray-900">
                <div className={`fixed inset-0 flex w-screen items-center justify-center transition-opacity duration-1000 ease-out 
                  ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                  <DialogPanel className="max-w-5xl h-5xl space-y-2 border bg-gray-100 px-14 py-12 transform transition-all duration-300 ease-out">
                    {selectedProductId && products.length > 0 ? (
                      products
                        .flatMap((category) => category.Items)
                        .filter((prod) => prod.id === selectedProductId)
                        .map((prod) => (
                          <div key={prod.id}>
                            <div className="flex flex-wrap justify-between">
                              <DialogTitle className="font-noto text-base">Products {"/"} {prod.category} {"/"} {prod.name}</DialogTitle>
                              <button title="close" className="text-2xl" onClick={() => setIsOpen(false)}>X</button>
                            </div>
                            <div className="flex flex-row gap-x-3">
                              <img src={prod.image} alt="" className="w-96"/>
                              <div className="p-3 flex flex-col gap-y-4">
                                <p className="text-3xl font-noto">{prod.name}</p>
                                <p>₱{prod.price}.00</p>
                                <div className="flex flex-row gap-x-4">
                                  <select name="size" className="w-[10rem]" onChange={(e) => setSize(e.target.value)}>
                                    <option value="none" disabled selected>
                                      Select a size
                                    </option>
                                    {prod.size && Array.isArray(prod.size) ? (
                                      prod.size.map((size, index) => (
                                        <option key={index} value={size}>
                                          {size}
                                        </option>
                                      ))
                                    ) : (
                                      <option disabled>No sizes available</option>
                                    )}
                                  </select>
                                  <select name="color" className="w-[10rem]" onChange={(e) => setColor(e.target.value)}>
                                    <option value="none" disabled selected>
                                      Select a color
                                    </option>
                                    {prod.color && Array.isArray(prod.color) ? (
                                      prod.color.map((color, index) => (
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
                                  <p className="text-yellow-400">{prod.stars}</p>
                                  <p >{prod.rating}</p>
                                </div>
                                <div className="">
                                  <p>Description</p>
                                  <p className="">{prod.description}</p>
                                </div>
                                <div className="flex self-center">
                                  <button onClick={() => handleAddToCart(prod.id, prod.name, prod.image, size, color, prod.price, prod.category)} className="bg-[#885B56] text-white font-light px-2 py-2 font-noto">Add To Cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p>No products available</p>
                    )}
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </main>
        </div>
      </div>
    </>
  )
}