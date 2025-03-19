import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../../ui/table";
  import Button from "../../ui/button/Button";
import { patientTableData } from '../../../types/patientTableData';
const PatientListTable = () => {

     const patientData: patientTableData[] = [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          phoneNumber: 9876543210,
          age: 30,
          illness: "Flu",
          blood_group: "O+",
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phoneNumber: 9123456789,
          age: 25,
          illness: "Allergy",
          blood_group: "A-",
        },
        {
          name: "Michael Johnson",
          email: "michael.johnson@example.com",
          phoneNumber: 9988776655,
          age: 40,
          illness: "Diabetes",
          blood_group: "B+",
        },
        {
          name: "Emily Davis",
          email: "emily.davis@example.com",
          phoneNumber: 9090909090,
          age: 35,
          illness: "Hypertension",
          blood_group: "AB+",
        },
        {
          name: "David Brown",
          email: "david.brown@example.com",
          phoneNumber: 8787878787,
          age: 28,
          illness: "Asthma",
          blood_group: "O-",
        },
      ];
      
  return (
    <>
        <div>
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
                    Illness
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Blood Group
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
                    Update & Delete & view
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}<TableBody className="divide-y divide-gray-500 dark:divide-white/[0.05]">
                {patientData.map((patient , index) => (
                  <TableRow key={index}>
                    <TableCell className="px-5 py-4 sm:px-6 text-center text-theme-sm dark:text-white/90">
                      {patient.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {patient.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {/* <div className="flex -space-x-2"> */}
                      {patient.illness}
                      {/* </div> */}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {patient.blood_group}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {patient.age}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {patient.phoneNumber}
                    </TableCell>
                    <TableCell className="flex gap-2 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      <div>
                        <Button>Edit</Button>
                      </div>
                      <div>
                        <Button>Delete</Button>
                      </div>
                      <div>
                        <Button>View</Button>
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
    </>
  )
}

export default PatientListTable