import supabase from "../services/supabase"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn () {

const navigation = useNavigate();

const [authError, setAuthError] = useState(null);

const handleSignIn = async (e) => {
    e.preventDefault();

    const {email, password} = e.target.elements

    let { data, error } = await supabase.auth.signInWithPassword({
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
        <>
            <h1>SignIn</h1>
            { 
            authError && <div style={{color: 'red'}}>{authError}</div>
            } 
            <form onSubmit={handleSignIn}>
                <input id="email" placeholder="Email adress"/> 
                <input id="password" type="password" placeholder="Password"/> 
                <button>Sign In</button>  
            </form>
            <Link to='/signup'>Create account</Link>
        </>
        
    )
    }