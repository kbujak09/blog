import styles from './app.module.css';
import Header from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import { useState } from 'react';
import Posts from './components/posts/Posts';
import Categories from './components/categories/Categories';
import Post from './components/post_item/Post';
import Comments from './components/comments/Comments';

function App() {
  
  const [user, setUser] = useState(false);  

  return (
    <div className={styles.app}>
      <Header user={user} setUser={setUser}/>
      <Categories />
      <main className={styles.content}>
        <Routes>
          <Route path='/' element={<Posts/>}/>
          <Route path='/:category?/:post' element={<Post/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login setUser={setUser}/>}/>
          <Route path='/astronomy' element={<Posts category='astronomy'/>}/>
          <Route path='/chess' element={<Posts category='chess'/>}/>
          <Route path='/travel' element={<Posts category='travel'/>}/>
          <Route path='/history' element={<Posts category='history'/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
