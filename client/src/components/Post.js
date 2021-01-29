import React, {useState, useEffect} from 'react'
import {navigate, Link} from '@reach/router'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from "axios"


import "../Post.css"


function Post() {
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState("")
    const [results, setResults] = useState([])
    const [img, setImg] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeUser, setActiveUser] = useState('');


    // const buttonStyle = {
    //     position:"relative",
    //     top: "200px",
    //     right: "899px"
    // }

    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
        .then(res => setResults(res.data))
        .catch(err => console.log(err))
    }, [results])
    // results will display likes in real time, results.likes will mess up network tab

    // useEffect(() => {
    //     const creatorName = localStorage.getItem("userFirstName") + " " + localStorage.getItem('userLastNameInitial');
    //     console.log('creator name: ', creatorName)
    //     const ID = localStorage.getItem("userID")

    //     axios.get('http://localhost:8000/api/users')
    //     .then(res => {
    //         setActiveUser(res.data)
    //         console.log('active user: ', activeUser)
    //     })
    //     .catch(err => console.log(err))
    // }, [])


    const submitHandler = e => {
        const creatorName = localStorage.getItem("userFirstName") + " " + localStorage.getItem('userLastNameInitial');
        console.log('creator name: ', creatorName)

        e.preventDefault()
        axios.post("http://localhost:8000/api/post/add", {
            title: title,
            body:post,
            imageUrl:img,
            author: localStorage.getItem("userID"),
            creator: localStorage.getItem("userFirstName") + " " + localStorage.getItem('userLastNameInitial')
        })

        .then(() => {
            navigate("/home")
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            console.log(errorResponse)
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
              errorArr.push(errorResponse[key].message)
            }
            setErrors(errors)
      })

        setPost("")
        setTitle("")
        setImg("")
    }

    const filteredList = (id) => {
        setResults(results.filter((eachResult) => eachResult._id !== id))
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/post/${id}`)
            .then(() => filteredList(id))
            .catch(err => console.log(err))
    }

    const likePost = (id) => {
        axios.post(`http://localhost:8000/api/post/${id}/likes`)
        .then(res => {
            console.log('Successfully liked a post from dashboard', res.data)
            setPost(res.data)
        })
        .catch(err => console.error(err))

    }

    return (
        <div className="post">
                    <div className="post-form">
                    {/* <div className="title" style={{position:"relative", bottom:"350px", left: "205px"}}> */}
                    {/* <InputLabel>Title</InputLabel> */}
                    <Input
                    onChange={e => setTitle(e.target.value)}
                    // style={{marginBottom: "10px", fontFamily: "Century Gothic"}}
                    placeholder="What's the title of your post?"
                    value={title}
                    style={{
                        padding: "20px",
                        display: "flex",
                        flex: "1",
                        marginLeft: "40px",
                        fontSize: "20px",
                        border: "none",
                        width: "90%",
                        marginBottom: "10px",
                        fontFamily: "Century Gothic"
                    }}/>
                    {/* <Input  onChange={e => setTitle(e.target.value)} style={{marginBottom: "10px"}} placeholder="Enter Image Url"/> */}

                    </div>

                    <TextField
                    className="textfield"
                    // label="Make a Post"
                    variant="outlined"
                    size="Large"
                    color="primary"
                    style={{
                        padding: "20px",
                        display: "flex",
                        flex: "1",
                        marginLeft: "20px",
                        fontSize: "20px",
                        border: "none"
                    }}
                    // style={{width:"900px",height: "300px", marginLeft: "200px", marginTop:"100px"}}
                    multiline
                    rows={2}
                    onChange={e => setPost(e.target.value)}
                    value={post}
                    >
                    </TextField>

                    <Input

                    onChange={e => setImg(e.target.value)}
                    placeholder="Want to share an image?"
                    value={img}
                    style={{marginLeft: "380px", width: "230px", fontFamily: "Century Gothic"}}
                    ></Input>

                    {/* <button onClick={ submitHandler }>Post</button> */}
                    <Button
                    className="post-button"
                    variant="contained"
                    color="primary"
                    // style={buttonStyle}
                    style={{
                        display: "flex",
                        // flex: "1",
                        marginLeft: "40px",
                        fontSize: "15px",
                        borderRadius: "30px",
                        marginTop: "-30px"
                    }}
                    onClick={ submitHandler }
                    >Post</Button>

                    <div className="feed">
                    {
                        results.map((result, idx) => {
                            return (
                            <div
                            key={idx}
                            className="eachPost"
                            >
                                <Link
                                style={{marginRight: "20px", marginLeft: "10px"}}
                                to="/">&#128077;
                                </Link>

                                <p
                                style={{marginLeft: "10px"}}>
                                    {result.creator}
                                </p>

                                <p
                                onClick={e => navigate(`/post/${result._id}`)}
                                style={{wordWrap:"break-word", marginLeft: "10px", fontWeight: "bold"}}>{result.title}
                                </p>

                                <img src={result.imageUrl} className="post-image-main"/>

                                <div className="post-data-div">
                                    {/* Like Button  */}
                                    <FavoriteBorder
                                        className="heart-icon"
                                        style={{
                                            marginLeft:"20px"}}
                                        onClick={(e) => likePost(result._id)}>

                                    </FavoriteBorder>
                                    {result.likes}

                                    <Link
                                    style={{
                                        marginRight:"15px",
                                        marginLeft:"20px", textDecoration:"none"}}
                                    to={`/post/${result._id}/update`}>&#x270E;
                                    </Link>

                                    <Link
                                    style={{
                                        marginRight:"15px",
                                        marginLeft:"15px",
                                        textDecoration:"none"}}
                                    onClick={e => deleteHandler(result._id)}
                                    to="/home">&#128465;
                                    </Link>
                                </div>



                            </div>
                            )
                        })
                    }
                    </div>

        </div>
    )
}

export default Post
