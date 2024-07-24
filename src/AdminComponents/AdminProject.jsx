import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CgAddR } from "react-icons/cg";
import Swal from "sweetalert2";
import { FaChevronLeft, FaTrash } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const AdminProjects = () => {
  const [pro, setPro] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const proPerPage = 5;
  const totalPages = Math.ceil(pro.length / proPerPage);
  const indexOfLastpro = currentPage * proPerPage;
  const indexOfFirstpro = indexOfLastpro - proPerPage;
  const currentpro = pro.slice(indexOfFirstpro, indexOfLastpro);

  useEffect(() => {
    getData();
  }, []);

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
      title: "Add your Project",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Project Name" style="width: 75%;">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Type" style="width: 75%;">` +
        `<input id="swal-input3" class="swal2-input" placeholder="For" style="width: 75%;">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Language" style="width: 75%;">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        const projectName = document.getElementById('swal-input1').value;
        const type = document.getElementById('swal-input2').value;
        const projectFor = document.getElementById('swal-input3').value;
        const languages = document.getElementById('swal-input4').value;
        if (!projectName || !type || !projectFor || !languages) {
          Swal.showValidationMessage('All the fields are required!');
        } else {
          let createProject = async () => {
            await addDoc(collection(db, "projects"), { projectName: projectName, type: type, projectFor: projectFor, languages: languages });
            getData();
          };
          await createProject();
          return { projectName, type, projectFor, languages };
        }
      }
    });

    if (formValues) {
      Swal.fire(`Your Project is added.`);
    }

  }

  let updateDialog = async (id, projectName, type, projectFor, languages) => {
    const { value: formValues } = await Swal.fire({
      title: "Update your Project",
      html:
        `<input id="swal-input5" class="swal2-input" value='${projectName}' placeholder="Company Name" style="width: 75%;">` +
        `<input id="swal-input6" class="swal2-input" value='${type}' placeholder="Role" style="width: 75%;">` +
        `<input id="swal-input7" class="swal2-input" value='${projectFor}' placeholder="From" style="width: 75%;">` +
        `<input id="swal-input8" class="swal2-input" value='${languages}' placeholder="To" style="width: 75%;">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        const projectName = document.getElementById('swal-input5').value;
        const type = document.getElementById('swal-input6').value;
        const projectFor = document.getElementById('swal-input7').value;
        const languages = document.getElementById('swal-input8').value;
        if (!projectName || !type || !projectFor || !languages) {
          Swal.showValidationMessage('All the fields are required!');
        } else {
          let updateProjects = async () => {
            await updateDoc(doc(db, "projects", id), { projectName: projectName, type: type, projectFor: projectFor, languages: languages });
            getData();
          };
          await updateProjects();
          return { projectName, type, projectFor, languages };
        }
      }
    });

    if (formValues) {
      Swal.fire(`Your Project is updated.`);
    }

  }

  const getData = async () => {
    const data = await getDocs(collection(db, "projects"));
    setPro(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deletePro = async (id) => {
    const query = doc(db, "projects", id);
    await deleteDoc(query);
    getData();
  };

  return (
    <div className="w-full p-10 bg-my-black border-b-2 border-b-my-golden">
      <div className="mx-auto max-w-6xl">
        <h4 className="text-center text-4xl mt-5 font-semibold text-my-golden mb-10">Projects</h4>
        <button className="bg-my-light-dark text-my-white py-3 px-5 mb-4 flex gap-2 hover:bg-my-golden hover:text-my-black rounded-lg font-bold items-center" onClick={openDialog}>Add Project <CgAddR className="text-2xl font-bold" /></button>
        <div className="overflow-x-auto w-full scrollbar-hide">
          <table className="table-auto border-collapse border border-slate-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-slate-300 px-4 py-2 text-center">S No.</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Project Name</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Type</th>
                <th className="border border-slate-300 px-4 py-2 text-center">For</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Language</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pro && Array.isArray(pro) ? (
                currentpro.map((value, index) => (
                  <tr key={value.id} className="bg-my-white hover:bg-my-black hover:text-my-white">
                    <td className="border border-slate-300 text-center">{indexOfFirstpro + index + 1}.</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.projectName}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.type}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.projectFor}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.languages}</td>
                    <td className="border border-slate-300 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button onClick={() => { updateDialog(value.id, value.projectName, value.type, value.projectFor, value.languages) }}>
                          <FaRegEdit />
                        </button>
                        <button onClick={() => { deletePro(value.id) }}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="text-3xl text-center m-2 w-full text-my-white">No Project is Added</div>
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

export default AdminProjects;
