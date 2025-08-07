import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Checkbox,
} from '@mui/material';
import axios from 'axios';

const url = process.env.API_URL || 'http://localhost:8000/api';

const Login = ({ setToken }: any) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem('username') || '',
  );
  const [password, setPassword] = useState(
    localStorage.getItem('password') || '',
  );
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem('remember_me'),
  );
  const [error, setError] = useState('');
  const { login } = useUser();

  useEffect(() => {
    if (localStorage.getItem('access_token') != null) {
      console.log('ya tiene token');
      navigate('/list');
    }
  }, [navigate]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(url + '/token/', {
        username,
        password,
      });

      console.log(response.data);

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setToken(access);
      if (rememberMe) {
        localStorage.setItem('remember_me', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('remember_me');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      login({ id: 1, username }, () => {
        navigate('/list');
      });
    } catch (err) {
      console.log('pasa');
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(to bottom right, #3A00E5, #2D3EED)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'center' },
          px: { xs: 4, md: 12 },
          py: 8,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          style={{ marginBottom: 50 }}
          gutterBottom
        >
          Hola Usuarios{' '}
          <span role="img" aria-label="wave">
            👋
          </span>
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 400 }}>
          Este es un ejemplo de una aplicación de gestion de usuarios utilizando
          React y Material-UI. Puedes iniciar sesión con cualquier usuario y
          contraseña registrada.
        </Typography>
        <Box mt={6}>
          <Typography variant="caption" color="rgba(255,255,255,0.6)">
            © 2025 Jorge Quintero. Todos los derechos reservados.
            <br />
            Este sitio utiliza software de código abierto y bibliotecas de
            terceros.
          </Typography>
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
          py: 6,
          backgroundColor: '#fafafa',
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={0} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Bienvenido
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              ¿No tienes una cuenta?, por favor contacta un administrador para
              que te asigne una.
            </Typography>

            <TextField
              fullWidth
              label="Usuario o Email"
              variant="outlined"
              margin="normal"
              placeholder="email@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Typography variant="body2">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recordarme
            </Typography>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 2, mb: 1, textTransform: 'none', fontWeight: 'bold' }}
            >
              Ingresar
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
