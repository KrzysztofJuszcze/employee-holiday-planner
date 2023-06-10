import NavigateMenu from './NavigateMenu'
import supabase from '../services/supabase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';<TableCell align="right">Hire Date</TableCell>
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export default function HolidayEntitlement() {

    const [data, setData] = useState([]);
    const [rowNumber, setRowNumber] = useState(0);
    const [editRow, setEditRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [editableColumns, setEditableColumns] = useState({});

    const handleEditClick = (rowId) => {
        const rowToEdit = data.find(item => item.ain === rowId);
        if (rowToEdit) {
          setEditRow(rowId);
          setEditedData({...rowToEdit,});
          setEditableColumns({
            UW: true,
            UŻ: true,
            UD: true,
            'Opieka art.188 [h]':true,
            'Siła wyższa [h]' : true,
            Opieka: true,
          });
        }
      };

      const handleEditChange = (event, field) => {
        if(editableColumns[field]) {
        setEditedData(prevData => ({
          ...prevData,
          [field]: event.target.value
        }));
      }
      };

      const handleSaveClick = async () => {
        console.log('Zapisano zmienione dane:', editedData);

        const updatedData = {
          ...editedData,
          UW:
      editedData.UW !== undefined ? editedData.UW : 20,
    UŻ:
      editedData.UŻ !== undefined ? editedData.UŻ : 4,
    UD:
      editedData.UD !== undefined ? editedData.UD : 0,
    'Opieka art.188 [h]':
      editedData['Opieka art.188 [h]'] !== undefined
        ? editedData['Opieka art.188 [h]']
        : 16,
    'Siła wyższa [h]':
      editedData['Siła wyższa [h]'] !== undefined
        ? editedData['Siła wyższa [h]']
        : 16,
    Opieka:
      editedData.Opieka !== undefined ? editedData.Opieka : 5,
  };
    
        const { data: updatedDataResponse, error } = await supabase
          .from('Staff')
          .update(updatedData)
          .eq('ain', editRow);
    
        if (!error) {
          const newData = data.map((item) =>
            item.ain === editRow ? { ...item, ...updatedData } : item
          );
    
          setData(newData);
          setEditRow(null);
          setEditedData({});
          setEditableColumns({});
        } else {
          console.error('Błąd podczas aktualizacji danych:', error);
        }
      };
    
      useEffect(() => {
        const fetchData = async () => {
          const { data, error } = await supabase.from('Staff').select('*');
          if (!error) {
            setData(data);
            setRowNumber(1);
            console.log(data);
          }
        };
    
        fetchData();
      }, []);
    

  return (
    <>
        <NavigateMenu />
            <div style={{ marginRight: '15px', marginLeft: '15px'}}>
                <TableContainer component={Paper} sx={{marginRight:'15px'}}>
                    <Table sx={{ width: 1600}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>RowId</TableCell>
                                <TableCell align="center">Name</TableCell>  
                                <TableCell align="center">Surname</TableCell>
                                <TableCell align="center">AIN</TableCell>
                                <TableCell align="center">UW</TableCell>
                                <TableCell align="center">UŻ</TableCell>
                                <TableCell align="center">UD</TableCell>
                                <TableCell align="center">Opieka art.188 [h]</TableCell>
                                <TableCell align="center">Siła wyższa [h]</TableCell>
                                <TableCell align="center">Opieka</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                              key={item.ain}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">{rowNumber + index}</TableCell>
                              <TableCell align="center">{item.name}</TableCell>
                              <TableCell align="center">{item.surname}</TableCell>
                              <TableCell align="center">{item.ain}</TableCell>
                              <TableCell align="center">
                                {editRow === item.ain ? (
                                  <input className='inputEdit' value={editedData.UW} onChange={(event) => handleEditChange(event, 'UW')}/>
                                ) : (
                                  item.UW !== undefined ? item.UW : 20)}
                              </TableCell>
                              <TableCell align="center">{editRow === item.ain ? (
                                  <input className='inputEdit' value={editedData.UŻ !== undefined ? editedData.UŻ : (item.UŻ !== undefined ? item.UŻ : 4)} onChange={(event) => handleEditChange(event, 'UŻ')}/>
                                ) : (
                                  item.UŻ !== undefined ? item.UŻ : 4)}
                              </TableCell>
                              <TableCell align="center">{editRow === item.ain ? (
                                  <input className='inputEdit' value={editedData.UD !== undefined ? editedData.UD : 0} onChange={(event) => handleEditChange(event, 'UD')}/>
                                ) : (
                                  item.UD !== undefined ? item.UD : 0)}
                              </TableCell>
                              <TableCell align="center">{editRow === item.ain ? (
                                  <input className='inputEdit' value={editedData['Opieka art.188 [h]'] !== undefined ? editedData['Opieka art.188 [h]'] : 16} onChange={(event) => handleEditChange(event, 'Opieka art.188 [h]')}/>
                                ) : (
                                  item['Opieka art.188 [h]'] !== undefined ? item['Opieka art.188 [h]'] : 16)}
                              </TableCell>
                              <TableCell align="center">{editRow === item.ain ? (
                                  <input className='inputEdit' value={editedData['Siła wyższa [h]'] !== undefined ? editedData['Siła wyższa [h]'] : 16 } onChange={(event) => handleEditChange(event, 'Siła wyższa [h]')}/>
                                ) : (
                                  item['Siła wyższa [h]'] !== undefined ? item['Siła wyższa [h]'] : 16 )}
                              </TableCell>
                              <TableCell align="center">{editRow === item.ain ? (
                                  <input className='inputEdit' value={editedData.Opieka !== undefined ? item.Opieka : 5} onChange={(event) => handleEditChange(event, 'Opieka')}/>
                                ) : (
                                  item.Opieka !== undefined ? item.Opieka : 5)}
                              </TableCell>
                              <TableCell align="right">
                                {editRow === item.ain ? (
                                  <Button onClick={handleSaveClick}>Save</Button>
                                ) : (
                                  <Button onClick={() => handleEditClick(item.ain)}>Edit</Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
    </>
  );
}