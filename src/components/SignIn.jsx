    import supabase from "../services/supabase";
    import { useState, useEffect, useRef } from "react";
    import { useNavigate, Link } from "react-router-dom";
    import { Grid } from "@mui/material";
    import { TextField } from "@mui/material";
    import StandardButton from "./StandardButton";
    
    export default function SignIn() {
      const navigation = useNavigate();
      const [authError, setAuthError] = useState(null);
      const canvasRef = useRef(null);
      const [emailError, setEmailError] = useState(false);
      
    
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
    
      const handleSignIn = async (e) => {
        e.preventDefault();
    
        const { email, password } = e.target.elements;
    
        if(email.value.trim() ==="" || !email.value.includes('@')) {
            setEmailError(true);
            return;
        }

        setEmailError(false);

        let { error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
    
        if (!error) {
          navigation("/");
          return;
        }
    
        setAuthError(error.message);
      };
    
      return (
        <>
          <div style={{ display: "flex", alignItems:'center' }}>
            <div style={{ flex: "1", height: "100vh" }}>
              <canvas ref={canvasRef} style={{ maxWidth: "50vw", height: "100%" }}></canvas>
            </div>
            <div style={{ flex: "1" }}>
              <Grid item xl={12} sx={{ display: "flex", justifyContent: "center", alignItems:'center', flexDirection:'column'}}>
                <h1 style={{marginBottom:'40px', fontSize:'35px'}}>Holiday Schedule For Your Staff</h1>
                <h2>SignIn</h2> 
              </Grid>
              <form onSubmit={handleSignIn}>
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
                  <Grid item xl={12}>
                    <TextField 
                    id="email" 
                    name="email" 
                    label="email" 
                    error={emailError}
                    helperText={emailError && "Invalid email"}
                    onBlur={(e) => setEmailError(!e.target.value.includes('@') && e.target.value.trim() !== "")}/>
                  </Grid>
                  <Grid item xl={12}>
                    <TextField
                      id="password"
                      name="password"
                      label="password"
                      type="password"
                      helperText={authError && "Invalid login credentials"}
                      sx={{
                        "& .MuiFormHelperText-root": {
                          color: "red",
                        },
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "red",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xl={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <StandardButton text="Signin" type="submit" sx={{ width: "100%" }} />
                  </Grid>
                </Grid>
              </form>
              <Grid item xl={12} sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <a style={{ marginRight: "10px" }}>New here?</a>
                <Link to="/signup">Create account</Link>
              </Grid>
            </div>
          </div>
        </>
      );
    }
