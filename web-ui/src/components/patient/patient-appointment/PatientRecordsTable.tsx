import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


export default function MedicalRecordsTable() {
  const records = useSelector((state: RootState) => state.records.records);

  const [searchTerm, setSearchTerm] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

   const filteredRecords = records.filter((p) =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="mb-8">
        <input
              type="text"
              placeholder="Search..."
               value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            />
      </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Medical Record
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Record For</th>
              <th className="p-4">Comments</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record:any) => (
              <tr key={record.id} className="border-b text-sm">
                <td className="p-4 text-blue-600 cursor-pointer">{record.id}</td>
                <td className="p-4">{record.name}</td>
                <td className="p-4">{record.date}</td>
                <td className="p-4 flex items-center gap-2">
                  <img
                    src={record.avatar}
                    alt={record.patient}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{record.patient}</span>
                </td>
                <td className="p-4">{record.comments}</td>
                <td className="p-4 flex space-x-2">
                  <button className="text-blue-500 hover:underline">🔗</button>
                  <button className="text-green-500 hover:underline">✎</button>
                  <button className="text-red-500 hover:underline">🗑</button>
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
}
