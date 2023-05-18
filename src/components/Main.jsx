import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import supabase from "../services/supabase";

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
    const { data, error } = await supabase.auth.getSession();

    if(!data.session) {
        navigation('/signIn');
        return;
    }
}

const handleLogOut = async (e) => {
    let { error } = await supabase.auth.signOut();

    if(!error) {
    navigation('/signin');
    }
}

return (
    <div>
        <button onClick={handleLogOut}>Logout</button>
        <h1>Main</h1>
    </div>
)
}