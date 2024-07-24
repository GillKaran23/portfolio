import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CgAddR } from "react-icons/cg";
import Swal from "sweetalert2";
import { FaChevronLeft, FaTrash } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const AdminExperience = () => {
  const [exp, setExp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const expPerPage = 5;
  const totalPages = Math.ceil(exp.length / expPerPage);
  const indexOfLastExp = currentPage * expPerPage;
  const indexOfFirstExp = indexOfLastExp - expPerPage;
  const currentExp = exp.slice(indexOfFirstExp, indexOfLastExp);

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

  useEffect(() => {
    getData();
  }, []);

  let openDialog = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add your Experience",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Company Name" style="width: 75%;">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Role" style="width: 75%;">` +
        `<input id="swal-input3" class="swal2-input" placeholder="From" style="width: 75%;">` +
        `<input id="swal-input4" class="swal2-input" placeholder="To" style="width: 75%;">` +
        `<input id="swal-input5" class="swal2-input" placeholder="Location" style="width: 75%;">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        const companyName = document.getElementById('swal-input1').value;
        const role = document.getElementById('swal-input2').value;
        const from = document.getElementById('swal-input3').value;
        const to = document.getElementById('swal-input4').value;
        const location = document.getElementById('swal-input5').value;
        if (!companyName || !role || !from || !to || !location) {
          Swal.showValidationMessage('All the fields are required!');
        } else {
          let createExperience = async () => {
            await addDoc(collection(db, "experience"), { companyName: companyName, role: role, from: from, to: to, location:location });
            getData();
          };
          await createExperience();
          return { companyName, role, from, to, location };
        }
      }
    });

    if (formValues) {
      Swal.fire(`Your Experience is added.`);
    }

  }

  let updateDialog = async (id, companyName, role, from, to, location) => {
    const { value: formValues } = await Swal.fire({
      title: "Update your Experience",
      html:
        `<input id="swal-input6" class="swal2-input" value='${companyName}' placeholder="Company Name" style="width: 75%;">` +
        `<input id="swal-input7" class="swal2-input" value='${role}' placeholder="Role" style="width: 75%;">` +
        `<input id="swal-input8" class="swal2-input" value='${from}' placeholder="From" style="width: 75%;">` +
        `<input id="swal-input9" class="swal2-input" value='${to}' placeholder="To" style="width: 75%;">` +
        `<input id="swal-input10" class="swal2-input" value='${location}' placeholder="Location" style="width: 75%;">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        const companyName = document.getElementById('swal-input6').value;
        const role = document.getElementById('swal-input7').value;
        const from = document.getElementById('swal-input8').value;
        const to = document.getElementById('swal-input9').value;
        const location = document.getElementById('swal-input10').value;
        if (!companyName || !role || !from || !to || !location) {
          Swal.showValidationMessage('All the fields are required!');
        } else {
          let updateExperience = async () => {
            await updateDoc(doc(db, "experience", id), { companyName: companyName, role: role, from: from, to: to, location: location });
            getData();
          };
          await updateExperience();
          return { companyName, role, from, to, location };
        }
      }
    });

    if (formValues) {
      Swal.fire(`Your Experience is updated.`);
    }

  }

  const getData = async () => {
    const data = await getDocs(collection(db, "experience"));
    setExp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteExp = async (id) => {
    const query = doc(db, "experience", id);
    await deleteDoc(query);
    getData();
  };

  return (
    <div className="w-full p-10 bg-my-black border-b-2 border-b-my-golden">
      <div className="mx-auto max-w-6xl">
        <h4 className="text-center text-4xl mt-5 font-semibold text-my-golden mb-10">Experience</h4>
        <button className="bg-my-light-dark text-my-white py-3 px-5 mb-4 flex gap-2 hover:bg-my-golden hover:text-my-black rounded-lg font-bold items-center" onClick={openDialog}>Add Experience<CgAddR className="text-2xl font-bold" /></button>
        <div className="overflow-x-auto w-full scrollbar-hide">
          <table className="table-auto border-collapse border border-slate-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-slate-300 px-4 py-2 text-center">S No.</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Company Name</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Role</th>
                <th className="border border-slate-300 px-4 py-2 text-center">From</th>
                <th className="border border-slate-300 px-4 py-2 text-center">To</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Location</th>
                <th className="border border-slate-300 px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {exp && Array.isArray(exp) ? (
                currentExp.map((value, index) => (
                  <tr key={value.id} className="bg-my-white hover:bg-my-black hover:text-my-white">
                    <td className="border border-slate-300 text-center">{indexOfFirstExp + index + 1}.</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.companyName}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.role}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.from}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.to}</td>
                    <td className="border border-slate-300 px-4 py-1 text-center">{value.location}</td>
                    <td className="border border-slate-300 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button onClick={() => { updateDialog(value.id, value.companyName, value.role, value.from, value.to, value.location) }}>
                          <FaRegEdit />
                        </button>
                        <button onClick={() => { deleteExp(value.id) }}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="text-3xl text-center m-2 w-full text-my-white">No Experience is Added</div>
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

export default AdminExperience;
