import {useNavigate, Link} from 'react-router-dom'
import supabase from "../services/supabase";
import Grid from '@mui/system/Unstable_Grid/Grid';
import { TextField } from '@mui/material';
import StandardButton from './StandardButton';

function SignUp() {

const navigation = useNavigate();

const handleSignUp = async (e) => {
    e.preventDefault();

    const [email, password, password_confirm] = e.target.elements;

    if (password.value !== password_confirm.value) {
        alert('Oba hasła muszą być identyczne')
        return;
    }

    let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value

});

if (!error) {
    navigation('/');
    return;
}
}


    return (
    <div>
        <Grid item xl={12} sx={{display:'flex', justifyContent:'center'}}>
        <h1>Sign Up</h1>
        </Grid>
        <Grid container spacing={2} marginTop={2} sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <form onSubmit={handleSignUp}>
        <Grid item xl={12}>
            <TextField id="email" name="Email adress" label="Email adress"/> 
        </Grid>
        <Grid item xl={12}>
            <TextField id="password" type="password" name="Password" label="Password"/> 
        </Grid>
        <Grid item xl={12}>
            <TextField id="password_confirm" type="password" name="Confirm password" label="Confirm password"/> 
        </Grid>
        <Grid item xl={12} sx={{display:'flex', justifyContent:'center'}}>
            <StandardButton text='Sign Up'sx={{ width: '100%' }}/>
        </Grid>
        </form>
        </Grid>
        <Grid item xl={12} sx={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
        <a style={{marginRight: '10px'}}>Already signed up?</a>
        <Link to='/signin'>SignIn</Link>
        </Grid>
    </div>
    )
}

    export default SignUp;