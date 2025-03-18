import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../ui/table'
import Button from '../../ui/button/Button';

const DoctorsListTable = () => {

    interface Doctorsname {
        // id: number;
        name: string;
        email: string;
        qualification: string;
        experience: string;
        age: string;
        phone: string
    }

    // Define the table data using the interface
    const tableData: Doctorsname[] = [
        {
            name: "Lindsey Curtis",
            email: "Lindsey@gmail.com",
            qualification: "MBBS",
            experience: "3.9",
            age: "23",
            phone: "7347384734",
        },
        {
            name: "Lindsey Curtis",
            email: "Lindsey@gmail.com",
            qualification: "MBBS",
            experience: "3.9",
            age: "23",
            phone: "7347384734",
        },
        {
            name: "Lindsey Curtis",
            email: "Lindsey@gmail.com",
            qualification: "MBBS",
            experience: "3.9",
            age: "23",
            phone: "7347384734",
        },
    ];
    return (
        <div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[800px]">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
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
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {tableData.map((doctor) => (
                                    <TableRow >
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
                                                <Button>
                                                    Edit
                                                </Button>
                                            </div>
                                            <div>
                                                <Button>
                                                    Delete
                                                </Button>
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
    )
}

export default DoctorsListTable