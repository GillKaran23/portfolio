import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

let AboutMe = () => {
    let [about, setAbout] = useState(null);
    useEffect(()=>{
        fetchData();
    },[]);
    let fetchData = async () => {
        try {
            let query = await getDoc(doc(db,'users','admin-doc'));
            if(query.exists()){
                setAbout(query.data().about);
            }
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };
    return (
        <div id="aboutMe" name="aboutMe" className="main-section bg-back-image1 bg-cover">
            <div className="max-w-7xl mx-auto">
                <h1 className='main-heading'>About Me</h1>
                <div className="flex justify-center items-center">
                    <p className="mt-3 text-base md:text-xl lg:text-2xl text-center leading-relaxed text-my-black max-w-3xl">{about}</p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;