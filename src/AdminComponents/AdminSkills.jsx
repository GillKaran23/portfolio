import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CgAddR } from "react-icons/cg";
import Swal from "sweetalert2";
import { FaChevronLeft, FaTrash } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 5;
  const totalPages = Math.ceil(skills.length / skillsPerPage);
  const indexOfLastSkills = currentPage * skillsPerPage;
  const indexOfFirstSkills = indexOfLastSkills - skillsPerPage;
  const currentSkills = skills.slice(indexOfFirstSkills, indexOfLastSkills);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  let openDialog = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter your Skill and Knowledge",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Skill Name" style="width: 75%;">` +
        `<input id="swal-input2" class="swal2-input" type="number" min="10" max="100" step="10" placeholder="Knowledge (10 - 100)" style="width: 75%;">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        const skillName = document.getElementById('swal-input1').value;
        const percentage = document.getElementById('swal-input2').value;
        if (!skillName || !percentage) {
          Swal.showValidationMessage('You need to enter both skill name and percentage!');
        } else if (percentage % 10 !== 0 || percentage < 10 || percentage > 100) {
          Swal.showValidationMessage('Percentage must be one of the following values: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100');
        } else {
          let createSkill = async () => {
            await addDoc(collection(db, "skills"), { skillname: skillName, percent: Number(percentage) });
            getData();
          };
          await createSkill();
          return { skillName, percentage };
        }
      }
    });
    
    if (formValues) {
      Swal.fire(`Your skill is added.`);
    }
    
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getDocs(collection(db, "skills"));
    setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteSkills = async (id) => {
    const query = doc(db, "skills", id);
    await deleteDoc(query);
    getData();
  };

  return (
    <div className="w-full p-10 bg-my-black border-b-2 border-b-my-golden">
      <div className="mx-auto max-w-6xl">
        <h4 className="text-center text-4xl mt-5 font-bold text-my-golden mb-10">Skills</h4>
        <button className="hover:bg-my-golden bg-my-light-dark text-my-white py-3 px-5 mb-4 flex gap-2 hover:text-my-black rounded-lg font-bold items-center" onClick={openDialog}>Add Skill<CgAddR className="text-2xl font-bold"/></button>
          <div className="overflow-x-auto w-full">
            <table className="table-auto border-collapse border border-slate-400 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-slate-300 px-4 py-2 text-center">S No.</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Skills</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Knowledge</th>
                  <th className="border border-slate-300 px-4 py-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {skills && Array.isArray(skills) ? (
                currentSkills.map((value, index) => (
                    <tr key={value.id} className="bg-my-white hover:bg-my-black hover:text-my-white">
                      <td className="border border-slate-300 text-center">{indexOfFirstSkills + index + 1}.</td>
                      <td className="border border-slate-300 px-4 py-1 text-center">{value.skillname}</td>
                      <td className="border border-slate-300 px-4 py-1 text-center">{value.percent}{'%'}</td>
                      <td className="border border-slate-300 text-center">
                        <button onClick={() => {deleteSkills(value.id)}}>
                        <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="text-3xl text-center m-2 w-full text-my-white">No Skill is Added</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
          </div>
          <div className="flex justify-end gap-2 mt-4">
              <button
                className="p-3 rounded-full bg-my-golden text-my-black"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span className="p-2 font-semibold text-my-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="p-3 rounded-full bg-my-golden text-my-black"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
      </div>
    </div>
  );
};

export default AdminSkills;
