import { useState } from 'react';
import logo from '../../Assets/logo.png';
import pic1 from '../../Assets/login.png'; // You might need to create or use a different image
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function AdminSignup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const [showPassword, setPassword] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup attempt with:', formData);
        // Add registration logic here
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#7E62FF] to-[#6A4FE0] p-4 sm:p-6">
            {/* Logo */}
            <div className="flex justify-center w-full max-w-md mb-6">
                <img src={logo} alt="Logo" className="w-32 h-auto drop-shadow-xl" />
            </div>
            
            {/* Main Card */}
            <div className="w-full max-w-5xl overflow-hidden bg-white shadow-2xl rounded-3xl">
                <div className="flex flex-col lg:flex-row">
                    {/* Left side - Image (hidden on small screens) */}
                    <div className="hidden lg:block lg:w-1/2 bg-[#f0f4ff]">
                        <div className="flex items-center justify-center h-full p-8">
                            <img
                                src={pic1}
                                alt="Admin Signup"
                                className="object-cover h-auto max-w-full transition-all duration-500 ease-in-out transform shadow-lg rounded-2xl hover:scale-102"
                            />
                        </div>
                    </div>
                    
                    {/* Right side - Form */}
                    <div className="w-full p-6 lg:w-1/2 sm:p-10">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-[#7E62FF] mb-3 flex items-center justify-center">
                                <span className="mr-2 text-2xl">✨</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7E62FF] to-[#5D45C0]">
                                    Create Admin Account
                                </span>
                            </h2>
                            <p className="text-sm text-gray-500 sm:text-base">Sign up to get started with your admin dashboard</p>
                        </div>
                        
                        {/* Small image for mobile only */}
                        <div className="flex justify-center w-full mb-8 lg:hidden">
                            <img
                                src={pic1}
                                alt="Admin Signup"
                                className="object-cover w-3/4 h-auto max-w-xs shadow-md rounded-2xl"
                            />
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* First Name Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#7E62FF] shadow-sm transition-all duration-200 ease-in-out"
                                    required
                                />
                            </div>
                            
                            {/* Last Name Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#7E62FF] shadow-sm transition-all duration-200 ease-in-out"
                                    required
                                />
                            </div>
                            
                            {/* Email Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email address"
                                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#7E62FF] shadow-sm transition-all duration-200 ease-in-out"
                                    required
                                />
                            </div>
                            
                            {/* Password Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#7E62FF] shadow-sm transition-all duration-200 ease-in-out"
                                    required
                                />
                                <div className="absolute text-gray-600 cursor-pointer right-3 top-3" onClick={() => setPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </div>
                            </div>
                            
                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="h-4 w-4 text-[#7E62FF] focus:ring-[#7E62FF] border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-600">
                                        I agree to the <a href="#" className="text-[#7E62FF] hover:text-[#6A4FE0]">Terms of Service</a> and <a href="#" className="text-[#7E62FF] hover:text-[#6A4FE0]">Privacy Policy</a>
                                    </label>
                                </div>
                            </div>
                            
                            {/* Signup Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#7E62FF] to-[#6A4FE0] text-white py-4 px-4 rounded-xl font-medium hover:from-[#6A4FE0] hover:to-[#5D45C0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E62FF] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Create Account
                                </button>
                            </div>
                            
                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 text-gray-500 bg-white">Or sign up with</span>
                                </div>
                            </div>
                            
                            {/* Social Signup Buttons */}
                            <div className="flex flex-row items-center justify-center">
                                <div className="">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Already have an account */}
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <a href="#" className="font-medium text-[#7E62FF] hover:text-[#6A4FE0]">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-sm text-center text-white">
                <p>© {new Date().getFullYear()} Loop. All rights reserved.</p>
                <p className="mt-1">
                    <a href="#" className="underline text-white/80 hover:text-white">Privacy Policy</a> •
                    <a href="#" className="ml-2 underline text-white/80 hover:text-white">Terms of Service</a>
                </p>
            </div>
        </div>
    );
}
