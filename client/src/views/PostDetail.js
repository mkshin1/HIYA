import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import "../PostDetail.css"

// Display a specific post, include comments
const PostDetail = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/post/" + props.id)
    .then(res => {
      console.log(res.data)
      setPost({...res.data})
    })
    .catch(err => console.log(err))
  }, [])

  return(
    <div className="post-detail-container">
      <div className="post-top">
        <button onClick={(e) => navigate("/home")}>X</button>
      </div>
      <div className="post-main">
        <p>{post.author}</p>
        <h3>{post.title}</h3>
        <h2>{post.body}</h2>
        <p>{post.date}</p>
        <p><Link to="/post/:id/update">Edit</Link></p>
      </div>
      <div className="post-data">
        <p>Likes {post.meta?.likes}</p>
      </div>
      <div>
        <p>Post's Comments:---</p>
        {post.comments?.map((comment, idx) => {
          return <div key={idx}>
            <p>{comment.body}</p>
          </div>
        })}
      </div>
    </div>
  );

};

export default PostDetail;