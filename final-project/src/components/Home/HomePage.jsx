// Example component definition
import React, { useState, useEffect } from 'react';
import { supabase } from '../../client';
import ReadPosts from '../Post/ReadPost';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState('created'); // State to keep track of sorting order

  useEffect(() => {
    // READ posts from table according to order
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select()
        .order(order, { ascending: false }); // Sort by 'order', descending by default

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Posts fetched:', data);
        setPosts(data);
      }
    };

    fetchPosts();
  }, [order]);

  // Function to set order to 'created' and re-fetch posts
  const sortByNewest = () => {
    setOrder('created');
  };

  // Function to set order to 'upvote' and re-fetch posts
  const sortByMostPopular = () => {
    setOrder('upvote');
  };

  return (
    <div className='homepage-container'>
      <div className="sort-buttons">
        <button onClick={sortByNewest} className={order === 'created' ? 'active' : ''}>Newest</button>
        <button onClick={sortByMostPopular} className={order === 'upvote' ? 'active' : ''}>Most Popular</button>
      </div>
      <ReadPosts data={posts} />
    </div> 
  );
};

export default HomePage;
