import styles from './comments.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../posts/Posts';

const Comments = () => {

  const location = useLocation();

  const postId = location.pathname.split('/')[2];

  const [data, setData] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://blog-api-ten-eta.vercel.app/api/comments?postId=${postId}`, {
        method: 'GET',
        headers: {
          Authorization: bearer,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsoned = await response.json();
      setData(jsoned.comments)
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleTextResize = (e) => {
    const text = e.target;
    text.style.height = 'auto';
    text.style.height = `${text.scrollHeight}px`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;

    const formData = new URLSearchParams();
    formData.append('comment', inputValue);
    formData.append('postId', postId);

    if (inputValue === '') {
      return;
    }
    try {
      const response = await fetch('https://blog-api-ten-eta.vercel.app/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: bearer,
        },
        body: formData,
      });

    fetchComments();
    await setInputValue('');
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchComments();

    return () => {
      setData([]);
    }
  }, [])

  return (
    <div className={styles.comments}>
      <h1 className={styles.title}>Comments:</h1>
      <form onSubmit={handleSubmit} className={styles.addComment} action="">
        <label htmlFor="comment"></label>
        <textarea placeholder='Add comment' onChange={handleInputChange} onInput={handleTextResize} value={inputValue} className={styles.input} type="text" name='comment'></textarea>
        <button className={styles.addButton}>Comment</button>
      </form> 
      {!data ? <div className={styles.noComments}>There's no comments!</div> : <div className={styles.commentsList}>{data.map(item => 
      {
        return (
          <div className={styles.comment}>
            <div className={styles.commentHeader}>
              <div className={styles.commentAuthor}>{item.author.username}</div>
              <div className={styles.commentDate}>{formatDate(item.date)}</div>
            </div>
            <div className={styles.commentText}>{item.text}</div>
          </div>
        )
      })}
    </div>}
  </div>
  )
}

export default Comments;