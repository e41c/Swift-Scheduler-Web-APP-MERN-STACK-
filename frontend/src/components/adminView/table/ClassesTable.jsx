import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import { useAdminContext } from '../../../AdminContext';

export const ClassesTable = () => {
    const {classes}  = useAdminContext();
    return <TableContainer component={Paper} sx={{maxHeight: '300px'}}>
        <Table aria-label="simple table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Class ID</TableCell>
                    <TableCell>Student Level</TableCell>
                    <TableCell>Dance Category</TableCell>
                    <TableCell>Classroom ID</TableCell>
                    <TableCell>Date/Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {classes.map(classes => (
                    <TableRow key={`${classes._id}`}>
                        <TableCell>{classes._id}</TableCell>
                        <TableCell>{classes.studentLevel}</TableCell>
                        <TableCell>{classes.danceCategory}</TableCell>
                        <TableCell>{classes.classroom}</TableCell>
                        <TableCell>{classes.startDate}</TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
}