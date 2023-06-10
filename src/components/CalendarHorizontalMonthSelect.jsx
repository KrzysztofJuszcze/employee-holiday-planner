import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {useState} from 'react'
import Box from '@mui/material/Box';

export default function CalendarHorizontalMonthSelect() {

    const [currentDate] = useState(new Date());
    const [month, setMonth] = useState(currentDate.getMonth());

    const handleChange = (event) => {
setMonth(event.target.value);
};

  return (
    <>
    <Box>
        <FormControl>
            <InputLabel>Month</InputLabel>
        <Select
        value={month}
        label="Month"
        onChange={handleChange}
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
    </>
  )
}
