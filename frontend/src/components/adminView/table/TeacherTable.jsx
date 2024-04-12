import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import { useAdminContext } from '../../../AdminContext';

export const TeacherTable = () => {
    const {teachers}  = useAdminContext();
    return <TableContainer component={Paper} sx={{maxHeight: '300px'}}>
        <Table aria-label="simple table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Teacher ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {teachers.map(teacher => (
                    <TableRow key={`${teacher._id}`}>
                        <TableCell>{teacher._id}</TableCell>
                        <TableCell>{teacher.firstName}</TableCell>
                        <TableCell>{teacher.lastName}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
}