import React from 'react';
import { Route, Routes } from 'react-router';
import { UserProvider } from './context/UserContext';
import Login from './view/Login';
import UserList from './view/UserList';
import PrivateRoute from './view/PrivateRouter';

function App() {
  const [token, setToken] = React.useState<string | null>(localStorage.getItem("access_token"));
  return (
    <UserProvider>
    <Routes>
        <Route element={<Login setToken={setToken} />} path="/" />
        <Route 
            path="/list" 
            element={
              <PrivateRoute>
                <UserList token={token} />
              </PrivateRoute>
            } 
          />
    </Routes>
    </UserProvider>
  );
}

export default App;
