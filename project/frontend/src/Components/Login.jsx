import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//avatar
// import boy from '../Assets/Avatar/boy.png'
// import girl from '../Assets/Avatar/girl.png'
// import manwithBeard from '../Assets/Avatar/man-with-beard.png'
// import manwithGlasses from '../Assets/Avatar/man-with-glasses.png'
// import womanwithGlasses from '../Assets/Avatar/woman-with-glasses.png'
// import woman from '../Assets/Avatar/woman.png'

import loginbg from '../Assets/loginbg.jpg'
import loginPic from '../Assets/login.png' 

export default function Login() {
   
    const [login, setLogin] = useState(null)
    const [profile, setProfile] = useState(null)  
    
    const navigate = useNavigate(); 

    //avatar
    // const avatars = [
    //     {   id: 1, src: boy, label: 'Merce'},
    //     {   id: 2, src: girl, label: 'She'},
    //     {   id: 3, src: manwithBeard, label: 'Wataoski'},
    //     {   id: 4, src: manwithGlasses, label: 'Javis'},
    //     {   id: 5, src: womanwithGlasses, label: 'Linda'},
    //     {   id: 6, src: woman, label: 'Blair'}
    // ]

    const [formValues, setFormValues] = useState({ 
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        tel: '',
        avatar: ''
    })
    
    async function handleSubmit(e) { // handleSubmit for Login
        e.preventDefault();
        console.log(formValues);
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email: formValues.email,
                password: formValues.password
            });

            console.log('Success:', response.data);
            setLogin(true);
            setProfile(response.data.user);
            navigate('/');

        }catch (error) {
            console.error('Error posting user data:', error);
        }
    }

    
    return (
        <>
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
                                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
                                <span
                                    className='text-red-800'
                                    id="email-error">
                                </span>
                            </div>
                            {/* PASSWORD */}
                            <div class="relative z-0 w-full mb-5 group">
                                <input 
                                    value={formValues.password}
                                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                    type="password" 
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