import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import loginbg from '../Assets/loginbg.jpg'
import loginPic from '../Assets/login.png'
import checkanimation from '../Assets/Animations/checkanimation.webm'
import failanimation from '../Assets/Animations/failanimation.webm'

//eye
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//modal
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography'

export default function Login() {
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.defaults.withCredentials = true;
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
    };

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
   
    const [profile, setProfile] = useState(null)  
    const [showPassword, setPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    
    const navigate = useNavigate(); 

    const [formValues, setFormValues] = useState({ 
        email: '',
        password: '',
    })
    
    async function handleSubmit(e) { // handleSubmit for Login
        e.preventDefault();
        console.log(formValues);

        

        if(!formValues.email){ //checks if email is not empty
            setErrorModalData({
                title: "Email Required",
                messages: ["Please enter your email address."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }

        if(!formValues.password){ //checks if password is not empty
            setErrorModalData({
                title: "Password Required",
                messages: ["Please enter your password."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }

        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
            
            const response = await axios.post('http://localhost:8000/api/login', {
                email: formValues.email,
                password: formValues.password
            });

            console.log('Success:', response.data);
            setProfile(response.data.user);
            navigate('/');

        }catch (error) {
            const message = error?.response?.data?.message || "Something went wrong. Please try again.";
            
            setErrorModalData({
                title: "Login Failed",
                messages: [message],
                buttonText: "Retry",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            
        }
    }
    
    return (
        <>
            {/*SUCCESS MODAL*/}
            <Modal
                className='rounded-lg'
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openSuccessModal}
                onClose={handleCloseSuccess}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openSuccessModal}>
                    <Box sx={style} className='rounded-lg leading-tight'>
                        <div className='flex flex-col justify-center items-center bg-green-500 py-2'>
                            <video
                                src={checkanimation}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className=""
                            />
                            <Typography id="transition-modal-title" variant="h6" component="h2" className='text-center text-white'>
                                Sign up Successful!
                            </Typography>
                        </div>
                        <div className="py-6 px-12 leading-tight">
                            <div className="flex flex-col items-center justify-center gap-y-7">
                                <Typography id="transition-modal-description"  className='text-center text-gray-500'>
                                    <p>Thank you for registering with us.</p>
                                    <p>You can now log in to explore our crochet collections and manage your orders with ease.</p>
                                </Typography>
                                <button onClick={(e) => navigate('/login')} className='text-white bg-green-500 py-2 px-3 rounded-lg hover:bg-green-800'>Continue</button>
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
            <div className="mt-8 min-h-screen bg-gray-100 flex justify-center items-center leading-relaxed p-4" 
                style={{
                    backgroundImage: `url(${loginbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                
                <div className=" grid xl:grid-cols-2 lg:grid-cols-1 bwlnx:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xsm:grid-cols-1 justify-center items-center w-[90rem] p-4 bg-opacity-70 bg-white rounded-xl shadow-xl m-1">
                    {/* left side */}
                    <div className="xsm:z-0 flex flex-col gap-y-2 justify-center items-center rounded-xl pb-11">
                        <form className="max-w-xl mx-auto">
                            <div className="py-10 gap-y-3 flex flex-col sm:text-center xsm:text-center">
                                <p className='text-gray-900 xl:text-5xl font-bold sm:text-4xl xsm:text-3xl'>
                                    Welcome Back!
                                </p>
                                <p className='text-gray-800 text-base'>
                                    Log in to your account and continue exploring our collection of handcrafted crochet products just for you.
                                </p>
                            </div>
                            {/* EMAIL */}
                            <div class="relative z-0 w-full mb-5 group">
                                <input 
                                    value={formValues.email}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormValues({ ...formValues, email: value });
                                        setInvalidEmail(value && !value.includes('@'));
                                    }}
                                    type="email" 
                                    name="floating_email" 
                                    id="floating_email" 
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                    placeholder=" " 
                                    required 
                                />
                               
                                <label 
                                    for="floating_email" 
                                    class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                    Email address
                                </label>
                                {invalidEmail && (
                                    <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                                )}
                            </div>
                            {/* PASSWORD */}
                            <div class="relative z-0 w-full mb-5 group">
                                <input 
                                    value={formValues.password}
                                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                    type={showPassword ? "text" : "password"} 
                                    name="floating_password" 
                                    id="floating_password" 
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                    placeholder=" " 
                                    required 
                                />
                                <label 
                                    for="floating_password" 
                                    class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Password
                                </label>
                                <div className="absolute right-3 top-1 cursor-pointer text-gray-600" onClick={() => setPassword(!showPassword)}>
                                        {showPassword ?  <VisibilityOff /> : <Visibility />}
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    type="submit"
                                    class="text-white bg-[#885b56] hover:bg-[#cf9c96] focus:ring-4 focus:outline-none focus:ring-[#ce9993] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  place-self-center">
                                        Login
                                </button>
                            </div>
                        </form>
                        <div className="text-gray-800 font-medium pt-20">
                            <p>Don't have an account? <span className="underline cursor-pointer" onClick={() => navigate('/signup')}>
                                Signup here!</span>
                            </p> 
                        </div>  
                    </div>
                    {/* right side */}
                    <div className="xsm:hidden sm:hidden md:hidden bwlnx:block lg:hidden xl:block rounded-xl  bg-[#CCCCCC] pb-11">
                        <div className=" xl:p-6 md:p-3 xsm:p-2 text-center flex flex-col gap-y-4">
                            <img src={loginPic} alt="" className='w-[70rem]'/>
                            <p className='text-gray-800 xl:text-4xl xsm:text-3xl font-bold'>Pick Where You Left Off!</p>
                            <p className='text-gray-700 text-base '>Log in to your account and continue exploring our collection of handcrafted crochet products just for you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}