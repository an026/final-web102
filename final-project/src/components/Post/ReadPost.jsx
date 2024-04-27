import React, { useState, useEffect } from 'react';
import Card from './Card';
import './ReadPost.css'

const ReadPosts = ({ data }) => { // Destructure data from props

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("Posts data:", data); // Log the posts data
        setPosts(data); // Set the posts state to the incoming data prop
    }, [data]); // Depend on the specific 'data' prop for changes

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => // 'index' is not used here, so it's removed
                   <Card 
                     key={post.id}
                     id={post.id} // Pass 'id' down to Card
                     title={post.title}
                     content={post.content}
                     imageUrl={post.imageUrl}
                     created={post.created}
                     upvote={post.upvote}
                     comments={post.comments}
                   />
                ) : <h3 className="noResults">No Posts Yet 😞</h3>
            }
        </div>  
    );
}

export default ReadPosts;
