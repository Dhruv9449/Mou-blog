import { FaPaperPlane, FaSave } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import TextEditor from "../components/TextEditor";
import Preloader from "./Preloader";
import "../styles/post.css";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';


interface Props {
    edit: boolean;
}


function Post(props: Props) {
    let { slug } = useParams();
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");

    function getContent() {
        return document.getElementsByClassName("ProseMirror")[0].innerHTML.replaceAll(`<br class="ProseMirror-trailingBreak">`, "");
    }

    function setContent(content: string) {
        document.getElementsByClassName("ProseMirror")[0].innerHTML = content;
    }

    function handleSubmit() {
        const URL = "http://localhost:8000/blog";
        if (link === "" || title === "" || getContent() === "") {
            alert("Please fill all the fields");
        }
        else {
            let bodyContent = new FormData();
            bodyContent.append("title", title);
            bodyContent.append("content", getContent());
            bodyContent.append("thumbnail", link);

            let headerList = {
                "Accept": "*/*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }

            fetch(URL, {
                method: "POST",
                headers: headerList,
                body: bodyContent
            })
                .then((res) => {
                    if (res.status < 300) {
                        alert("Post created successfully");
                        window.location.href = "/";
                    }
                    else {
                        res.json().then((data) => {
                            alert(data.error);
                        })
                    }
                })
        }
    }

    const [blogData, setBlogData] = useState({
        title: "",
        id: 1,
        created_on: "",
        thumbnail: "",
        author: { name: "", profile_pic: "" },
        content: "",
        updated_on: ""
    })


    function getBlog() {
        const URL = `http://localhost:8000/blog/${slug}`
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setBlogData(data);
                console.log(data);
                setContent(data.content);
            })
    }

    useEffect(() => {
        if (props.edit) {
            getBlog()
        }
    }, []);


    function handleSave() {
        const URL = `http://localhost:8000/blog/${slug}`
        if (link === "" || title === "" || getContent() === "") {
            alert("Please fill all the fields");
        }
        else {
            let bodyContent = new FormData();
            bodyContent.append("title", title);
            bodyContent.append("content", getContent());
            bodyContent.append("thumbnail", link);

            let headerList = {
                "Accept": "*/*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }

            fetch(URL, {
                method: "PUT",
                headers: headerList,
                body: bodyContent
            })
                .then((res) => {
                    if (res.status < 300) {
                        alert("Post updated successfully");
                        window.location.href = "/";
                    }
                    else {
                        res.json().then((data) => {
                            alert(data.error);
                        })
                    }
                })
        }
    }


    return (
        <div className="page">
            <Preloader />
            <Navbar />
            <div className="newpost">
                <h1> New Post </h1>
                <form action="" method="post">
                    <div className="form-group">
                        <input type="text" name="title" id="title" className="title" defaultValue={props.edit ? blogData.title : "Title"} onChange={event => setTitle(event.target.value)} />
                        <input type="text" name="thumbnail" id="thumbnail" className="thumbnail" defaultValue={props.edit ? blogData.thumbnail : "thumbnail"} onChange={event => setLink(event.target.value)} />
                    </div>
                </form>
                {link.length > 10 ? <img src={link} alt="" className="newpost-thumb-image" /> : null}
                <TextEditor />
                <button type="submit" className="submit-button" onClick={props.edit ? handleSave : handleSubmit}>
                    {props.edit ?
                        <>
                            Save <FaSave />
                        </>
                        :
                        <>
                            Post <FaPaperPlane />
                        </>}
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default Post;