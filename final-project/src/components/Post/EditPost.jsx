import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import './PostPage.css'; // Adjust the path if necessary

const EditPostPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });

  useEffect(() => {
    // Fetch the post data from the backend when the component mounts
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single(); // Fetch a single post by ID

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the post data in the backend
    const { data, error } = await supabase
      .from('Posts')
      .update({ 
        title: post.title, 
        content: post.content, 
        imageUrl: post.url
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      console.log('Post updated successfully', data);
      navigate('/'); // Navigate back to the home page or post page
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();
    const { error } = await supabase
    .from('Posts')
    .update({ title: post.title, content: post.content,  imageUrl: post.imageUrl})
    .eq('id', id)

    if (error) {
        console.log(error);
    }

    window.location = "/";
}

  // Function to delete the post
  const deletePost = async () => {
    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      console.log('Post deleted successfully');
      navigate('/'); // Navigate back to the home page or to the posts list
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
            <label htmlFor="imageUrl">Image URL (Optional)</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={post.url}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={updatePost}>Update Post</button>
          <button type="button" onClick={deletePost} className="delete-button">
            Delete Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
