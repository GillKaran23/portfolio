import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Experience = () => {
    const [exp, setExp] = useState([]);

    const getExperience = async () => {
        const data = await getDocs(collection(db, "experience"));
        setExp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getExperience();
    }, []);

    return (
        <div id="experience" name="experience" className="main-section bg-back-image2 bg-cover">
            <div className="max-w-7xl mx-auto">
                <h1 className="main-heading">Experience</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {exp.map((value, index) => (
                        <div key={index} className="bg-gradient-to-tl from-purple-400 to-pink-600 z-20 shadow-2xl md:p-5 p-2 rounded-xl flex flex-col">
                            <h3 className="md:text-3xl text-xl font-bold mb-2 text-white">{value.companyName}</h3>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">Role: </span>{value.role}
                            </div>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">From: </span>{value.from}
                            </div>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">To: </span>{value.to}
                            </div>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">Location: </span>{value.location}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
