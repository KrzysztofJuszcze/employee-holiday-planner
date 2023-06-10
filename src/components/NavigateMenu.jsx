import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import supabase from '../services/supabase';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import '../main.scss'

export default function NavigateMenu() {
  const [value, setValue] = useState(0);
  const navigation = useNavigate();
  const location = useLocation();


  const handleLogOut = async () => {
    let { error } = await supabase.auth.signOut();

    if(!error) {
    navigation('/signin');
    }
};

  return (
    <>
      <BottomNavigation sx ={{ transition: 'none', position: 'fixed', top: 0, right: 0, width: '100%', justifyContent: 'flex-end', fontSize:'0.75rem'}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" onClick={() => navigation('/')} style={{fontSize:'0.875rem'}}
        sx={{transition: 'none', color: location.pathname === '/' ? '#1976d2' : 'rgba(0, 0, 0, 0.6)',
        backgroundColor: location.pathname ==='/' ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
        fontSize: location.pathname ==='/' ? '0.875rem' : '0.875rem' }}/>
        <BottomNavigationAction label="Planner" onClick={() => navigation('/planner')}  
          sx={{textTransform: 'none', color: location.pathname === '/planner' ? '#1976d2' : 'rgba(0, 0, 0, 0.6)',
          backgroundColor: location.pathname ==='/planner' ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
          fontSize: location.pathname ==='/planner' ? '0.875rem' : '0.875rem' }}/>
        <BottomNavigationAction label="Staff" onClick={() => navigation('/staff')}
         sx={{textTransform: 'none', color: location.pathname === '/staff' ? '#1976d2' : 'rgba(0, 0, 0, 0.6)',
         backgroundColor: location.pathname ==='/staff' ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
         fontSize: location.pathname ==='/staff' ? '0.875rem' : '0.875rem' }}/>
        <BottomNavigationAction label="Logout" onClick={handleLogOut}  sx={{textTransform: 'none', color: location.pathname === '/planner' ? '#1976d2' : 'rgba(0, 0, 0, 0.6)',
          backgroundColor: location.pathname ==='/logout' ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
          fontSize: location.pathname ==='/logout' ? '0.875rem' : '0.875rem' }}/>
      </BottomNavigation>
    </>
  );
}