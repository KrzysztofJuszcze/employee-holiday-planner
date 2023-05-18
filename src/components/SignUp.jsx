import {useNavigate, Link} from 'react-router-dom'
import supabase from "../services/supabase";

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
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <input id="email" placeholder="Email adress"/> 
            <br/>
            <input id="password" type="password" placeholder="Password"/> 
            <br/>
            <input id="password_confirm" type="password" placeholder="Confirm password"/>
            <br/> 
            <button>Sign Up</button>  
        </form>
        <Link to='/signin'>SignIn</Link>
    </div>
    )
}

    export default SignUp;