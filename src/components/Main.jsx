import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import supabase from "../services/supabase";
import Grid from "@mui/system/Unstable_Grid/Grid";
import NavigateMenu from "./NavigateMenu";

export default function Main () {
let alreadyMounted = false;
const navigation = useNavigate();

useEffect(() => {
if(!alreadyMounted) {
    getSession();
}
alreadyMounted = true;
}, []);

const getSession = async() => {
    const { data } = await supabase.auth.getSession();

    if(!data.session) {
        navigation('/signIn');
        return;
    }
}

return (
    <>
        <NavigateMenu />
        <Grid container spacing={2} display='flex' alignItems='center' flexDirection='column'>
                <h1>Welcome to the holiday planning application</h1>
        </Grid>
    </>
)
}