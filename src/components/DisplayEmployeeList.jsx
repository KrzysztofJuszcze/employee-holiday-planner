import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import supabase from '../services/supabase';


export default function BasicTable() {

  const [data, setData] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase
      .from('Staff')
      .select('*');
      if(!error) {
        setData(data);
        setRowNumber(1);
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginRight: '10px', marginLeft: '10px'}}>
    <TableContainer component={Paper} sx={{marginRight:'10px'}}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RowId</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Surname</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">AIN</TableCell>
            <TableCell align="right">Hire date</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Main function</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.ain}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{rowNumber + index}</TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.surname}</TableCell>
              <TableCell align="right">{item.gender}</TableCell>
              <TableCell align="right">{item.ain}</TableCell>
              <TableCell align="right">{item.hire_date}</TableCell>
              <TableCell align="right">{item.position}</TableCell>  
              <TableCell align="right">{item.main_function}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}