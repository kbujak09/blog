import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    localStorage.setItem('user', false)
    setUser(false);
    window.location.reload()
  }
  
  return (
    <header className={styles.header}>
      <div onClick={() => navigate('/')} className={styles.title}>BLOG</div>
      <div className={styles.auth}>
        {
        localStorage.user === 'false'
          ? 
            <>
              <button onClick={() => navigate('/login')} className={styles.login}>Log in</button>
              <button onClick={() => navigate('/register')} className={styles.register}>Register</button>
            </>
          :
            <>
              <div className={styles.logged}>welcome <span className={styles.username}>{localStorage.username}</span></div>
              <button className={styles.logout} onClick={logOut}>logout</button>
            </>
      }
      </div>
    </header>
  )
}

export default Header;