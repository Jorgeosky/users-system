# Users System Frontend

Bienvenido a **Users System Frontend**, una aplicación React + TypeScript para la gestión y autenticación de usuarios, conectada a la API de Django.

---

## ✨ Características

- **Login con JWT** y almacenamiento seguro del token
- **Registro de usuarios** desde el frontend
- **Listado de usuarios** (solo para autenticados)
- **Protección de rutas** con Context API
- **Gestión de sesión** (login/logout)
- **Consumo de API** con Axios

---

## ⚡ Instalación rápida

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/users-system.git
   cd users-system
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Configura la URL de la API:**

   - Edita el archivo `.env` y agrega:
     ```
     API_URL=http://localhost:8000
     ```

4. **Inicia la aplicación:**
   ```bash
   npm start
   ```

---

## 🔑 Autenticación

- **Login:**  
  Ingresa tu usuario y contraseña para obtener el token JWT.
- **Registro:**  
  Puedes crear un usuario desde la pantalla de registro, sin necesidad de estar autenticado.
- **Logout:**  
  Elimina el token y cierra la sesión.

---

## 🖥️ Estructura del proyecto

```
users-system/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── ...
├── public/
├── package.json
└── ...
```

---

## 📚 Principales pantallas

- **Login:**  
  Acceso seguro con JWT.

  <img width="1907" height="909" alt="image" src="https://github.com/user-attachments/assets/a6cdc115-dc99-4f9f-a31d-19553f761356" />
  
- **Listado de usuarios:**  
  Solo visible para usuarios autenticados.

  <img width="1887" height="648" alt="image" src="https://github.com/user-attachments/assets/18c03604-9610-4eb3-b214-1b2ea30ccdf2" />


---

## 🔗 Integración con el backend

Asegúrate de que la API de Django esté corriendo y la URL esté correctamente configurada en `.env`.

---

## 📝 Notas

- Cambia la URL de la API según tu entorno.
- El token se almacena en `localStorage` para mantener la sesión.
- Puedes personalizar los componentes y estilos según tus necesidades.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

¡Gracias por usar **Users System Frontend**!  
¿Tienes dudas o sugerencias? Abre un issue o contacta al equipo
