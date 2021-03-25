import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "../UpdatePost.css";

// can only update if current user is logged in
const UpdatePost = (props) => {
  const {id} = props;
  // const [post, setPost] = useState('');
  const [errors, setErrors] = useState('');

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/post/' + id)
      .then(res => {
        setTitle(res.data.title);
        setBody(res.data.body);
        setImageUrl(res.data.imageUrl);
      })
  }, [])

  const updatePost = (e) => {
    e.preventDefault();

    axios.put('http://localhost:8000/api/post/' + id + '/update', {
      title: title,
      body: body,
      imageUrl: imageUrl
    })
    .then(res => {
      console.log('Response: ', res.data)
      navigate('/post/' + id)
    })
      .catch(err => console.log(err))
  }

  return(
    <div>
      <div className="post-top">
          <div><ArrowBackIcon onClick={(e) => navigate("/home")} className="post-arrow" style={{ fontSize: 30, marginLeft: "20px" }}>X</ArrowBackIcon></div>
          <div></div>
          <div></div>
        </div>
      <div className="update-form-container">
        <h1>Whoops!</h1>
        <form onSubmit={updatePost}>
          <p>
            <label><b>Title:</b> </label>
            <input
              type="text"
              className= "updatePost-input-field"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </p>
          <p>
            <label><b>Body:</b> </label>
            <textarea
              type="text"
              className= "updatePostBody-input-field"
              name="body"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </p>
          <p>
            <label><b>Image URL:</b> </label>
            <input
              type="text"
              className= "updatePost-input-field"
              name="imageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </p>
          <input type="submit" value="Update" className="update-submit-btn"/>
        </form>
      </div>

    </div>
  );
}

export default UpdatePost;