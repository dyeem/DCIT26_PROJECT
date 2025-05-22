import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//assets
import logo from '../../Assets/logo.png';
import pic1 from '../../Assets/admin_login.png';
import successanimation from '../../Assets/Animations/checkanimation.webm';
import failanimation from '../../Assets/Animations/failanimation.webm';

//eye
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//modal
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography'

//admin authh
import { useAdminAuth } from './AdminAuth/AdminAuthContext';
import { set } from 'mongoose';

export default function AdminLogin() {

    const navigate = useNavigate();

    //MODALS
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const handleOpenSuccess = () => setOpenSuccessModal(true);
    const handleCloseSuccess= () => setOpenSuccessModal(false);
    const handleOpenError = () => setOpenErrorModal(true);
    const handleCloseError= () => setOpenErrorModal(false);
    const [errorModalData, setErrorModalData] = useState({
        title: '',
        messages: [],
        buttonText: '',
        animation: null,
        onClose: () => {},
    });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
    };

    const { isAdminLogin, setIsAdminLogin, setAdmin } = useAdminAuth();
    const [formData, setFormData] = useState({email: '',password: ''});
    const [showPassword, setPassword] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/loop_backend/admin/session_check_admin.php', {
        withCredentials: true,
        })
        .then(res => {
            if (res.data.loggedIn) {
                setAdmin(res.data.admin); 
                setIsAdminLogin(true);
                navigate('/admin/dashboard');
            }
        })
        .catch(err => console.error("Session check failed:", err));
    }, [setAdmin, setIsAdminLogin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Form Data:", formData);

        if (!formData.email) {
            setErrorModalData({
                title: "Email Required",
                messages: ["Please enter your email address."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false),
            });
            setOpenErrorModal(true);
            return;
        }

        if (!formData.password) {
            setErrorModalData({
                title: "Password Required",
                messages: ["Please enter your password."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false),
            });
            setOpenErrorModal(true);
            return;
        }

        if (formData.password.length < 8) {
            setErrorModalData({
                title: "Password Too Short",
                messages: ["Password must be at least 8 characters."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false),
            });
            setOpenErrorModal(true);
        return;
        }

        try {
            const response = await axios.post(
                'http://localhost/loop_backend/admin/admin_login.php',
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.data.success) {
                setAdmin(response.data.admin);
                setIsAdminLogin(true);
                setOpenSuccessModal({
                    title: "Login Successful",
                    messages: ["You have successfully logged in."],
                    buttonText: "Continue",
                    animation: successanimation,
                    onClose: () => {
                        setOpenSuccessModal(false);
                        navigate('/admin/dashboard');
                    }
                })
            } else {
                // This block might never be hit unless backend sends 200 with success: false
                throw new Error(response.data.message || "Invalid credentials.");
            }

        } catch (error) {
            const backendMessage = error?.response?.data?.message || "Something went wrong.";
            setErrorModalData({
                title: "Login Failed",
                messages: [backendMessage],
                buttonText: "Retry",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false),
            });
            setOpenErrorModal(true);
            console.log("Admin login failed:", backendMessage);
        }

    };

    return (

        <>
            {/*SUCCESS MODAL*/}
            <Modal
                className="rounded-lg"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={!!openSuccessModal}
                onClose={openSuccessModal?.onClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={!!openSuccessModal}>
                    <Box sx={style} className="rounded-lg leading-tight">
                        <div className="flex flex-col justify-center items-center bg-green-500 py-2">
                            <video
                                src={openSuccessModal?.animation}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                className="text-center text-white"
                            >
                                {openSuccessModal?.title || "Success!"}
                            </Typography>
                        </div>
                        <div className="py-6 px-12 leading-tight">
                            <div className="flex flex-col items-center justify-center gap-y-7">
                                <Typography
                                    id="transition-modal-description"
                                    className="text-center text-gray-500"
                                >
                                    {openSuccessModal?.messages?.map((msg, idx) => (
                                        <p key={idx}>{msg}</p>
                                    ))}
                                </Typography>
                                <button
                                    onClick={openSuccessModal?.onClose}
                                    className="text-white bg-green-500 py-2 px-3 rounded-lg hover:bg-green-800"
                                >
                                    {openSuccessModal?.buttonText || "Continue"}
                                </button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>

            {/* ERROR MODAL */}
            <Modal
                className='rounded-lg'
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openErrorModal}
                onClose={errorModalData.onClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                    timeout: 500,
                    },
                }}
                >
                <Fade in={openErrorModal}>
                    <Box sx={style} className='rounded-lg leading-tight'>
                    <div className='flex flex-col justify-center items-center bg-[#df4c4c] py-2'>
                        {errorModalData.animation && (
                            <video
                            src={errorModalData.animation}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className=""
                        />
                        )}
                        <Typography variant="h6" className="text-center text-white">
                            {errorModalData.title || "Error"}
                        </Typography>
                    </div>
                    <div className="py-6 px-12 leading-tight">
                        <div className="flex flex-col items-center justify-center gap-y-7">
                            <Typography id="transition-modal-description" className='text-center text-gray-500'>
                                {errorModalData.messages.map((msg, index) => (
                                    <p key={index}>{msg}</p>
                                ))}
                            </Typography>
                            <button onClick={errorModalData.onClose} className='text-white bg-green-500 py-2 px-3 rounded-lg hover:bg-green-800'>
                                {errorModalData.buttonText || "Close"}
                            </button>
                        </div>
                    </div>
                    </Box>
                </Fade>
            </Modal>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#7E62FF] to-[#6A4FE0] p-4 sm:p-6">
                <div className="w-full max-w-md mb-6 flex justify-center">
                    <img src={logo} alt="Logo" className="w-32 h-auto drop-shadow-xl" />
                </div>
                
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden py-12">
                    <div className="flex flex-col lg:flex-row">
                        <div className="hidden lg:block lg:w-1/2 bg-[#f0f4ff]">
                            <div className="h-full flex items-center justify-center p-8">
                                <img 
                                    src={pic1} 
                                    alt="Admin Login" 
                                    className="max-w-full h-auto object-cover rounded-2xl shadow-lg transform hover:scale-102 transition-all duration-500 ease-in-out" 
                                />
                            </div>
                        </div>
                        
                        {/* Right side - Form */}
                        <div className="w-full lg:w-1/2 p-6 sm:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-[#7E62FF] mb-3 flex items-center justify-center">
                                    <span className="mr-2 text-2xl">🔒</span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7E62FF] to-[#5D45C0]">
                                        Admin Portal
                                    </span>
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base">Sign in to access your dashboard</p>
                            </div>
                            
                            {/* Small image for mobile only */}
                            <div className="lg:hidden w-full flex justify-center mb-8">
                                <img 
                                    src={pic1} 
                                    alt="Admin Login" 
                                    className="w-3/4 max-w-xs h-auto object-cover rounded-2xl shadow-md" 
                                />
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <div className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={() => setPassword(!showPassword)}>
                                            {showPassword ?  <VisibilityOff /> : <Visibility />}
                                    </div>
                                </div>
                                
                                {/* Remember me & Forgot password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input 
                                            id="remember-me" 
                                            name="remember-me" 
                                            type="checkbox" 
                                            className="h-4 w-4 text-[#7E62FF] focus:ring-[#7E62FF] border-gray-300 rounded" 
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-[#7E62FF] hover:text-[#6A4FE0] transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                
                                {/* Login Button */}
                                <div>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-[#7E62FF] to-[#6A4FE0] text-white py-4 px-4 rounded-3xl font-medium hover:from-[#6A4FE0] hover:to-[#5D45C0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E62FF] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="mt-8 text-center text-white text-sm">
                    <p>© {new Date().getFullYear()} Loop. All rights reserved.</p>
                    <p className="mt-1">
                        <a href="#" className="text-white/80 hover:text-white underline">Privacy Policy</a> • 
                        <a href="#" className="text-white/80 hover:text-white underline ml-2">Terms of Service</a>
                    </p>
                </div>
            </div>
        </>

    );
}
