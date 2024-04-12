import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import { useAdminContext } from '../../../AdminContext';

export const StudentTable = () => {
    const {students}  = useAdminContext();
    return <TableContainer component={Paper} sx={{maxHeight: '300px'}}>
        <Table aria-label="simple table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Student ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {students.map(student => (
                    <TableRow key={`${student._id}`}>
                        <TableCell>{student._id}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>{student.email}</TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
}