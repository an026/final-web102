import React, { useState } from 'react';
import { supabase } from '../../client'; // Make sure this is the correct path to your Supabase client
import './PostPage.css'; // Adjust the path if necessary
import moment from 'moment-timezone';

const PostPage = () => {
  // State to keep track of form inputs
  const [post, setPost] = useState({
    title: '',
    content: '',
    url: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = moment(Date()).tz( 'America/Atlanta').format(); 

    // Send the new post data to Supabase
    const { data, error } = await supabase
      .from('Posts') // Make sure 'Posts' matches your table name in Supabase
      .insert([
        {
          title: post.title,
          content: post.content,
          url: post.url,
          created: date, // Assuming you have a 'created' column for timestamps
          // Add any other columns you need here
          upvote: 0

        },
      ]);

    if (error) {
      console.error('Error inserting new post:', error);
    } else {
      console.log('New post added:', data);
      // Reset form or navigate to another page
      setPost({ title: '', content: '', url: '' }); // Reset the form
      // If you have navigation in place, you can navigate to the newly created post
    }
  };

  return (
    <div className="form-container">
      <div className="post-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content (Optional)</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Image URL (Optional)</label>
            <input
              type="text"
              id="url"
              name="url"
              value={post.url}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
