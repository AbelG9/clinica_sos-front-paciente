import React, { useState, useContext } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import "../assets/styles/Login.css";
import { AuthContext } from "../contexts/AuthContext";
import Axios from "axios";
import URL from "../config/URL";
import IsoLogo from '../assets/img/isologo.svg';
import Loader from '../components/Loader';
import { rolesConfig } from '../config/Roles';

const Login = () => {
  let history = useHistory();
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    user: "",
    pass: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(`${URL}staff/login`, { credentials }).then((res) => {
      let response = res.data;
      if (response.success) {
        dispatch({ type: "SIGNIN", payload: response.user });
        let ROUTE = rolesConfig[response.user.role].routes;
        history.push(ROUTE[0].url);
        setLoading(false);
      } else {
        setLoading(false);
        alert(response.message);
      }
    });
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const AlreadyLoging = () => {
    let ROUTE = rolesConfig[state.data.role].routes;
    return (
      <Redirect to={ROUTE[0].url} />
    );
  }

  if (!localStorage.getItem("AuthStatus")) {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={IsoLogo} className="brand_logo" alt="Fairdent" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              {loading ? (
                <Loader />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="user"
                      className="form-control input_user"
                      value={credentials.user}
                      onChange={handleChange}
                      placeholder="usuario"
                    />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      name="pass"
                      className="form-control input_pass"
                      value={credentials.pass}
                      onChange={handleChange}
                      placeholder="contraseña"
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="d-flex justify-content-center links">
                      <small>
                        <Link to="/">¿Se te olvidó la contraseña?</Link>
                      </small>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return AlreadyLoging()
  }
};

export default Login;
