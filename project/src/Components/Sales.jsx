// REDUX
import { useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import { fetchProducts } from "./RTK/Products/productSlice"
import { cartActions } from './RTK/Cart/cartSlice'
import { userActions } from "./RTK/user/userSlice"

// TOASTER
import toast, { Toaster } from 'react-hot-toast';


import { useState} from 'react'
import { Link } from "react-router-dom"
import {
  Dialog,
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
  
  const products = useSelector((state) => state.products)
  const currentUser = useSelector((state) => state.user.currentUser)

  const dispatch = useDispatch()

  const AddToCart = () => toast.success('Successfully added to Cart!');
  const [color, setColor] = useState("");

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  function handleAddToCart(id, name, img, size, color, price) {
    dispatch(userActions.addToUserListCart({
      email: currentUser.email, 
      product: { id, name, img, size, color, price }, 
    }));
    AddToCart()
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
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

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="flex flex-row gap-x-8 gap-y-10 ">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

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
                    <div className="">
                      {products.loading && <div>Loading</div>}
                      {!products.loading && products.error &&
                        <div className="text-red-500">
                            Error: {products.error}
                        </div>
                      }
                      {!products.loading && products.crochet.length ? (
                          <div className="grid xl:grid-cols-6 lg:grid-cols-4 bwlnx:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 xsm:grid-cols-2 xsm:gap-5 lg:p-4 group place-self-center">
                          {products.crochet.map((product) => (
                              <div className="" key={product.id}>
                                <Link className="relative flex-shrink-0 flex flex-col items-center lg:rounded-xl xsm:rounded-lg" key={products.id}>
                                  <img
                                      src={product.image}
                                      alt={product.image}
                                      className="w-full xsm:h-[10rem] xl:h-[17rem] lg:h-[14rem] md:h-[10rem] object-cover lg:rounded-xl xsm:rounded-lg"
                                  />
                                  {/* USE ASPECT RATIO FOR RESPONSIVE IMAGE */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:rounded-xl xsm:rounded-lg"></div>
                                  <div className="absolute inset-0 flex flex-col justify-end items-end p-4 text-white leading-relaxed">
                                      <p className="mb-2 text-2xl font-normal text-left text-white">₱ {product.price}</p>
                                  </div>
                                </Link>
                                <div className="flex flex-col gap-y-2">
                                  <div className="flex flex-col xsm:text-[.8rem] xl:text-base md:text-base">
                                    <p className="font-semibold text-gray-900 xl:text-lg md:text-base">{product.name}</p>
                                    <p className="text-gray-500 font-normal">{product.size}</p>

                                    <select
                                      name="color"
                                      id="color-select"
                                      onChange={(e) => setColor(e.target.value)}
                                    >
                                      <option value="" disabled selected>
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
                                  <button
                                  onClick={() => handleAddToCart(product.id, product.name, product.image, product.size, color, product.price)} 
                                  className="w-full px-3 py-2 bg-[#885b56] hover:bg-[#c08e89]  hover:text-white text-white transition duration-300 font-medium text-sm">Shop Now</button>
                                </div>
                              </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
            </div>
          </section>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
        </main>
      </div>
    </div>
  )
}