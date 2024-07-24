import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import image from "../src/assets/Images/bubu.png";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

let AdminLogin = () => {
    let {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    let navigate = useNavigate();
    let ForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: "Forgot Password?",
            input: "email",
            inputLabel: "Don't worry type your email address here:",
            inputPlaceholder: "Enter your email address"
        });
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Swal.fire({
                        title: "Reset Password Email Sent To:",
                        text: `${email}`,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    function submitForm(data) {
        let { email, password } = data;
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            navigate("/adminhome");
            reset();
        }).catch((error) => {
            console.log(error);
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                toast.warn('Login Failed, Try Again!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else {
                toast.warn('Login Failed, Try Again!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="fixed bg-my-black shadow-xl justify-center w-full p-5">
                <h1 className="text-center text-my-golden text-3xl font-semibold">Portfolio</h1>
            </div>
            <div className="w-full p-5 h-screen bg-cover bg-back-image2 flex items-center justify-center">
                <div className="max-w-5xl shadow-xl w-full mx-auto my-auto rounded-xl md:grid md:grid-cols-2 bg-my-light-dark">
                    <div className="flex flex-col justify-center p-6 w-full">
                        <h1 className="mb-5 text-center text-my-golden text-3xl font-semibold">Admin LogIn</h1>
                        <form
                            onSubmit={handleSubmit(submitForm)}
                            autoComplete="off"
                        >
                            <div className="mb-2">
                                <label
                                    className="flex gap-1 text-my-white text-sm font-bold mb-1"
                                    htmlFor="email"
                                >
                                    Email <span className="text-my-golden">*</span>
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                />
                                <ErrorMessage
                                    name="email"
                                    errors={errors}
                                    render={({ message }) => (
                                        <p className="text-my-golden">{message}</p>
                                    )}
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="flex gap-1 text-my-white text-sm font-bold mb-1"
                                    htmlFor="password"
                                >
                                    Password <span className="text-my-golden">*</span>
                                </label>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    name="password"
                                    errors={errors}
                                    render={({ message }) => (
                                        <p className="text-my-golden">{message}</p>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end mb-2">
                                <Link to="#forgot-password" className="text-my-white font-semibold text-sm" onClick={ForgotPassword}>Forgot Password?</Link>
                            </div>
                            <button
                                className="bg-my-golden w-full hover:bg-my-black hover:text-my-white text-my-black font-semibold py-2 rounded-sm mt-4"
                                type="submit"
                            >
                                SignIn
                            </button>
                        </form>
                    </div>
                    <div className="w-full h-full hidden md:block">
                        <img className="object-cover rounded-r-xl shadow-lg w-full h-96" src={image} alt="Admin Login" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
