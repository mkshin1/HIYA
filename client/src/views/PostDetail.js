import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import "../PostDetail.css"

// Display a specific post, include comments
const PostDetail = (props) => {
  const {id} = props;
  const [post, setPost] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [activeUser, setActiveUser] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:8000/api/post/" + id)
    .then(res => {
      console.log("From Use Effect ", res.data)
      setPost(res.data)
      // console.log('Post within useEffect: ', post);
    })
    .catch(err => console.log(err))
  }, [post.likes])

  const deletePost = (id) => {
    console.log('Post ID was clicked: ', id);
    axios.delete("http://localhost:8000/api/post/" + id)
      .then(res => {
        const filtered = allPosts.filter(singlePost => singlePost._id !== id)
        setAllPosts(filtered)
        navigate('/home')
      })
  }

  const likePost = (id) => {
    axios.post(`http://localhost:8000/api/post/${id}/likes`)
    .then(res => {
      console.log('Successfully liked a post', res.data)
      setPost(res.data)
    })
    .catch(err => console.error(err))

  }

  const addComment = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/post/${id}/addComment`, {
      body: comment
    })
    .then(res => {
      setPost({
        ...post,
        creator: localStorage.getItem("userFirstName") + " " + localStorage.getItem('userLastNameInitial'),
        comments: [
          ...post.comments,
          res.data
        ]
      })
    })
    .catch(err => console.error(err))
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
          <p>{post.creator}</p>
          <h3>{post.title}</h3>
          <h1>{post.body}</h1>
          <div className="post-image" >
            {post.imageUrl ? <img src={post.imageUrl}/> : null}
          </div>

          <p>{post.date}</p>
        </div>

        <div className="post-data">
          <FavoriteBorder className="heart-icon"
            onClick={(e) => likePost(post._id)}>

          </FavoriteBorder>
          {post.likes}
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

        {post.comments ? (
            <div className="post-comments">
              <div className="single-post">
                <p>Comments:</p>
                <form onSubmit={(e) => addComment(e)}>
                  <input type="hidden" value="" />
                  <textarea onChange={e => setComment(e.target.value)} value={comment} placeholder="Leave a comment ..." />
                  <input type="submit" value="Add Comment"/>
                </form>
              </div>
                {post.comments.map((comment, idx) => {
                  return (<div key={idx} className="single-post">
                    <p>{post.author}</p>
                    <p>{comment.body}</p>
                  </div>)
                })}
            </div>
          ) : null
        }


      </div>

    </div>
  );

};

export default PostDetail;