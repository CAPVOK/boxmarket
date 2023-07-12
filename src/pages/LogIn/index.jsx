import { useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../core/slice';
import { api } from '../../core/api';

import './index.css';

function LogInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  }

  function clickLogin () {
    if (formData.username && formData.password) {
      const request = JSON.stringify(formData);
      api.post('/login',request)
      .then(response => {
        console.log(response.data.message);
        dispatch(setLogin(true));
        navigate(fromPage, {replace: true});
      })
      .catch(err => {
        const errorMessage = err.response.data.message;
        console.log(errorMessage);
        setMessage(errorMessage);
      });
    } else [
      setMessage("Введите все данные")
    ]
  }

  return (
    <div className='Login'>
      <h3>Login</h3>

      <label htmlFor="username">Username</label>
      <input type="text" placeholder="capvok" id="username" value={formData.username} onChange={handleChange} />

      <label htmlFor="password">Password</label>
      <input type="password" placeholder="123123" id="password" value={formData.password} onChange={handleChange} />

      <button onClick={clickLogin}>Log In</button>
      <p>{message}</p>
    </div>
  )
};

export { LogInPage };
