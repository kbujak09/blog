import styles from './categories.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chosen = location.pathname.split('/')[1];

  return (
    <nav className={styles.categories}>
      <div id='astronomy'  onClick={() => navigate('/astronomy')} className={`${styles.category} ${chosen === 'astronomy' ? styles.chosen : null}`}>Astronomy</div>
      <div id='travel' onClick={() => navigate('/travel')} className={`${styles.category} ${chosen === 'travel' ? styles.chosen : null}`}>Travel</div>
      <div id='chess' onClick={() => navigate('/chess')} className={`${styles.category} ${chosen === 'chess' ? styles.chosen : null}`}>Chess</div>
      <div id='history' onClick={() => navigate('/history')} className={`${styles.category} ${chosen === 'history' ? styles.chosen : null}`}>History</div>
    </nav>
  ) 
}

export default Categories