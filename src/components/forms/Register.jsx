import styles from './form.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('https://blog-api-ten-eta.vercel.app/api/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          confirmPassword: confirm
        }),
      });
      if (res.status === 200) {
        setUsername('');
        setPassword('');
        setConfirm('');
        setMessage('User created successfully')
        navigate('/login');
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
      <div className={styles.formTitle}>Register</div>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" required/>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password: </label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" required/>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" name="confirmPassword"/>
      </div>
      <button className={styles.formSubmit} type='submit'>Sign Up</button>
      {message ? <div>{message}</div> : null}
    </form>
  )
}

export default Register