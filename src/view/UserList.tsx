import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../context/UserContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add, PersonAdd, Delete, Edit, Logout } from '@mui/icons-material';
import UserModal from '../components/UserModal';

const UserList = ({ token }: any) => {
  const [users, setUsers] = useState<any>([]);
  const [change, setChange] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [idModal, setIdModal] = useState(0);
  const { user: userGlobal, login, logout } = useUser();
  const usernameGlobal = localStorage.getItem('username');
  const [type, setType] = useState<'delete' | 'put' | 'post' | 'voucher'>(
    'delete',
  );

  const handleModal = (typeHandle: 'delete' | 'put' | 'post' | 'voucher') => {
    setType(typeHandle);
    setOpenModal(true);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUsers([]);
    setError('');
    logout(() => navigate('/'));
  };

  useEffect(() => {
    console.log('yser1', users);
    console.log('aca1', userGlobal);
    if (
      userGlobal === null ||
      userGlobal === undefined ||
      userGlobal?.id === 0
    ) {
      console.log('aca');
      console.log('yser2', users);
      const userGlobal = users.filter(
        (item: any) => item.username === usernameGlobal,
      );
      console.log(userGlobal[0]);
      login(userGlobal[0], () => {});
    }
  }, [users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        logout(() => navigate('/'));
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, change, logout, navigate]);

  return error ? (
    <>
      {error}
      <Button
        variant="outlined"
        color="error"
        startIcon={<Logout />}
        onClick={handleLogout}
        sx={{ textTransform: 'none' }}
      >
        Regresar
      </Button>
    </>
  ) : (
    <>
      <Box p={2}>
        <Paper elevation={3} sx={{ p: 2 }}>
          {/* Header: Filtros y botón de crear usuario */}
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent={isMobile ? 'space-between' : 'flex-end'}
            alignItems={isMobile ? 'stretch' : 'center'}
            mb={2}
            gap={1}
          >
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => handleModal('post')}
              disabled={userGlobal?.role !== 'admin' ? true : false}
              sx={{ textTransform: 'none', backgroundColor: '#008CFF' }}
            >
              Crear nuevo usuario
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Cerrar Sesion
            </Button>
          </Box>
          {/* Tabla de usuarios */}
          <Box sx={{ overflowX: 'auto', msOverflowX: 'visible' }}>
            <Table
              sx={{
                width: '100%',
              }}
              aria-label="user table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>ROL</TableCell>
                  <TableCell>USUARIO</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>VOUCHER</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>HORA</TableCell>
                  <TableCell align="center" style={{ paddingLeft: '40px' }}>
                    ACCIONES
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.voucher?.slice(0, 8)}</TableCell>
                    {user.voucher ? (
                      atob(user.voucher.slice(9))
                        .split(' ')
                        .map((item: string) => <TableCell>{item}</TableCell>)
                    ) : (
                      <>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      <IconButton
                        disabled={
                          userGlobal?.role === 'admin' ||
                          userGlobal?.id === user.id
                            ? false
                            : true
                        }
                      >
                        <Add
                          color={
                            userGlobal?.role === 'admin' ||
                            userGlobal?.id === user.id
                              ? 'success'
                              : undefined
                          }
                          fontSize="large"
                          onClick={() => {
                            handleModal('voucher');
                            setIdModal(user.id);
                          }}
                        />
                      </IconButton>
                      <IconButton
                        disabled={
                          user.role === 'admin' ||
                          (user.id !== userGlobal?.id &&
                            userGlobal?.role !== 'admin')
                            ? true
                            : false
                        }
                      >
                        <Edit
                          color={
                            user.role === 'admin' ||
                            (user.id !== userGlobal?.id &&
                              userGlobal?.role !== 'admin')
                              ? undefined
                              : 'primary'
                          }
                          fontSize="large"
                          onClick={() => {
                            handleModal('put');
                            setIdModal(user.id);
                          }}
                        />
                      </IconButton>
                      <IconButton
                        disabled={
                          user.role === 'admin' ||
                          (user.id !== userGlobal?.id &&
                            userGlobal?.role !== 'admin')
                            ? true
                            : false
                        }
                      >
                        <Delete
                          color={
                            user.role === 'admin' ||
                            (user.id !== userGlobal?.id &&
                              userGlobal?.role !== 'admin')
                              ? undefined
                              : 'error'
                          }
                          fontSize="large"
                          onClick={() => {
                            handleModal('delete');
                            setIdModal(user.id);
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>
      <UserModal
        modal={openModal}
        setModal={setOpenModal}
        type={type}
        token={token}
        idModal={idModal}
        change={change}
        setChange={setChange}
      />
    </>
  );
};

export default UserList;
