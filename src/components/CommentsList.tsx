import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import "../styles/commentlist.css"
import Login from "./Login";

interface ReplyBoxProps {
    commentId: number;
    slug: string;
    setComments: Function;
    id: number;
}


function ReplyBox(props: ReplyBoxProps) {
    function handleSubmit() {
        const URL = "http://localhost:8000/blog/" + props.slug + "/comments";
        let content = document.getElementById("comment-" + props.commentId) as HTMLInputElement;
        if (content.value === "") {
            alert("Please fill the comment box");
        }
        else {
            let bodyContent = new FormData();
            bodyContent.append("content", content.value);
            if (props.commentId !== 0) {
                bodyContent.append("parent_id", props.commentId.toString());
            }

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
                        alert("Comment posted successfully");
                        props.setComments([]);
                        content.value = "";
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
        <>
            <div className={props.commentId === 0 ? "reply-box" : "reply-box comment-reply"} id={"reply-box-" + props.id}
                style={props.commentId === 0 ? { display: "flex" } : { display: "none" }}>
                <img src={localStorage.getItem("picture")!} alt="profile picture" referrerPolicy="no-referrer" className="comment-author-image" />
                <input type="text" name="reply" id={"comment-" + props.commentId} placeholder={props.commentId === 0 ? "Add a comment" : "Add a reply"} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }} />
                <button className="send" onClick={handleSubmit}>
                    <FaPaperPlane />
                </button>
            </div>

        </>
    )
}

interface KebabMenuProps {
    slug: string
    id: number
    setComments: Function
}

function KebabMenu(props: KebabMenuProps) {
    function deleteComment() {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            const URL = "http://localhost:8000/blog/" + props.slug + "/comments/" + props.id
            let headerList = {
                "Accept": "*/*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
            fetch(URL, {
                method: "DELETE",
                headers: headerList
            })
                .then((res) => {
                    if (res.status < 300) {
                        alert("Comment deleted successfully");
                        props.setComments([]);
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
        <div className="kebab-menu">
            <SlOptionsVertical />
            <ul className="kebab-menu-list">
                <li className="kebab-menu-item" onClick={deleteComment}>Delete</li>
            </ul>
        </div>
    );
}


interface Props {
    slug: string;
}

function CommentList(props: Props) {
    const [comments, setComments] = useState([
        {
            id: 1, content: "", created_on: "", author: { name: "", picture: "" }, replies: [
                { id: 1, content: "", created_on: "", author: { name: "", picture: "" } }
            ]
        }
    ]);


    function getComments() {
        const URL = "http://localhost:8000/blog/" + props.slug + "/comments";
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setComments(data);
                console.log(data);
            })
    }

    useEffect(() => {
        getComments();
    }, []);


    return (
        <div className="comments">
            {localStorage.getItem("name") !== null ?
                <ReplyBox slug={props.slug} commentId={0} setComments={getComments} id={0} />
                :
                <>
                    <h3> Please log in to comment. </h3>
                </>
            }
            <ul className="comment-list">
                {comments && comments.map((comment) => (
                    <li key={comment.id}>
                        <div className="comment">
                            <img src={comment.author.picture} alt="profile_pic" className="comment-author-image" referrerPolicy="no-referrer" />
                            <div className="comment-text">
                                <h3 className="comment-author">{comment.author.name}</h3>
                                <p className="comment-date">{comment.created_on}</p>
                                <p className="comment-content">{comment.content}</p>
                            </div>
                            <KebabMenu slug={props.slug} id={comment.id} setComments={getComments} />
                        </div>
                        <div className="comment-actions">
                            <button className="reply-button" onClick={() => {
                                let replyBox = document.getElementById("reply-box-" + comment.id) as HTMLDivElement;
                                if (replyBox.style.display === "none") {
                                    replyBox.style.display = "flex";
                                }
                                else {
                                    replyBox.style.display = "none";
                                }
                            }}>Reply</button>

                            {comment.replies !== null ? <button className="show-replies-button" onClick={() => {
                                let replies = document.getElementById("replies-" + comment.id) as HTMLDivElement;
                                if (replies.style.display === "none") {
                                    replies.style.display = "flex";
                                }
                                else {
                                    replies.style.display = "none";
                                }
                            }}>View replies ({comment.replies.length})</button>
                                :
                                null
                            }
                        </div>
                        <ReplyBox slug={props.slug} commentId={comment.id} setComments={getComments} id={comment.id} />
                        <ul className="reply-list" id={"replies-" + comment.id} style={{ display: "none" }}>
                            {comment.replies && comment.replies.map((reply) => (
                                <li key={reply.id}>
                                    <div className="reply">
                                        <img src={reply.author.picture} alt="profile_pic" className="reply-author-image" referrerPolicy="no-referrer" />
                                        <div className="reply-text">
                                            <h3 className="reply-author">{reply.author.name}</h3>
                                            <p className="reply-date">{reply.created_on}</p>
                                            <p className="reply-content">{reply.content}</p>
                                        </div>
                                        <KebabMenu slug={props.slug} id={reply.id} setComments={getComments} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default CommentList