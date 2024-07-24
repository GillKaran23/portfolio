import { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCodeBlock } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { LuLoader2 } from "react-icons/lu";
import { MdHomeFilled, MdWork } from "react-icons/md";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const NavBar = () => {
    const [nav, setNav] = useState(false);
    const [username, setusername] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let query = await getDoc(doc(db, 'users', 'admin-doc'));
            if (query.exists()) {
                setusername(query.data().name);
            }
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setNav(false);
            }
        };

        if (nav) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [nav]);

    const items = [
        {
            id: 1,
            logo: <MdHomeFilled />,
            text: "Home",
            link: "/#home"
        },
        {
            id: 2,
            logo: <FaUserAlt />,
            text: "About",
            link: "/#aboutMe"
        },
        {
            id: 3,
            logo: <BiCodeBlock />,
            text: "Skills",
            link: "/#skills"
        },
        {
            id: 4,
            logo: <MdWork />,
            text: "Experience",
            link: "/#experience"
        },
        {
            id: 5,
            logo: <GrProjects />,
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

    return (
        <>
            {
                username === null ? (
                    <div className="fixed z-50 h-screen w-screen flex flex-col justify-center items-center backdrop-blur-sm bg-white/30 overflow-hidden">
                        <div className="bg-my-black p-12 rounded-xl">
                            <LuLoader2 className="text-my-golden text-7xl animate-spin" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="fixed w-full p-3 z-40 top-0 bg-my-black text-my-white shadow-xl">
                            <div className="flex max-w-7xl justify-between mx-auto items-center">
                                <Link to="/" onClick={scrollToTop} className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">{"<"}{username}{"/>"}</Link>
                                <div className="flex gap-6 items-center">
                                    {
                                        items.map((value) => (
                                            <HashLink key={value.id} smooth aria-label="Scroll to top" to={value.link} className="hidden md:flex-col md:flex items-center hover:text-my-golden">
                                                <span className="text-2xl">{value.logo}</span>
                                                <span className="text-sm font-semibold">{value.text}</span>
                                            </HashLink>
                                        ))
                                    }
                                    <button onClick={handleNav} className='block md:hidden'>
                                        {nav ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
                                    </button>
                                    <div
                                        ref={navRef}
                                        className={
                                            nav
                                                ? 'fixed md:hidden z-50 left-0 top-0 w-[60%] p-4 h-screen bg-my-black ease-in-out duration-500'
                                                : 'fixed ease-in-out z-50 w-[60%] p-4 duration-500  top-0 bottom-0 left-[-100%]'
                                        }
                                    >
                                        <div className="p-4 mb-2">
                                            <Link
                                                to="/"
                                                onClick={handleNav}
                                                className="font-semibold text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                                            >
                                               {"<"}{username}{"/>"}
                                            </Link>

                                        </div>
                                        <hr className="mb-5" />
                                        {
                                            items.map((value) => (
                                                <div key={value.id} className="mb-2 rounded-xl duration-300 cursor-pointer font-semibold hover:bg-my-golden hover:text-my-black p-3">
                                                    <HashLink onClick={handleNav} aria-label="Scroll to top" smooth to={value.link} className="flex gap-3 items-center">
                                                        <span className="md:text-2xl text-xl">{value.logo}</span>{value.text}
                                                    </HashLink>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
export default NavBar;
