import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { supabase } from '../../client';
import moment from 'moment';

const Card = ({ id, title, content, imageUrl, created, upvote, comments }) => {
  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [commentList, setCommentList] = useState(comments || []);
  const [newComment, setNewComment] = useState('');

  const formattedDate = moment(created).fromNow();

  const updateUpvote = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .update({ upvote: upvoteCount + 1 })
      .eq('id', id)
      .select(); // This will retrieve the updated data

    if (error) {
      console.error('Error updating upvote:', error);
    } else if (data && data.length > 0) {
      setUpvoteCount(data[0].upvote); // Update local state with the new upvote count
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    // Assuming 'comments' is the field in your Supabase table for the comments array
    // And assuming that you handle comments as an array of strings
    const { data, error } = await supabase
      .from('Posts')
      .update({ comments: [...commentList, newComment] })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error posting comment:', error);
    } else if (data && data.length > 0) {
      setCommentList(data[0].comments); // Update the local comments state
      setNewComment(''); // Reset the comment input field
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <Link to={`/edit/${id}`}>
          <img src='Edit.svg' alt="Edit" />
        </Link>
      </div>
      <p>{formattedDate}</p>
      <p>{content}</p>
      {imageUrl && <img src={imageUrl} alt="Post" />}
      <button onClick={updateUpvote}>👍 {upvoteCount} upvotes</button>
      {/* Comments section can go here */}

    </div>
  );
};

export default Card;
