import styles from './posts.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const formatDate = (date) => {
  const iso = new Date(date);
  return iso.toISOString().replace(/T.*/,'').split('-').reverse().join('-');
};

const Posts = ({ category }) => {

  const [ data, setData ] = useState([]); 
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const response = await fetch(`https://damp-shadow-8974.fly.dev/api/posts`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data) {
        await setData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData()
    return () => {
      setData([]);
    }
  }, [])

  const formatText = (text, length) => {
    if (text.length > length) {
      const split = text.substring(0, length).split('');
      split.push('...');
      return split.join('');
    }
    return text;
  }

  const filterData = (data) => {
    if (!data) {
      return false;
    }
    return data.filter(item => !category || item.category.toLowerCase() === category.toLowerCase())
  }

  const handleClick = (e) => {
    if (location.pathname.split('/')[1].toLowerCase() === e.currentTarget.dataset.category.toLowerCase()) {
      navigate(`${e.currentTarget.dataset.id}`)
    }
    else {
      navigate(`${e.currentTarget.dataset.category.toLowerCase()}/${e.currentTarget.dataset.id}`)
    }
  }

//   return (
//     data && filterData(data).length > 0 ?
//       <div className={styles.container}> 
//       {filterData(data).map(item => {
//       return (
//           })
//         </div>
//          }) : 
//   )
// }

  return (
    data && filterData(data).length > 0 ?
    <div className={styles.container}>
      {filterData(data).map(item => {
        return (
          <div onClick={handleClick} data-id={item._id} data-category={item.category} key={item._id} className={styles.miniature}>
            <div className={styles.title}>{formatText(item.title, 80)}</div>
            <div className={styles.text}>{formatText(item.text, 140)}</div>
            <div className={styles.date}>{formatDate(item.date)}</div>
          </div>
        )
      })}
    </div>
    : <div className={styles.noPosts}>There's no posts :(</div>
  )
}
export { formatDate };
export default Posts;
