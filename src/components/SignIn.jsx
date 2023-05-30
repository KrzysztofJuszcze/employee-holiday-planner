import supabase from "../services/supabase"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import StandardButton from "./StandardButton";

export default function SignIn () {

const navigation = useNavigate();

const [authError, setAuthError] = useState(null);

const handleSignIn = async (e) => {
    e.preventDefault();

    const {email, password} = e.target.elements 

    let { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    
    if(!error) {
        navigation('/');
        return;
    }

    setAuthError(error.message);
}

    return (
        <div>
            <Grid item xl={12} sx={{display:'flex', justifyContent:'center'}}>
            <h1>SignIn</h1>
            </Grid>
            { 
            authError && <div style={{color: 'red'}}>{authError}</div>
            } 
            <form onSubmit={handleSignIn}>
                <Grid container spacing={2} marginTop={2} sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <Grid item xl={12}>
                        <TextField id='email' name='email' label='email'></TextField>
                    </Grid>
                    <Grid item xl={12}>
                        <TextField id='password' name='password' label='password' type="password"></TextField>
                    </Grid>
                    <Grid item xl={12} sx={{display:'flex', justifyContent:'center'}}>
                        <StandardButton text='Signin' type='submit' sx={{ width: '100%' }}/> 
                    </Grid>
                </Grid>
            </form>
            <Grid item xl={12} sx={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                <a style={{marginRight: '10px'}}>New here?</a>
                    <Link to='/signup'>Create account</Link>
            </Grid>
        </div>
        
    )
    }