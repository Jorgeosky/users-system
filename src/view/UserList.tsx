import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../context/UserContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserList = ({ token } : any) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate('/'));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Error al cargar los usuarios.");
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
       <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default UserList;
