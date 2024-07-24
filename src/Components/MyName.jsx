import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
let MyName = () => {
  let [username, setusername] = useState(null);
  let [profession, setProfession] = useState(null);
  let [resume, setResume] = useState(null);
  let [profile, setProfilePic] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      let query = await getDoc(doc(db, 'users', 'admin-doc'));
      if (query.exists()) {
        setusername(query.data().fullname);
        setProfession(query.data().profession);
        setResume(query.data().resume);
        setProfilePic(query.data().profile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="home" name="home" className="w-full md:py-28 pt-16 pb-8 px-5 bg-back-image bg-cover border-b-2 border-my-black">
        <div className="max-w-7xl lg:flex lg:flex-row mx-auto justify-between gap-4">
          <div className="mb-10 flex items-center">
            <div className='mb-10 md:mb-16'>
              <div className='mt-5'>
                <h3 className='text-xl md:text-3xl text-my-light-dark font-semibold'>Hello, I{`'`}m {username}</h3>
              </div>
              <div className='py-3 bg-gradient-to-t from-purple-500 via-pink-600 to-red-700 bg-clip-text'>
                <h2 className='text-transparent text-5xl md:text-7xl font-bold'>{profession}</h2>
              </div>
              <h3 className='mt-3'>
                <Link
                  to={resume}
                  target="_blank"
                  className='inline-block bg-my-black text-my-white p-2 mt-2 rounded-full font-semibold px-12 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-600'
                  download
                >
                  Download Resume
                </Link>
              </h3>

            </div>
          </div>
          <div className='flex items-center justify-center mt-10'>
            <img alt="Profile Pic" className='rounded-full border-4 border-my-black h-80 w-80 md:h-128 md:w-128 object-fill' src={profile} />
          </div>
        </div>
      </div>
    </>
  );
}
export default MyName;