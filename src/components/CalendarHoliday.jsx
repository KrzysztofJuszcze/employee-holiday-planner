import { useState, useEffect } from "react";
import supabase from "../services/supabase";
import NavigateMenu from "./NavigateMenu";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import StandardButton from './StandardButton';


export default function CalendarHoliday() {
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [rowNumber, setRowNumber] = useState(0);
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [activeCell, setActiveCell] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    selectedMonth + 1,
    0
  ).getDate();

   const fetchData = async () => {
    const { data, error } = await supabase.from("Staff").select("*");
    if (!error) {
      setData(data);
      setRowNumber(1);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calendarColumns = [];
  for (let i = 0; i < daysInMonth; i++) {
    const day = i + 1;
    const date = new Date(currentDate.getFullYear(), selectedMonth, day);
    const weekDay = date.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const monthDay = date.toLocaleDateString("en-US", {
      day: "numeric",
    });

    calendarColumns.push(
      <th key={day}>
        <div className="calendar-column-weekday">{weekDay}</div>
        <div className="calendar-column-day">{monthDay}</div>
      </th>
    );
  }

  const handleMonthChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedMonth(selectedValue);
  };

  const handleCellClick = (itemId, day) => {
    setActiveCell({ itemId, day });
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const cellId = `${activeCell.itemId}-${activeCell.day}`;
  
    setSelectedValues((prevSelectedValues) => {
      const updatedSelectedValues = { ...prevSelectedValues };
      updatedSelectedValues[cellId] = selectedValue === 'null' ? null : selectedValue;
  
      return updatedSelectedValues;
    });
  
    setData((prevData) => {
      
  const updatedData = prevData.map((item) => {
        if (item.id === activeCell.itemId) {
          const updatedItem = { ...item };
          updatedItem[activeCell.day] = selectedValue === 'null' ? null : selectedValue;
          return updatedItem;
        }
        return item;
      });
      return updatedData;
    });
  };
  
  const handleSaveClick = async () => {
    const updatedData = data.map((item) => {
      const updatedItem = { ...item };
      calendarColumns.forEach((_, columnIndex) => {
        const cellId = `${item.id}-${columnIndex + 1}`;
        const selectedValue = selectedValues[cellId];
        if (selectedValue) {
          const columnName = `${columnIndex + 1}`;
          updatedItem[columnName] = selectedValue;
        }
      });
      return updatedItem;
    });
  
    try {
      const { error } = await supabase.from('Staff').upsert(updatedData);
  
      if (error) {
        console.error('Error updating data:', error);
      } else {
        console.log('Data updated successfully');

        fetchData(); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setActiveCell(null);
    setSelectedValues({});
  };
  
  

  return (
    <>
      <NavigateMenu />
      <div className="horizontal-calendar">
      <Box padding='30px'>
        <FormControl sx={{minWidth:'200px'}}>
            <InputLabel>Month</InputLabel>
        <Select
        sx={{minWidth:'300px', textAlign:'center'}}
        value={selectedMonth}
        label="Month"
        onChange={handleMonthChange}
        
        >
          <MenuItem value={0}>January</MenuItem>
          <MenuItem value={1}>February</MenuItem>
          <MenuItem value={2}>March</MenuItem>
          <MenuItem value={3}>April</MenuItem>
          <MenuItem value={4}>May</MenuItem>
          <MenuItem value={5}>June</MenuItem>
          <MenuItem value={6}>July</MenuItem>
          <MenuItem value={7}>August</MenuItem>
          <MenuItem value={8}>September</MenuItem>
          <MenuItem value={9}>October</MenuItem>
          <MenuItem value={10}>November</MenuItem>
          <MenuItem value={11}>December</MenuItem>
        </Select>
        </FormControl>
    </Box>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th className="vertical-header">RowId</th>
            <th>Name</th>
            <th>Surname</th>
            <th>AIN</th>
            <th>Function</th>
            <th>UW</th>
            <th>UŻ</th>
            <th>UD</th>
            <th className="vertical-header">OP art.188</th>
            <th className="vertical-header">Siła wyższa</th>
            <th className="vertical-header">Opieka</th>
            {calendarColumns.map((column, index) => (
              <th className="th-calendar-column" key={index}>
                <div className="calendar-column-weekday">
                  {column.props.children[0]}
                </div>
                <div className="calendar-column-day">
                  {column.props.children[1]}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={item.id}>
              <td className="td-left-side">{rowNumber + rowIndex}</td>
              <td className="td-left-side">{item.name}</td>
              <td className="td-left-side">{item.surname}</td>
              <td className="td-left-side">{item.ain}</td>
              <td className="td-left-side">{item.main_function}</td>
              <td>{item.UW}</td>
              <td>{item.UŻ}</td>
              <td>{item.UD}</td>
              <td>{item["Opieka art.188 [h]"]}</td>
              <td>{item["Siła wyższa [h]"]}</td>
              <td>{item.Opieka}</td>
              {calendarColumns.map((column, columnIndex) => {
                const cellValue = item[columnIndex + 1];
                const cellId = `${item.id}-${columnIndex + 1}`;
                const isEditable =
                  activeCell &&
                  activeCell.itemId === item.id &&
                  activeCell.day === columnIndex + 1;
                const selectedValue = selectedValues[cellId];

                return (
                  <td
                    key={columnIndex}
                    onClick={() => handleCellClick(item.id, columnIndex + 1)}
                  >
                    {isEditable ? (
                      <select
                        value={selectedValue}
                        onChange={handleSelectChange}
                      >
                        <option value=''></option>
                        <option value="UW">UW</option>
                        <option value="UŻ">UŻ</option>
                        <option value="UD">UD</option>
                      </select>
                    ) : (
                      <span>{cellValue}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <StandardButton onClick={handleSaveClick} sx={{ margin: '30px'}} text='Save'></StandardButton>
    </>
  );
}

