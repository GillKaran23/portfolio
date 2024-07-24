import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, getDoc } from "firebase/firestore";
import { ImSpinner9 } from "react-icons/im";

let AdminNavBar = () => {
    let [uname, setName] = useState(null);
    let navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                let query = await getDoc(doc(db, 'users', 'admin-doc'));
                if (query.exists()) {
                    setName(query.data().name);
                  }
            } else {
              navigate("/");
            }
          });
    },[navigate]);
    let LogoutUser = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to LogOut?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut!"
          }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth).then(() => {
                  navigate("/");
                }).catch((error) => {
                  console.log(error);
                });
            }
          });
    }
    return (
        <div className="fixed w-full p-3 shadow-lg z-50 top-0 bg-gray-300">
            <div className="flex max-w-7xl justify-between mx-auto items-center">
                <Link to="/" className="font-serif text-2xl">{uname===null? <ImSpinner9 className="animate-spin text-3xl"/> : uname}</Link>
                <div className="flex gap-6 items-center">
                    <button onClick={LogoutUser} className="gap-3 rounded-full bg-my-black text-lg font-semibold text-white items-center px-4 py-2">Logout</button>
                </div>
            </div>
        </div>
    )
}
export default AdminNavBar;
