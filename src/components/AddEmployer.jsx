import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Grid, TextField, InputLabel, Select, MenuItem} from "@mui/material"
import { useState } from "react";
import StandardButton from "./StandardButton";
/* import HireDateSelect from "./HireDateSelect"; */

const initialFormValues = {
    name: '',
    surname:'',
    gender:'',
    ain: '',
    hireDate: new Date().toLocaleDateString('en-US'),
    position: '',
    mainFunction: '',
};

export default function AddEmployer() {

    const [values, setValues] = useState(initialFormValues)
   
   
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);
    }

    return (
    <>
        <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2} marginTop={2} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Grid item xl={2}>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                            <RadioGroup row
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}>
                                <FormControlLabel value="male" control={<Radio/>} label="Male" />
                                <FormControlLabel value="female" control={<Radio/>} label="Female" />
                                <FormControlLabel value="other" control={<Radio/>} label="Other" />
                            </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={2}>
                    <TextField variant="outlined" label="Name" name="name" value={values.name} onChange={handleInputChange}></TextField>
                </Grid>
                <Grid item xl={2}>
                    <TextField variant="outlined" label="Surname" name="surname" value={values.surname} onChange={handleInputChange}></TextField>
                </Grid>
                <Grid item xl={2}>
                    <TextField variant="outlined" label="AIN" name="ain" value={values.ain} onChange={handleInputChange}></TextField>
                </Grid>
                <Grid item xl={2}>
                    <TextField variant="outlined" label="Hire date" name="hireDate" value={values.hireDate} onChange={handleInputChange}></TextField>
                </Grid>
                <Grid item xl={2}>
                    <FormControl variant='outlined' sx={{minWidth:"245px"}}>
                        <InputLabel>Position</InputLabel>
                            <Select
                            label="position"
                            name="position"
                            value={values.position}
                            onChange={handleInputChange}>
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="">Associate</MenuItem>
                                <MenuItem value="">Lead Associate</MenuItem>
                                <MenuItem value="">First Line Manager</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                    <Grid item xl={2}>
                    <FormControl variant='outlined' sx={{minWidth:"245px"}}>
                        <InputLabel>Main function</InputLabel>
                            <Select
                            label="mainfunction"
                            name="mainfunction"
                            value={values.mainFunction}
                            onChange={handleInputChange}>
                                <MenuItem value="">Lead</MenuItem>
                                <MenuItem value="">Layup key</MenuItem>
                                <MenuItem value="">Layup</MenuItem>
                                <MenuItem value="">Flow</MenuItem>
                                <MenuItem value="">Ticketer</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={2}>
                    <StandardButton type='submit' text='Submit'/>
                </Grid>
            </Grid>
        </form>
    </>
    )
}