import NavigateMenu from "./NavigateMenu";
import DisplayEmployeeList from "./DisplayEmployeeList";
import { Grid } from "@mui/material";
import StandardButton from "./StandardButton";
import { useNavigate } from "react-router-dom";

export default function Staff() {

    const navigation = useNavigate();

    return (
        <>
            <Grid display={"flex"} justifyContent={"center"} padding={10}>
                <h1>Your Staff:</h1>
            </Grid>
            <Grid padding={2} display={'flex'} justifyContent={'flex-end'}>
                <StandardButton text='Add employee' onClick={()=> navigation('/addemployer')}></StandardButton>
            </Grid>
                <NavigateMenu/>
                <DisplayEmployeeList/>
        </>
    )
}