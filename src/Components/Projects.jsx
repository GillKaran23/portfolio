import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Projects = () => {
    const [exp, setExp] = useState([]);
    
    const getProjects = async () => {
        const data = await getDocs(collection(db, "projects"));
        setExp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div id="projects" name="projects" className="main-section bg-back-image1 bg-cover">
            <div className="max-w-7xl mx-auto">
                <h1 className="main-heading">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {exp.map((value, index) => (
                        <div key={index} className="bg-gradient-to-tl from-purple-400 to-indigo-600 z-20 shadow-2xl md:p-5 p-2 rounded-xl flex flex-col">
                            <h3 className="md:text-3xl text-xl font-bold mb-2 text-white">{value.projectName}</h3>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">Type: </span>{value.type}
                            </div>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">Project For: </span>{value.projectFor}
                            </div>
                            <div className="text-white text-sm md:text-lg">
                                <span className="font-semibold text-my-golden">Technologies: </span>
                                <div className="flex flex-wrap gap-2">
                                    {value.languages.split(',').map((tech, techIndex) => (
                                        <div
                                            key={techIndex}
                                            className="md:text-base text-sm rounded-full text-white py-1 px-3 mt-1 cursor-pointer bg-my-light-dark shadow-lg font-semibold"
                                        >
                                            {tech.trim()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
