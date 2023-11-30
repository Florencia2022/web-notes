import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { usePostLogin } from "../actions/index.js";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";
import * as Yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const { postLogin, isLoading } = usePostLogin();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nombre de usuario requerido"),
    password: Yup.string().required("Contraseña requerida"),
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(
        { username, password },
        { abortEarly: false }
      );
      await postLogin({
        username,
        password,
      });
      navigate("/home");
    } catch (e) {
      if (e.name === "ValidationError") {
        const errors = {};
        e.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrorLogin(errors);
      } else {
        setErrorLogin({
          general: e.response?.data?.error || "Usuario o contraseña inválidos.",
        });
      }

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }
  };

  useEffect(() => {
    const storageLogin = window.localStorage.getItem("loginUser");
    const { loginUser } = JSON.parse(storageLogin ?? "{}");
    if (loginUser) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-page">
      <div className="container-login">
        <h1>¡Bienvenido!</h1>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="text"
            value={username}
            name="Username"
            placeholder="Nombre de usuario"
            onChange={({ target }) => setUsername(target.value)}
            style={{ background: "var(--mandy-200)" }}
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            name="Password"
            placeholder="Contraseña"
            onChange={({ target }) => setPassword(target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
            className={`eye-icon ${
              errorLogin.password || errorLogin.username || errorLogin.general
                ? "eye-icon-error"
                : ""
            }`}
          />
          {errorLogin.password || errorLogin.username ? (
            <p className="errors">
              {errorLogin.username || errorLogin.password}
            </p>
          ) : null}
          {errorLogin.general && <p className="errors">{errorLogin.general}</p>}{" "}
          <button className="button" onClick={handleLogin}>
            {isLoading ? (
              <FontAwesomeIcon
                className="icon-spiner-note-card"
                icon={faSpinner}
                spin
              />
            ) : (
              " Iniciar sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
