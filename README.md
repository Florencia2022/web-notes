# APP de Notas

## Descripción

Esta APP, permite crear, editar,archivar y eliminar notas.
Tambien tiene la opcion de agregar categorias a "x" nota, y de filtrar notas por categoria.

## Frontend

### Dependencias

- **@fortawesome/free-solid-svg-icons**: ^6.4.2
- **@fortawesome/react-fontawesome**: ^0.2.0
- **axios**: ^1.6.2
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-modal**: ^3.16.1
- **react-query**: ^3.39.3
- **react-router-dom** : ^6.20.0

### Scripts

- `start`: `react-scripts start`
- `build`: `react-scripts build`

## Backend

### Dependencias

- **cookie-parser**: ^1.4.6
- **dotenv**: ^16.3.1
- **express**: ^4.18.2
- **morgan**: ^1.10.0
- **pg**: ^8.11.3
- **sequelize**: ^6.35.1
- **jsonwebtoken**: ^9.0.2
- **bcrypt**: ^5.1.1

### Scripts

- `start`: `nodemon -L`

## Instrucciones para ejecutar la aplicación

1. **Frontend**:

   - Instalar las dependencias: `npm install` en el directorio del frontend.
   - Iniciar la aplicación: `npm start`.

2. **Backend**:
   - Instalar las dependencias: `npm install` en el directorio del backend.
   - Iniciar el servidor: `npm start`.

## Intrucciones Adicionales

- Cuando la pagina este corriendo, pueden entrar con los siguientes datos:
  usuario: admin
  password: admin

Asegúrate de tener las versiones correctas de Node.js >= 16.17.1 y npm >= 9.8.0 instaladas en tu sistema.
