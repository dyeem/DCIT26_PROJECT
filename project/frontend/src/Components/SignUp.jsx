import loginbg from '../Assets/loginbg.jpg'
import loginPic from '../Assets/login.png'
import checkanimation from '../Assets/Animations/checkanimation.webm'
import failanimation from '../Assets/Animations/failanimation.webm'

import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//eye
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//modal
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

export default function SignUp () {
    
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const handleOpenSuccess = () => setOpenSuccessModal(true);
    const handleCloseSuccess= () => setOpenSuccessModal(false);
    const handleOpenError = () => setOpenErrorModal(true);
    const handleCloseError= () => setOpenErrorModal(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
    };

    const navigate = useNavigate(); 
    
    const [formValues, setFormValues] = useState({ 
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        tel: '',
        avatar: ''
    })

    //password validation
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorModalData, setErrorModalData] = useState({
        title: '',
        messages: [],
        buttonText: '',
        animation: null,
        onClose: () => {},
    });
      

    const passwordMismatch = formValues.password !== formValues.confirmPassword;
    const isPasswordTooShort = formValues.password.length > 0 && formValues.password.length < 8;


    async function handleSubmit(e) {
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

        if(!formValues.firstname){ //checks if first name is not empty
            setErrorModalData({
                title: "First Name Required",
                messages: ["Please enter your first name."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }

        if(!formValues.lastname){ //checks if last name is not empty
            setErrorModalData({
                title: "Last Name Required",
                messages: ["Please enter your last name."],
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

        if(!formValues.confirmPassword){ //checks if confirm password is not empty 
            setErrorModalData({
                title: "Confirm Password Required",
                messages: ["Please confirm your password."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }

        if (!formValues.tel) { //checks if tel is not empty
            setErrorModalData({
                title: "Contact Number Required",
                messages: ["Please enter your contact number."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }
    
        if (isPasswordTooShort) { //checks if password is at least 8 characters long
            setErrorModalData({
                title: "Weak Password",
                messages: ["Password must be at least 8 characters long."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }
    
        if (passwordMismatch) { //checks if password and confirm password match
            setErrorModalData({
                title: "Password Mismatch",
                messages: ["Your password and confirmation do not match."],
                buttonText: "Try Again",
                animation: failanimation,
                onClose: () => setOpenErrorModal(false)
            });
            setOpenErrorModal(true);
            return;
        }
    
        try { //sends data to backend
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
            const response = await axios.post('http://localhost:8000/register', {
                firstname: formValues.firstname,
                lastname: formValues.lastname,
                email: formValues.email,
                password: formValues.password,
                contact_number: formValues.tel
            }, { withCredentials: true }); // Make sure withCredentials is true
    
            console.log('Success:', response.data);
            setFormValues({
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmPassword: '',
                tel: ''
            });
            setOpenSuccessModal(true);
        } catch (error) {
            console.error('Error posting user data:', error);
    
            let messages = ["An error occurred. Please try again."];
    
            if (error.response?.data?.errors?.email?.[0]) {
                messages = [error.response.data.errors.email[0]];
            }
    
            setErrorModalData({
                title: "Registration Failed",
                messages,
                buttonText: "Try Again",
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
            {/*ERROR MODAL*/}
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
                        />
                        )}
                        <Typography id="transition-modal-title" variant="h6" component="h2" className='text-center text-white'>
                            {errorModalData.title}
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
                                {errorModalData.buttonText}
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
                                    Welcome To Loop!
                                </p>
                                <p className='text-gray-800 text-base'>
                                    Sign up to start your journey and discover unique, handcrafted creations made just for you"
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
                            {/* FIRST NAME LAST NAME FOR SIGNUP */}
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input 
                                            value={formValues.firstname}
                                            onChange={(e) => setFormValues({ ...formValues, firstname: e.target.value })}
                                            type="text" 
                                            name="floating_first_name" 
                                            id="floating_first_name" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                            placeholder=" " 
                                            required 
                                        />
                                        <label 
                                            for="floating_first_name" 
                                            class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            First name
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input 
                                        value={formValues.lastname}
                                        onChange={(e) => setFormValues({ ...formValues, lastname: e.target.value })}
                                        type="text" 
                                        name="floating_last_name" 
                                        id="floating_last_name" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                        placeholder=" " 
                                        required />
                                        <label 
                                        for="floating_last_name" 
                                        class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                    </div>
                                </div>

                            {/* PASSWORD */} 
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-5 group">
                                    <input 
                                        value={formValues.password}
                                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                        type={showPassword ? "text" : "password"}
                                        name="floating_first_name" 
                                        id="floating_first_name" 
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                        placeholder=" " 
                                        required 
                                    />
                                    <label 
                                        for="floating_first_name" 
                                        class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Password (Minimum 8 characters)
                                    </label>
                                    {isPasswordTooShort && (
                                        <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long.</p>
                                    )}
                                    <div className="absolute right-3 top-1 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </div>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input 
                                    value={formValues.confirmPassword}
                                    onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
                                    type={showConfirmPassword ? "text" : "password"} 
                                    name="floating_last_name" 
                                    id="floating_last_name" 
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                    placeholder=" " 
                                    required />
                                    <label 
                                        for="floating_last_name" 
                                        class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password
                                    </label>
                                    <div className="absolute right-3 top-1 cursor-pointer text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ?  <VisibilityOff /> : <Visibility />}
                                    </div>
                                    {passwordMismatch && (
                                        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                                    )}
                                </div>
                            </div>
                            
                            {/* TELEPHONE */}
                            <div class="grid md:grid-cols-1 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input 
                                    value={formValues.tel}
                                    onChange={(e) => setFormValues({ ...formValues, tel: e.target.value })}
                                    type="tel" 
                                    name="floating_phone" 
                                    id="floating_phone" 
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#885b56] focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                    placeholder=" " 
                                    required />
                                    <label 
                                    for="floating_phone" 
                                    class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (09123456789)</label>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    type="submit"
                                    class="text-white bg-[#885b56] hover:bg-[#cf9c96] focus:ring-4 focus:outline-none focus:ring-[#ce9993] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  place-self-center">
                                        Signup
                                </button>
                            </div>
                        </form>
                        <div className="text-gray-800 font-medium pt-20">
                            <p>Already have an account? <span className="underline cursor-pointer" onClick={() => navigate('/login')}>
                                Login here! </span>
                            </p>
                        </div>  
                    </div>
                    {/* right side */}
                    <div className="xsm:hidden sm:hidden md:hidden bwlnx:block lg:hidden xl:block rounded-xl  bg-[#CCCCCC] pb-11">
                        <div className=" xl:p-6 md:p-3 xsm:p-2 text-center flex flex-col gap-y-4">
                            <img src={loginPic} alt="" className='w-[70rem]'/>
                            <p className='text-gray-800 xl:text-4xl xsm:text-3xl font-bold'>Become One Of Us!</p>
                            <p className='text-gray-700 text-base '>Sign in to access your account, view your order history, track your purchases, and enjoy exclusive offers on our handcrafted crochet products.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

