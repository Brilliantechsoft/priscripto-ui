import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../../redux/store/store";
import { fetchDoctors } from "../../../redux/slices/doctorListSlice";
import { handleSearchDoctors } from "../../../redux/slices/doctorListSlice";

const DoctorsListTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { doctors, searchDoctors, loading, error } = useSelector(
    (state: RootState) => state.doctors
  );

  const displayedDoctors = searchTerm ? searchDoctors : doctors;

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText: string = event.target.value;
    setSearchTerm(searchText);

    if (searchText.trim()) {
      const matchedDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchText.toLowerCase())
      );

      dispatch(handleSearchDoctors(matchedDoctors));
    }
  };

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };
  return (
    <div>
      <div className=" mt-0 mb-6">
        <form onSubmit={handleSubmit} className="max-w-md">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-6 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              onChange={handleSearch}
              value={searchTerm}
              type="search"
              id="default-search"
              className="block w-full
         p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full 
         bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
         dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Doctor..."
              required
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 
        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-400 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-400 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Qualification
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Experience
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Age
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Mobile No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Update & Delete
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-500 dark:divide-white/[0.05]">
                {displayedDoctors.map((doctor) => (
                  <TableRow>
                    <TableCell className="px-5 py-4 sm:px-6 text-center text-theme-sm dark:text-white/90">
                      {doctor.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {doctor.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {/* <div className="flex -space-x-2"> */}
                      {doctor.qualification}
                      {/* </div> */}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {doctor.experience}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {doctor.age}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {doctor.phone}
                    </TableCell>
                    <TableCell className="flex gap-2 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      <div>
                        <Button size="vs">Edit</Button>
                      </div>
                      <div>
                        <Button size="vs">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsListTable;
