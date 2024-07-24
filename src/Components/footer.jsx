import { AiOutlineArrowRight } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { HashLink } from "react-router-hash-link";

let Footer = () => {
    const [username, setusername] = useState(null);
    const [linked, setlinked] = useState(null);
    const [github, setgithub] = useState(null);
    const [mail, setmail] = useState(null);
    const [thanks, sethanks] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const items = [
        {
            id: 1,
            text: "Home",
            link: "/#home"
        },
        {
            id: 2,
            text: "About",
            link: "/#aboutMe"
        },
        {
            id: 3,
            text: "Skills",
            link: "/#skills"
        },
        {
            id: 4,
            text: "Experience",
            link: "/#experience"
        },
        {
            id: 5,
            text: "Projects",
            link: "/#projects"
        },
    ];

    let scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const fetchData = async () => {
        try {
            let query = await getDoc(doc(db, 'users', 'admin-doc'));
            if (query.exists()) {
                setusername(query.data().name);
                setlinked(query.data().linkedin);
                setgithub(query.data().github);
                setmail(query.data().mail);
                sethanks(query.data().thanks);
            }
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };
    return (
        <div className="w-full bg-foot-image bg-cover p-5 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Link to='/' onClick={scrollToTop} className="font-semibold text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-5">{"<"}{username}{"/>"}</Link>
                        <p className="mt-4 max-w-xs text-my-white">
                            {thanks}
                        </p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-my-white">Quick Links</p>
                        <hr className="w-12 h-0.5 mt-4 bg-my-golden border-0"></hr>
                        <ul className="mt-6 space-y-4 text-sm text-my-white">
                            {items.map((value) => {
                                return (
                                    <li key={value.id} className="hover:text-my-golden">
                                        <HashLink smooth to={value.link} className="flex items-center space-x-2">
                                            <AiOutlineArrowRight className="text-lg text-my-golden" /> <span>{value.text}</span>
                                        </HashLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-my-white">Contact Me</p>
                        <hr className="w-12 h-0.5 mt-4 bg-my-golden border-0"></hr>
                        <ul className="mt-6 space-y-4 text-sm text-my-white">
                            <li className="flex items-center space-x-2 hover:text-my-golden">
                                <FaGithubSquare className="text-3xl" /> <Link target="_blank" to={github}>GitHub</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:text-my-golden">
                                <FaLinkedin className="text-3xl" /> <Link target="_blank" to={linked}>LinkedIn</Link>
                            </li>
                            <li className="flex items-center space-x-2 hover:text-my-golden">
                                <IoMdMail className="text-3xl" /> <Link to={`mailto:${mail}`}>Mail</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
