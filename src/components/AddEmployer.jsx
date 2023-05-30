import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Grid, TextField, InputLabel, Select, MenuItem} from "@mui/material"
import { useState } from "react";
import StandardButton from "./StandardButton";
import supabase from "../services/supabase";
import NavigateMenu from "./NavigateMenu";
/* import { useNavigate } from "react-router-dom";
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

const positionNames = [
'None',
'Associate',
'Lead Associate',
'First Line Manager',
];

const mainFunctionNames = [
    'FLM',
    'Lead',
    'Layup key',
    'Layup',
    'Flow',
    'Ticketer'
    ]

export default function AddEmployer() {
    
    const [values, setValues] = useState(initialFormValues)
   
   
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name , surname, gender, ain, hireDate, position, mainFunction} = e.target.elements;
        const { data, error } = await supabase
        .from('Staff')
        .insert([
          { gender: gender.value, name: name.value, surname: surname.value, ain: ain.value, hire_date: hireDate.value, position: position.value, main_function: mainFunction.value },
        ]);

        if(!error) {
        setValues(initialFormValues);
        console.log(data);
        }
        
    };
        return (
        <>
            <NavigateMenu />
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
                                  {positionNames.map((positionName) => (
                                    <MenuItem key={positionName} value={positionName}>{positionName}</MenuItem>)
                                  )}
                                </Select>
                        </FormControl>
                    </Grid>
                        <Grid item xl={2}>
                        <FormControl variant='outlined' sx={{minWidth:"245px"}}>
                            <InputLabel>Main function</InputLabel>
                                <Select
                                label="mainfunction"
                                name="mainFunction"
                                value={values.mainFunction}
                                onChange={handleInputChange}>
                                    {mainFunctionNames.map((mainFunctionName) => (
                                        <MenuItem key={mainFunctionName} value={mainFunctionName}>{mainFunctionName}</MenuItem>
                                    ))}
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