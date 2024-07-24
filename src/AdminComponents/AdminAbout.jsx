import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { BiUpload } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";

let AdminAbout = () => {
    let {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    let [resumePdf, setResume] = useState(null);
    let [resumeLink, setResumeLink] = useState("");
    let [profile, setProfile] = useState(null);
    let [ProfileLink, setProfileLink] = useState("");

    useEffect(() => {
        getDetails();
    },[]);

    const getDetails = async () => {
                try {
                    let docSnap = await getDoc(doc(db, 'users', 'admin-doc'));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setValue("name", data.name);
                        setValue("fullname", data.fullname);
                        setValue("profession", data.profession);
                        setValue("about", data.about);
                        setValue("github", data.github);
                        setValue("email", data.mail);
                        setValue("linkedin", data.linkedin);
                        setValue("thanks", data.thanks);
                        setResumeLink(data.resume);
                        setProfileLink(data.profile);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.log(error);
                }
    };

    let submitForm = async (data) => {
        let { name, fullname, profession, about, github, email, linkedin, thanks } = data;
                try {
                    await updateDoc(doc(db, 'users', 'admin-doc'), {
                        name: name,
                        fullname: fullname,
                        profession: profession,
                        about: about,
                        github: github,
                        mail: email,
                        linkedin: linkedin,
                        thanks: thanks
                    });
                } catch (error) {
                    console.error(error);
                }
    };

    const handleFile = (e) => {
        const resumeFile = e.target.files[0];
        if (resumeFile && resumeFile.type === 'application/pdf') {
            setResume(resumeFile);
        } else {
            console.log('Please select a PDF file.');
        }
    };

    const uploadResume = async () => {
        if (!resumePdf) {
            console.log('No file selected.');
            return;
        }

        try {
            const resumeName = `Karandeep_Gill_resume.pdf`;
            const storageRef = ref(storage, `resume/${resumeName}`);
            await uploadBytes(storageRef, resumePdf);
            const downloadUrl = await getDownloadURL(storageRef);
            await updateDoc(doc(db, 'users', 'admin-doc'), {
                resume: downloadUrl,
            });
            setResumeLink(downloadUrl);
            setResume(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleProfile = (e) => {
        const proFile = e.target.files[0];
        if (proFile && proFile.type === 'image/jpeg') {
            setProfile(proFile);
        } else {
            console.log('Please select a Jpg or PNG file.');
        }
    };

    const uploadProfile = async () => {
        if (!profile) {
            console.log('No file selected.');
            return;
        }

        try {
            const timestamp = new Date().getTime();
            const picName = `profile_${timestamp}.jpg`;
            const storageRef = ref(storage, `profilepic/${picName}`);
            await uploadBytes(storageRef, profile);
            const downloadUrl = await getDownloadURL(storageRef);
            await updateDoc(doc(db, 'users', 'admin-doc'), {
                profile: downloadUrl,
            });
            setProfileLink(downloadUrl);
            setProfile(null);
        } catch (error) {
            console.error('Error uploading file: ', error.message);
        }
    };


    return (
        <>
            <div className="w-full py-8 px-2 bg-my-black flex justify-center border-b-2 border-b-my-golden">
                <div className="max-w-4xl w-full pt-3">
                    <h4 className="text-4xl text-my-golden font-semibold mt-8 mb-2 text-center">Your Profile</h4>
                    <div className="max-w-5xl bg-my-white mt-4 p-5 rounded-xl">
                        <div className="flex flex-col items-center w-full">
                            <img src={ProfileLink} alt="Profile Pic" className="object-fill h-80 w-80 rounded-full mb-3 border-4 border-my-black"></img>
                            <div className="w-full text-center mt-2">
                                <div className="flex flex-col items-center ms-4 mt-3">
                                    <input type="file" onChange={handleProfile} accept=".jpg, .jpeg" className="file:bg-my-black file:hover:bg-my-golden file:hover:text-my-black file:text-my-white file:font-semi-bold file:py-1 file:px-2 file:rounded file:border-transparent mb-3"></input>
                                    <button onClick={uploadProfile} className="flex items-center gap-2 bg-my-golden text-my-black font-semibold text-lg py-1 px-3 rounded-xl"> Update <BiUpload /></button>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(submitForm)} autoComplete="off" className="mt-5">
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                                    Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="shadow border border-black rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                />
                                <ErrorMessage
                                    name="name"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="fullname">
                                    Full Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("fullname", { required: "Full Name is required" })}
                                    className="shadow border border-black rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="fullname"
                                    type="text"
                                    placeholder="Full Name"
                                />
                                <ErrorMessage
                                    name="fullname"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                                    Email <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    className="shadow border border-black rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                />
                                <ErrorMessage
                                    name="email"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="profession">
                                    Profession <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("profession", { required: "Profession is required" })}
                                    className="shadow border border-black rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="profession"
                                    type="text"
                                    placeholder="Profession"
                                />
                                <ErrorMessage
                                    name="profession"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="fullname">
                                    About <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    {...register("about", { required: "About is required" })}
                                    className="shadow border border-black rounded h-32 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="about"
                                    type="text"
                                    placeholder="About"
                                />
                                <ErrorMessage
                                    name="about"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="thanks">
                                    Thanks <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    {...register("thanks", { required: "Thanks is required" })}
                                    className="shadow border border-black rounded h-32 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="thanks"
                                    type="text"
                                    placeholder="Thanks"
                                />
                                <ErrorMessage
                                    name="thanks"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="linkedin">
                                    LinkedIn <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("linkedin", { required: "LinkedIn is required" })}
                                    className="shadow border border-black rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="linkedin"
                                    type="text"
                                    placeholder="LinkedIn"
                                />
                                <ErrorMessage
                                    name="linkedin"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="flex gap-1 text-gray-700 text-sm font-bold mb-1" htmlFor="github">
                                    Github <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("github", { required: "Github is required" })}
                                    className="shadow border border-black rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="github"
                                    type="text"
                                    placeholder="Github"
                                />
                                <ErrorMessage
                                    name="github"
                                    errors={errors}
                                    render={({ message }) => <p className="text-red-600">{message}</p>}
                                />
                            </div>
                            <button
                                className="bg-my-golden text-my-black w-full hover:bg-my-black hover:text-my-white font-bold py-2 rounded-full mt-4"
                                type="submit"
                            >
                                Update
                            </button>
                        </form>
                        <div className="mt-5">
                            <h1 className="text-semibold text-base">Resume</h1>
                            <div className="flex flex-col ms-4 md:flex-row justify-between items-center">
                                <input type="file" onChange={handleFile} accept=".pdf" className="file:bg-orange-500 file:hover:bg-black file:text-white file:font-semi-bold file:py-1 file:px-2 file:rounded file:border-transparent mb-3"></input>
                                <div className="flex gap-4">
                                    <Link to={resumeLink} target="_blank" className="bg-orange-500 text-white text-lg py-3 px-5 rounded-xl" download>
                                        <FaEye />
                                    </Link>
                                    <button onClick={uploadResume} className="bg-orange-500 text-white text-lg py-3 px-5 rounded-xl"><BiUpload /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdminAbout;
