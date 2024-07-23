import React, { useState, useEffect } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { getSingleArticle, getComments, createComment, createCommentsReplies } from '../../app/reducers/app'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const ArticleDetails = () => {
    const timeAgo = new TimeAgo("en-US");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const { id } = useParams()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");

    const handleGetData = async () => {
        try {
            setLoading(true);
            await dispatch(getSingleArticle(id)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    setLoading(false);
                    return;
                }
                setArticle(res.payload);
                setLoading(false);
                return;
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            return;
        }
    };

    const handleGetComments = async () => {
        try {
            setCommentLoading(true);
            await dispatch(getComments(id)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    setCommentLoading(false);
                    return;
                }
                setComments(res.payload);
                setCommentLoading(false);
                return;
            });
        } catch (error) {
            console.error(error);
            setCommentLoading(false);
            return;
        }
    };

    const newComment = async () => {
        try {
            if (
                article && username && email && comment
            ) {
                setCommentLoading(true);
                const data = {
                    articleId: article._id,
                    name: username,
                    email: email,
                    comment: comment,
                };
                await dispatch(createComment(data)).then((res) => {
                    if (res.meta.requestStatus === "rejected") {
                        dispatch(showNotification({ message: "An error occured!", status: 0 }));
                        setCommentLoading(false)
                        return
                    }
                    dispatch(showNotification({ message: "Success!", status: 1 }));
                    setCommentLoading(false)
                    setEmail("");
                    setUsername("");
                    setComment("");
                    handleGetComments()
                }).catch((err) => {
                    console.error(err)
                    setCommentLoading(false)
                })
            } else {
                dispatch(
                    showNotification({ message: "All field are required!", status: 0 })
                );
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const newReply = async (comment) => {
        try {
            if (
                comment && reply
            ) {
                setCommentLoading(true);
                const data = {
                    id: comment._id,
                    newReply: {
                        comment: reply,
                        date: new Date(),
                    },
                };
                await dispatch(createCommentsReplies(data)).then((res) => {
                    if (res.meta.requestStatus === "rejected") {
                        dispatch(showNotification({ message: "An error occured!", status: 0 }));
                        setCommentLoading(false)
                        return
                    }
                    dispatch(showNotification({ message: "Success!", status: 1 }));
                    setCommentLoading(false)
                    handleGetComments()
                }).catch((err) => {
                    console.error(err)
                    setCommentLoading(false)
                })
            } else {
                dispatch(
                    showNotification({ message: "All field are required!", status: 0 })
                );
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {
        handleGetComments();
    }, [article]);

    return (
        <TitleCard
            title={`${article?.title}`}
            topMargin="mt-2"
        >
            <div className='overflow-x-auto w-full'>
                <div className='w-full'>
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${article?.image[0]}`}
                        alt="Image"
                    />
                </div>
                <div className='mt-5'>
                    <p><strong>Category</strong>: {article?.category}</p>
                </div>
                <div className='mt-5'>
                    <div dangerouslySetInnerHTML={{ __html: article?.desc }} />
                </div>

                <div className="mx-auto py-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {commentLoading ? (
                        <p className="py-5">Loading...</p>
                    ) : comments?.map((comment, commentIndex) => (
                        <div key={commentIndex} className="p-4 mb-4 border rounded">
                            <p>{comment.text}</p>
                            <div className="text-sm italic text-gray-500">
                                <span>Name: {comment.name}</span><br />
                                <span>Email: {comment.email}</span>
                            </div>
                            <div className="text-sm italic text-gray-500">
                                <span>Posted: {timeAgo.format(new Date(comment.createdAt))}</span>
                            </div>
                            <textarea className="w-full p-2 border rounded mb-2 mt-2" placeholder="Write a reply..." onChange={(e) => setReply(e.target.value)} />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => newReply(comment)} disabled={commentLoading ? true : false}>Reply</button>
                            {comment.replies.map((reply, replyIndex) => (
                                <div key={replyIndex} className="ml-4 pl-2 border-l mt-0">
                                    <p>{reply.comment}</p>
                                    <div className="text-sm italic text-gray-500">
                                        <span>Replied: {timeAgo.format(new Date(reply.date))}</span>
                                    </div>
                                </div>
                            )).reverse()}
                        </div>
                    )).reverse()}
                    <div>
                        <input type='text' className='w-[49%] p-2 mb-4 mr-2 border rounded' placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type='text' className='w-[50%] p-2 mb-4 border rounded' placeholder="Enter email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <textarea className="w-full p-2 mb-4 border rounded" placeholder="Write a comment..." value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={newComment}> {commentLoading ? "Loading..." : "Post Comment"}</button>
                </div>
            </div>
        </TitleCard>
    )
}

export default ArticleDetails