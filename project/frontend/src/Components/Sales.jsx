// TOOLS
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState} from 'react'
import { useLoaderData, Link } from 'react-router-dom';

//UI LIBRARY
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
      { value: 'Flowers', label: 'Flowers', checked: false },
      { value: 'Keychains', label: 'Keychains', checked: false },
      { value: 'Wearables', label: 'Wearables', checked: false },
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

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    document.title = "Loop | Products";
  }, []);
  
  const data = useLoaderData();
  console.log("Sales component data:", data);

  const crochets = data.Products || [];

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
                    className="flex items-center justify-center p-2 -mr-2 text-gray-400 bg-white rounded-md size-10"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                    {crochets.map((category) => (
                      <li key={category.name}>
                        <HashLink smooth to={`#${category.name.replace(/\s+/g, '-')}`} className="block px-2 py-3">
                          {category.name}
                        </HashLink>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="px-4 py-6 border-t border-gray-200">
                      <h3 className="flow-root -mx-2 -my-3">
                        <DisclosureButton className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white group hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="flex items-center ml-6">
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
                                className="text-indigo-600 border-gray-300 rounded size-4 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="flex-1 min-w-0 ml-3 text-gray-500"
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

          <main className="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  {/* <div>
                    <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-1 -mr-1 text-gray-400 size-5 shrink-0 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div> */}

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

                <button type="button" className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
            <section aria-labelledby="products-heading" className="pt-6 pb-24" >
              <h2 id="products-heading" className="sr-only">Products</h2>
              <div className="flex flex-row gap-x-8 gap-y-10 ">
                {/* Filters */}
                <form className="sticky top-0 right-0 hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <nav className="relative">
                    <ul role="list" className="sticky top-0 pb-6 space-y-4 text-base font-medium text-gray-900 border-b border-gray-200">
                      {crochets.map((category) => (
                        <li key={category.name}>
                          <HashLink smooth to={`#${category.name.replace(/\s+/g, '-')}`}>{category.name}</HashLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="py-6 border-b border-gray-200">
                      <h3 className="flow-root -my-3">
                        <DisclosureButton className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white group hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="flex items-center ml-6">
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
                  <div className="flex items-center justify-center max-w-full px-4 mx-auto leading-relaxed text-black sm:px-4">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-1 bwlnx:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xsm:grid-cols-1 xsm:gap-y-8 lg:p-4 group place-self-center">
                        {crochets.map((product) => ( 
                          <div className="space-y-2" key={product.id} id={product.name.replace(/\s+/g, '-')}>
                              <p className="text-4xl font-playfair">{product.name}</p>
                              <div className="flex-wrap grid-cols-2 xsm:grid xl:flex gap-x-4 gap-y-2 xl:p-4">
                                {product.Items.map((prod) =>
                                  <div className="p-4 bg-gray-100 " key={prod.id}>
                                    <Link to={`/products/${prod.id}`}>
                                      {prod.image && Array.isArray(prod.image) ? (
                                        <img 
                                          src={`/src/assets/products/${prod.category}/${prod.image[0]}`}
                                          alt="Product" 
                                          className="w-56 cursor-pointer"
                                          title={prod.name}
                                        />
                                      ) : (
                                        prod.image && (
                                          <img 
                                            src={`/src/assets/products/${prod.category}/${prod.image}`} 
                                            alt="Product" 
                                            className="w-56 cursor-pointer"
                                          />
                                        )
                                      )}
                                    </Link>

                                    <div className="p-2">
                                      <div className="flex flex-row justify-between items-center">
                                        <p className="text-black xl:text-xl xsm:text-base font-noto ">{prod.name}</p>
                                        <p className="text-gray-800 xsm:text-sm font-semibold">₱{prod.price}.00</p>
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="text-gray-800 xsm:text-sm font-noto">{prod.category}</p>
                                        <p className="text-gray-800 xsm:text-sm font-noto">Qty: {prod.quantity}</p>
                                      </div>
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
          </main>
        </div>
      </div>
    </>
  )
}