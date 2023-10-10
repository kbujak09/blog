import styles from './form.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('https://damp-shadow-8974.fly.dev/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });
      const resJSON = await res.json();
      if (res.status === 200) {
        setUser(true);
        localStorage.setItem('token', resJSON.token);
        localStorage.setItem('user', true);
        localStorage.setItem('username', resJSON.user.username);
        localStorage.setItem('id', resJSON.user._id)
        setUsername('');
        setPassword('');
        setMessage('Logged in successfully')
        navigate('/');
      }
      else {
        setMessage('Some error occurred');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formTitle}>Login</div>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" required/>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password: </label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" required/>
      </div>
      <button className={styles.formSubmit} type='submit'>Log in</button>
      {message ? <div>{message}</div> : null}
    </form>
  )
}

export default Login