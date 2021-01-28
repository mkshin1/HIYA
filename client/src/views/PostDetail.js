import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import "../PostDetail.css"

// Display a specific post, include comments
const PostDetail = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/post/" + props.id)
    .then(res => {
      console.log(res.data)
      setPost(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const deletePost = (id) => {
    console.log('Post ID was clicked: ', id);
    axios.delete("http://localhost:8000/api/post/" + id)
      .then(res => {
        const filtered = post.filter(singlePost => singlePost._id != id)
        setPost(filtered)
      })
  }

  return(
    <div>

      <div className="post-detail-container">

        <div className="post-top">
          <div><ArrowBackIcon onClick={(e) => navigate("/home")} className="post-arrow" style={{ fontSize: 30 }}>X</ArrowBackIcon></div>
          <div></div>
          <div></div>
        </div>

        <div className="post-main">
          <p>{post.author}</p>
          <h3>{post.title}</h3>
          <h1>{post.body}</h1>
          <p>{post.date}</p>
          {/* <p><Link to={`/post/${post._id}/update`}>Edit</Link></p> */}
        </div>

        <div className="post-data">
          <FavoriteBorder className="heart-icon"></FavoriteBorder>
          {post.meta?.likes}
          {/* <p>Likes {post.meta?.likes}</p> */}
          <div>
            <Link
              to={`/post/${post._id}/update`}
              className="edit-link"
            >
              Edit
            </Link>
          </div>
          <div
            className="delete-link"
            onClick={(e) => deletePost(post._id)}
          >
            Delete
          </div>
        </div>

        <div className="post-comments">
          <div className="single-post">
            <p>Post's Comments:</p>
          </div>
          {post.comments?.map((comment, idx) => {
            return (<div key={idx} className="single-post">
              <p>{comment.body}</p>
            </div>)
          })}
        </div>

      </div>

    </div>
  );

};

export default PostDetail;