import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";

const Login = ({ setToken } : any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('123abc87');
  const [error, setError] = useState('');
  const url = process.env.API_URL || "http://localhost:8000/api";
  const { login } = useUser();
  const navigate = useNavigate();

   const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      console.log("API URL:", url); // Verifica que la variable de entorno esté definida
      console.log("Username:", username, "Password:", password)
      const response = await axios.post(url+"/token/", {
        username,
        password,
      });

      console.log(response.data);
      
      // Almacenar el token JWT en localStorage o sessionStorage
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setToken(access);
      login({ id: 1, username }, () => {
        navigate('/list');
      });
    } catch (err) {
      console.log('pasa')
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
  <div style={{
     width: '300px',
     margin: 'auto',
     marginTop: '100px',
     border: '1px solid #ccc',
     padding: '20px',
     borderRadius: '50px',
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  }}> 
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin}
      style={{ display: 'flex', flexDirection: 'column',}}>
      <TextField id="standard-basic" 
        label="Usuario"
        variant="standard" 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <br />
      <TextField id="standard-password-input" 
        label="Contraseña"
        variant="standard" 
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: 'red'
        }}>{error}</p>}
        <br />
        <Button type="submit" variant='contained'>Ingresar</Button>
      </form>
    </div>
  );
}


export default Login;