import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import { Undo, Delete, Upgrade, PersonAdd, Add } from '@mui/icons-material';
import { createUser, deleteUser, updateUser } from '../services/userService';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '70%',
    sm: 400,
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface actions {
  delete: {
    name: string;
  };
  put: {
    name: string;
  };
  post: {
    name: string;
  };
  voucher: {
    name: string;
  };
}

const actionNames: actions = {
  delete: {
    name: 'Eliminar',
  },
  put: {
    name: 'Actualizar',
  },
  post: {
    name: 'Crear',
  },
  voucher: {
    name: 'Crear Voucher de',
  },
};

interface props {
  modal: boolean;
  setModal: (item: boolean) => void;
  type: 'delete' | 'put' | 'post' | 'voucher';
  token: string;
  idModal: number;
  change: boolean;
  setChange: (item: boolean) => void;
}

const UserModal = ({
  modal,
  setModal,
  type,
  token,
  idModal,
  change,
  setChange,
}: props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [voucher, setVoucher] = useState(generarVoucher());
  const [error, setError] = useState<any>(null);

  const handlerClose = async (condition: boolean) => {
    if (!condition) {
      setUsername('');
      setPassword('');
      setEmail('');
      setVoucher(generarVoucher());
      setModal(false);
    } else {
      try {
        let updateData: any = {};
        if (username !== '') {
          updateData['username'] = username;
        }
        if (password !== '') {
          updateData['password'] = password;
        }
        if (email !== '') {
          updateData['email'] = email;
        }
        switch (type) {
          case 'post':
            await createUser(
              { username, password, email, role: 'user' },
              token,
            );
            break;
          case 'put':
            await updateUser(idModal, updateData, token);
            break;
          case 'delete':
            await deleteUser(idModal, token);
            break;
          case 'voucher':
            const now = new Date().toISOString();
            now.slice(9);
            const base64 = btoa(now.slice(0, 10) + ' ' + now.slice(11, 19));
            await updateUser(
              idModal,
              { voucher: voucher + '|' + base64 },
              token,
            );
            break;
        }
        setUsername('');
        setPassword('');
        setEmail('');
        setVoucher(generarVoucher());
        setChange(!change);
        setModal(false);
      } catch (err) {
        setError(error);
      }
    }
  };

  return (
    <Modal
      open={modal}
      onClose={() => handlerClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {actionNames[type].name} Usuario
        </Typography>
        <Divider />
        {(() => {
          switch (type) {
            case 'delete':
              return <></>;
            case 'put':
              return (
                <>
                  <TextField
                    fullWidth
                    label="Usuario"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    placeholder="email@example.com"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                </>
              );
            case 'post':
              return (
                <>
                  <TextField
                    fullWidth
                    label="Usuario"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    placeholder="email@example.com"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                </>
              );
            case 'voucher':
              return (
                <>
                  <TextField
                    fullWidth
                    label="Voucher"
                    variant="outlined"
                    margin="normal"
                    value={voucher}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Undo />}
                    style={{ margin: '5px' }}
                    sx={{ textTransform: 'none' }}
                    onClick={() => setVoucher(generarVoucher())}
                  >
                    Regenerar
                  </Button>
                </>
              );
            default:
              return <></>;
          }
        })()}
        {error ? (
          <Typography color="error" id="modal-modal-description" sx={{ mt: 2 }}>
            {error.message}
          </Typography>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Estas seguro que desea {actionNames[type].name.toLowerCase()} este
            usuario?
          </Typography>
        )}
        <Divider />
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Undo />}
            style={{ margin: '5px' }}
            sx={{ textTransform: 'none' }}
            onClick={() => handlerClose(false)}
          >
            Cancelar
          </Button>
          {(() => {
            switch (type) {
              case 'delete':
                return (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      style={{ margin: '5px' }}
                      sx={{ textTransform: 'none' }}
                      onClick={() => handlerClose(true)}
                    >
                      {actionNames[type].name}
                    </Button>
                  </>
                );
              case 'put':
                return (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Upgrade />}
                      style={{ margin: '5px' }}
                      sx={{ textTransform: 'none' }}
                      onClick={() => handlerClose(true)}
                    >
                      {actionNames[type].name}
                    </Button>
                  </>
                );
              case 'post':
                return (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<PersonAdd />}
                      style={{ margin: '5px' }}
                      sx={{ textTransform: 'none' }}
                      onClick={() => handlerClose(true)}
                    >
                      {actionNames[type].name}
                    </Button>
                  </>
                );
              case 'voucher':
                return (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<Add />}
                      style={{ margin: '5px' }}
                      sx={{ textTransform: 'none' }}
                      onClick={() => handlerClose(true)}
                    >
                      Crear voucher
                    </Button>
                  </>
                );
              default:
                return <></>;
            }
          })()}
        </Box>
      </Box>
    </Modal>
  );
};

const generarVoucher = (longitud = 8) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let voucher = '';
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    voucher += caracteres[indice];
  }
  return voucher;
};

export default UserModal;
