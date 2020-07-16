import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import '../assets/styles/Login.css';
import LoginSVG from '../assets/img/login.svg'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios';
import URL from '../config/URL';

const Login = () => {
  let history = useHistory();
  const { dispatch } = useContext(AuthContext)
  const [credentials, setCredentials] = useState(
    {
      user: '',
      pass: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${URL}staff/login`, { credentials })
      .then(res => {
          let response = res.data; 
          console.log(response);
          if (response.success) {
            dispatch({ type: 'SIGNIN', payload: response.user})
            history.push('/pacientes');
          } else {
            alert(response.message)
          }
          
      });
  }

  const handleChange = (e) => {
    setCredentials(
      {
        ...credentials,
        [e.target.name]: e.target.value,
      }
    )
  }

  if (!localStorage.getItem('AuthStatus')) {
    return (
      <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
      <div className=" shadow d-flex flex-row rounded" style={{ backgroundColor: 'white' }}>
          <div className="d-flex flex-row m-5">
            <img src={LoginSVG} alt="Fairdent" />
          </div>
          <div className="m-5 text-center">
            <h1 style={{ color: '#713c8f', fontWeight: '600' }}>ACCESO</h1>
            <form onSubmit={handleSubmit} className="text-left" id="form_access">
              <div className="form-group">
                <label className="field a-field a-field_a1">
                  <input name="user" value={credentials.user} onChange={handleChange} className="field__input a-field__input" id="us_login" placeholder="ej. Stanislav" type="text" required autoComplete="off" />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">Usuario</span>
                  </span>
                </label>
              </div>
              <div className="form-group">
                <label className="field a-field a-field_a1">
                  <input name="pass" value={credentials.pass} onChange={handleChange} className="field__input a-field__input" id="us_password" placeholder="*******" type="password" required autoComplete="off" />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">Constraseña</span>
                  </span>
                </label>
              </div>
              <div align="center">
                <button type="submit" className="btn btn-primary">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
        </div>
    )
  } else {
    return (
      <Redirect to="/pacientes" />
    )
  }
}

export default Login;