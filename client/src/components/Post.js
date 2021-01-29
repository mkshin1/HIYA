import React, {useState, useEffect} from 'react'
import {navigate, Link} from '@reach/router'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import axios from "axios"


import "../Post.css"


function Post() {
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState("")
    const [results, setResults] = useState([])
    const [img, setImg] = useState("")



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
        .then(() => navigate("/home"))
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


    return (
        <div className="post">
                    <div className="post-form">
                    {/* <div className="title" style={{position:"relative", bottom:"350px", left: "205px"}}> */}
                    {/* <InputLabel>Title</InputLabel> */}
                    <Input
                    onChange={e => setTitle(e.target.value)}
                    style={{marginBottom: "10px"}}
                    placeholder="Whats the title of your post?"
                    value={title}
                    style={{
                        padding: "20px",
                        display: "flex",
                        flex: "1",
                        marginLeft: "40px",
                        fontSize: "20px",
                        border: "none",
                        width: "90%",
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
                    style={{marginLeft: "380px"}}
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
                                style={{marginRight: "20px"}}
                                to="/">&#128077;
                                </Link>

                                <p>{result.creator}</p>

                                <p
                                onClick={e => navigate(`/post/${result._id}`)}
                                style={{wordWrap:"break-word"}}>{result.title}
                                </p>

                                <Link
                                style={{marginRight:"10px"}}
                                to={`/post/${result._id}/update`}>&#x270E;
                                </Link>

                                <Link
                                onClick={e => deleteHandler(result._id)}
                                to="/home">&#128465;
                                </Link>

                            </div>
                            )
                        })
                    }
                    </div>

        </div>
    )
}

export default Post
