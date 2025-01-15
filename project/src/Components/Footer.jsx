import logo from '../Assets/logo.png'
import { HashLink } from 'react-router-hash-link';

export default function Footer() {
    return (
        <>
            <footer className="border-base-300 border-t footer bg-base-200 text-base-content p-10 grid grid-cols-1 lg:grid-cols-3 font-serif">
                <nav className="justify-self-center justify-items-center">
                    <h6 className="footer-title font-serif text-xl lg:text-2xl relative group">Products
                    <span 
                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-100 transition-all duration-300 group-hover:w-full"
                    />
                    </h6>
                    <HashLink smooth to={`/products#${"Dolls".replace(/\s+/g, '-')}`} className="text-sm leading-relaxed text-[1rem]">Dolls</HashLink>
                    <HashLink smooth to={`/products#${"Flowers".replace(/\s+/g, '-')}`} className="text-sm leading-relaxed text-[1rem]">Flowers</HashLink>
                    <HashLink smooth to={`/products#${"Hairclips".replace(/\s+/g, '-')}`} className="text-sm leading-relaxed text-[1rem]">Hairclips</HashLink>
                    <HashLink smooth to={`/products#${"Dolls".replace(/\s+/g, '-')}`} className="text-sm leading-relaxed text-[1rem]">Hat</HashLink>
                    <HashLink smooth to={`/products#${"Keychain".replace(/\s+/g, '-')}`} className="text-sm leading-relaxed text-[1rem]">Keychain</HashLink>
                </nav>
                <nav className="justify-self-center justify-items-center">
                    <h6 className="footer-title font-serif text-xl lg:text-2xl relative group">Company
                        <span 
                            className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-100 transition-all duration-300 group-hover:w-full"
                        />
                    </h6>
                    <HashLink smooth to="/" className="text-sm leading-relaxed text-[1rem]">Home</HashLink>
                    <HashLink smooth to="/aboutus" className="text-sm leading-relaxed text-[1rem]">About Us</HashLink>
                    <HashLink smooth to="/reviews" className="text-sm leading-relaxed text-[1rem]">Reviews</HashLink>
                </nav>
                <nav className="justify-self-center justify-items-center">
                    <h6 className="footer-title font-serif text-xl lg:text-2xl relative group">Customer Support
                        <span 
                            className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-100 transition-all duration-300 group-hover:w-full"
                        />
                    </h6>
                    <HashLink smooth to="/help/contactus" className="text-sm leading-relaxed text-[1rem]">Contact Us</HashLink>
                    <HashLink smooth to="/help/faqpage" className="text-sm leading-relaxed text-[1rem]">FAQ</HashLink>
                    <HashLink smooth to="/help/customize-order" className="text-sm leading-relaxed text-[1rem]">Customize Order</HashLink>
                </nav>
            </footer>
            <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 xsm:justify-self-center">
                <aside className="grid-flow-col items-center md:place-self-start md:justify-self-start xsm:justify-self-center">
                    <HashLink smooth to="/"><img src={logo} alt="" className='size-14'/></HashLink>
                    <p>
                        Loop.
                    <br />
                        Providing reliable products since 2024.
                    </p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end xsm:justify-self-center">
                    <div className="grid grid-flow-col gap-4 ">
                        <a>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </>
    );
}