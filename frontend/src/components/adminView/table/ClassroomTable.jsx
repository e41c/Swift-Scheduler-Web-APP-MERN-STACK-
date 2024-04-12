import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import { useAdminContext } from '../../../AdminContext';

export const ClassroomTable = () => {
    const {classrooms}  = useAdminContext();
    return <TableContainer component={Paper} sx={{maxHeight: '300px'}}>
        <Table aria-label="simple table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Classroom ID</TableCell>
                    <TableCell>Classroom Number</TableCell>
                    <TableCell>Capacity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {classrooms.map(classroom => (
                    <TableRow key={`${classroom._id}`}>
                        <TableCell>{classroom._id}</TableCell>
                        <TableCell>{classroom.classroomNumber}</TableCell>
                        <TableCell>{classroom.capacity}</TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
}