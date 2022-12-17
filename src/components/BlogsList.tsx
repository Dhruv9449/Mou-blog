import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/bloglist.css";

function BlogsList() {
    const [blogs, setBlogs] = useState([
        { title: "", id: 1, created_on: "", thumbnail: "", author: { name: "", profile_pic: "" } },
    ]);

    function getBlogs() {
        const URL = "http://localhost:8000/blog"
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                console.log(data);
            })
    }

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <div className="bloglist">
            <ul>
                {blogs && blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blog/${blog.title.split(" ").join("-")}`} key={blog.id}>
                            <div className="card">
                                <img src={blog.thumbnail} alt="thumbnail" className="card-image" />
                                <div className="card-text">
                                    <h2>{blog.title}</h2>
                                    <p>{blog.created_on}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogsList;