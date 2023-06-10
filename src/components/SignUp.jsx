/*import {useNavigate, Link} from 'react-router-dom'
import supabase from "../services/supabase";
import Grid from '@mui/system/Unstable_Grid/Grid';
import { TextField } from '@mui/material';
import StandardButton from './StandardButton';
import { useEffect, useRef } from "react";

function SignUp() {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = "src/assets/foto/rozmieszczenie-przedmiotow-turystycznych-w-widoku-z-gory.jpg";
  
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
  
        const gradient = context.createLinearGradient(
          (2 / 3) * image.width,
          0,
          image.width,
          0
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
  
        context.fillStyle = gradient;
        context.globalCompositeOperation = "destination-out";
        context.fillRect(0, 0, image.width, image.height);
      };
    }, []);

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
        <>
        <div style={{ display: "flex", alignItems:'center' }}>
            <div style={{ flex: "1", height: "100vh" }}>
              <canvas ref={canvasRef} style={{ maxWidth: "50vw", height: "100%" }}></canvas>
            </div>
            <div style={{ flex: "1" }}>
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
    </div>
    </>
    )
}

    export default SignUp;
    */

    import { useNavigate, Link } from "react-router-dom";
    import supabase from "../services/supabase";
    import { useEffect, useRef, useState } from "react";
    import Grid from "@mui/system/Unstable_Grid/Grid";
    import { TextField } from "@mui/material";
    import StandardButton from "./StandardButton";
    
    function SignUp() {
      const canvasRef = useRef(null);
      const [emailError, setEmailError] = useState(false);
      const [emailExistsError, setEmailExistsError] = useState(false);
      const [passwordError, setPasswordError] = useState(false);
      const [passwordConfirmError, setPasswordConfirmError] = useState(false);

    
      useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const image = new Image();
        image.src =
          "src/assets/foto/rozmieszczenie-przedmiotow-turystycznych-w-widoku-z-gory.jpg";
    
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
    
          const gradient = context.createLinearGradient(
            (2 / 3) * image.width,
            0,
            image.width,
            0
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
    
          context.fillStyle = gradient;
          context.globalCompositeOperation = "destination-out";
          context.fillRect(0, 0, image.width, image.height);
        };
      }, []);
    
      const navigation = useNavigate();
    
      const handleSignUp = async (e) => {
        e.preventDefault();
    
        const [email, password, password_confirm] = e.target.elements;
    
        if (password.value !== password_confirm.value) {
          setPasswordConfirmError(true);
          return;
        }
    
        setPasswordError(false);
    
        if (email.value.trim() === "" || !email.value.includes("@")) {
          setEmailError(true);
          return;
        }
    
        setEmailError(false);
    
        if (password.value.trim().lenght < 8) {
            setPasswordError(true);
            return;
          }
        
          setPasswordError(false);
        
    
        let { data, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
    
        if (error) {
          if (error.message.includes("unique")) {
            setEmailExistsError(true);
          } else {
            setEmailExistsError(false);
          }
          return;
        }
        
        if (data) {
            if (data.error) {
              setEmailExistsError(true);
              return;
            }
          }
    
        navigation("/");
      };
    
      return (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: "1", height: "100vh" }}>
              <canvas
                ref={canvasRef}
                style={{ maxWidth: "50vw", height: "100%" }}
              ></canvas>
            </div>
            <div style={{ flex: "1" }}>
              <Grid item xl={12} sx={{ display: "flex", justifyContent: "center" }}>
                <h1>Sign Up</h1>
              </Grid>
              <Grid
                container
                spacing={2}
                marginTop={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <form onSubmit={handleSignUp}>
                <Grid item xl={12}>
      <TextField
        id="email"
        name="Email adress"
        label="Email adress"
        error={emailError || emailExistsError}
        helperText={
          (emailError && "Invalid email") ||
          (emailExistsError && "The selected email is already registered")
        }
        onBlur={(e) => {
          setEmailError(
            !e.target.value.includes("@") && e.target.value.trim() !== ""
          );
          setEmailExistsError(false);
        }}
        sx={{width:'290px'}}
      />
    </Grid>
                  <Grid item xl={12}>
                    <TextField
                      id="password"
                      type="password"
                      name="Password"
                      label="Password"
                      error={passwordError}
                      helperText={
                        passwordError && "Password must be at least 8 characters long"
                      }
                      onBlur={(e) =>
                        setPasswordError(
                          e.target.value.trim().length < 8 && e.target.value.trim() !== ""
                        )
                      }
                      sx={{width:'290px'}}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <TextField
                      id="password_confirm"
                      type="password"
                      name="Confirm password"
                      label="Confirm password"
                      error={passwordConfirmError}
                      helperText={passwordConfirmError && "Passwords do not match"}
                      onBlur={(e) =>
                        setPasswordConfirmError(
                            e.target.value && e.target.value !==""
                        )
                      }
                      sx={{width:'290px'}}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <StandardButton text="Sign Up" sx={{ width: "100%" }} />
                  </Grid>
                </form>
              </Grid>
              <Grid
                item
                xl={12}
                sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
              >
                <a style={{ marginRight: "10px" }}>Already signed up?</a>
                <Link to="/signin">SignIn</Link>
              </Grid>
            </div>
          </div>
        </>
      );
    }
    
    export default SignUp;
    