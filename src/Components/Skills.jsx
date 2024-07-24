import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";


let Skills = () => {
  let [tech, setTech] = useState([]);
  const getSkills = async () => {
    const data = await getDocs(collection(db, "skills"));
    setTech(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getSkills();
  }, []);
  return (
    <>
      <div id="skills" name="skills" className="main-section bg-back-image3 bg-cover">
        <div className="max-w-7xl mx-auto">
          <h1 className="main-heading">Skills</h1>
          <div className="max-w-4xl mx-auto">
            {tech.map((value) => {
              return (
                <div key={value.id} className="mb-6">
                  <h3 className="font-bold mb-2 text-light-dark text-base md:text-xl">{value.skillname}</h3>
                  <div className="h-5 bg-my-light-dark rounded-full overflow-hidden border-2 border-my-black">
                    <div
                      className="h-full bg-gradient-to-r from-my-golden to-yellow-600 rounded-full"
                      style={{ width: `${value.percent}%` }}
                    >
                      <p className="text-black text-xs font-bold text-center">{value.percent}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>

  );
}
export default Skills;