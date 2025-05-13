import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook,useSelector, useDispatch } from 'react-redux';
import {
  fetchPrescriptions,
  removePrescription,
} from '../../../redux/slices/patient/prescriptionSlice';
import { RootState,AppDispatch } from '../../../redux/store';
import { FaTrash } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const PrescriptionsTable: React.FC = () => {
 const dispatch = useAppDispatch();
  const { items: prescriptions, loading, error } = useSelector((state: RootState) => state.prescriptions);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, [dispatch]);

  const filteredPrescriptions = prescriptions.filter((p) =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrescriptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage);

  const handleDelete = (id: string) => {
    dispatch(removePrescription(id));
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex-1 p-6">
    

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 w-1/3"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Created Date</th>
              <th className="py-2 px-4 text-left">Prescribed By</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-blue-500">#{item.id}</td>
                <td className="px-4 py-2">Prescription</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2 flex items-center">
                  <img src={item.doctor.image} alt={item.doctor.name} className="w-8 h-8 rounded-full mr-2" />
                  <span>{item.doctor.name}</span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="p-2 border border-gray-300 rounded-full text-gray-500 hover:text-blue-600">
                    <FaEye className="h-5 w-5" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-full text-gray-500 hover:text-blue-600">
                   <FaDownload className="h-5 w-5"/>
                  </button>
                  <button
                    className="p-2 border border-gray-300 rounded-full text-gray-500 hover:text-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PrescriptionsTable;
