import React, {useState, useEffect} from 'react'
import {navigate} from '@reach/router'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import axios from "axios"


function Post() {
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState("")
    const [results, setResults] = useState([])

    
    const buttonStyle = {
        position:"relative",
        top: "200px",
        right: "899px"
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
        .then(res => setResults(res.data))
        .catch(err => console.log(err))
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/post/add", {
            title: title,
            body:post
        })
        .then(() => navigate("/home"))
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
              errorArr.push(errorResponse[key].message)
            }
            setErrors(errors)
      })

        setPost("")
        setTitle("")
    }


    return (
        <div>
            
                    <TextField
                    label="Make a Post"
                    variant="outlined"
                    size="Large"
                    color="primary"
                    style={{width:"900px",height: "300px", marginLeft: "200px", marginTop:"100px"}}
                    multiline
                    rows={3}
                    boxShadow={3}
                    onChange={e => setPost(e.target.value)}
                    >
                    </TextField>

                    <Button className="post-button"
                    variant="contained"
                    color="primary"
                    style={buttonStyle}
                    onClick={ submitHandler }
                    >Post</Button>

                    <div className="title" style={{position:"relative", bottom:"350px", left: "205px"}}>
                    <InputLabel>Title</InputLabel>
                    <Input  onChange={e => setTitle(e.target.value)}/>
                    </div>

                    
                    <h2
                    style={{position:"relative", bottom: "200px", left: "200px"}}
                    >Feed</h2>

                    <div
                    style={{position:"relative", bottom: "200px", left: "200px"}}
                    >
                        {
                            results.map((result,idx) => {
                                <li>{result.title}</li>
                            })
                        }
                        


                    </div>
              

             


                
            
        </div>
    )
}

export default Post
