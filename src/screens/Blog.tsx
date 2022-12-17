import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CommentList from "../components/CommentsList";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/blog.css";
import Preloader from "./Preloader";

function Blog() {
    let { slug } = useParams();
    const [blogData, setBlogData] = useState({
        title: "",
        id: 1,
        created_on: "",
        thumbnail: "",
        author: { name: "", profile_pic: "" },
        content: "",
        updated_on: ""
    })

    const URL = `http://localhost:8000/blog/${slug}`

    function getBlog() {
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
            })
    }

    useEffect(() => {
        getBlog();
    }, []);


    function deleteBlog() {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then((res) => {
                    if (res.status < 300) {
                        alert("Post deleted successfully");
                        window.location.href = "/";
                    }
                    else {
                        alert("Something went wrong");
                    }
                }
                )
        }
    }

    return (
        <div className="page">
            <Preloader />
            <Navbar />
            <div className="blog">
                <div className="blog-main">
                    <h1 className="blog-title"> {blogData.title} </h1>
                    <p> {blogData.created_on} </p>
                    <img src={blogData.thumbnail} alt="thumbnail" />
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogData.content }}></div>
                </div>
                <hr></hr>
                <div className="blog-comments">
                    <h2> Comments </h2>
                    <CommentList slug={slug!} />
                </div>
                {localStorage.getItem("role") === "admin" ?
                    <div className="blog-options">
                        <Link to={"/editpost/" + slug}>
                            <button className="edit-blog">
                                <FaEdit /> Edit blog
                            </button>
                        </Link>
                        <button className="delete-blog" onClick={deleteBlog}>
                            <FaTrash /> Delete blog
                        </button>
                    </div>
                    :
                    null
                }
            </div>
            <Footer />
        </div>
    )
}

export default Blog