import styles from './post.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDate } from '../posts/Posts';
import Comments from '../comments/Comments';

const Post = () => {

  const [post, setPost] = useState(undefined);

  const[isLiked, setIsLiked] = useState(undefined);

  const [count, setCount] = useState(undefined);

  const location = useLocation();

  const postId = location.pathname.split('/')[2];

  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;

  const fetchPost = async () => {
    const data = await(
      await fetch(`https://blog-api-ten-eta.vercel.app/api/posts/${postId}`)).json();
    if (data) {
      if (data.likes.includes(localStorage.id)) {
        setIsLiked(true);
      }
      else {
        setIsLiked(false);
      }
      setCount(data.likes.length)
      return setPost(data);
    }
    return;
  }

  const likePost = async (e) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: bearer,
        },
      });
      const data = await response.json();
      setCount(data.likes.length);
      setIsLiked(true);
    }
    catch (err) {
      console.log(err)
    }
  }

  const unlikePost = async (e) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: bearer,
        },
      });
      const data = await response.json();
      setCount(data.likes.length);
      setIsLiked(false);
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchPost();
  }, [])

  return (
    post && 
    <div className={styles.post}>
      <div className={styles.header}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.date}>{formatDate(post.date)}</div>
      </div>
      <div className={styles.text}>{post.text}</div>
        {
        isLiked &&
        <div className={styles.likes}>
          <i onClick={unlikePost} className="material-symbols-outlined" style={{color: "var(--red-light)", cursor: "pointer"}}>favorite</i>
          <div className={styles.likesCount}>{count}</div>
        </div>
        }
        {
        !isLiked && 
        <div className={styles.likes}>
          <i onClick={likePost}  className="material-symbols-rounded" style={{color: "var(--red-light)", cursor: "pointer"}}>favorite</i> 
          <div className={styles.likesCount}>{count}</div>
        </div>
        }
      <Comments/>
    </div>
  )
}

export default Post;