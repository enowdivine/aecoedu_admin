import React, { useState, useEffect } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { getSingleArticle } from '../../app/reducers/app'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ArticleDetails = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);
    const { id } = useParams()

    const handleGetData = async () => {
        try {
            await dispatch(getSingleArticle(id)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    setLoading(false);
                    return;
                }
                setArticle(res.payload);
                return;
            });
        } catch (error) {
            console.error(error);
            return;
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const [comments, setComments] = useState([
        {
            text: "This is really cool",
            name: "Enow Divine",
            email: "sirdivine16@gmail.com",
            replies: [{
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            },
            {
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            },
            {
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            }],
        },
        {
            text: "This is really cool",
            name: "Enow Divine",
            email: "sirdivine16@gmail.com",
            replies: [],
        },
        {
            text: "This is really cool",
            name: "Enow Divine",
            email: "sirdivine16@gmail.com",
            replies: [{
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            }, {
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            }, {
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            }],
        },
        {
            text: "This is really cool",
            name: "Enow Divine",
            email: "sirdivine16@gmail.com",
            replies: [{
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            },
            {
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            }],
        },
        {
            text: "This is really cool",
            name: "Enow Divine",
            email: "sirdivine16@gmail.com",
            replies: [],
        },
        {
            text: "This is really cool",
            name: "Enow Divine",
            email: "sirdivine16@gmail.com",
            replies: [{
                text: "This is really cool",
                name: "Enow Divine",
                email: "sirdivine16@gmail.com",
            }],
        }
    ]);

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
                    {comments.map((comment, commentIndex) => (
                        <div key={commentIndex} className="p-4 mb-4 border rounded">
                            <p>{comment.text}</p>
                            <div className="text-sm italic text-gray-500">
                                <span>Name: {comment.name}</span><br />
                                <span>Email: {comment.email}</span>
                            </div>
                            <div className="text-sm italic text-gray-500">
                                <span>Replied: 3 Days Ago</span>
                            </div>
                            <textarea className="w-full p-2 border rounded mb-2 mt-2" placeholder="Write a reply..." />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Reply</button>
                            {comment.replies.map((reply, replyIndex) => (
                                <div key={replyIndex} className="ml-4 pl-2 border-l mt-0">
                                    <p>{reply.text}</p>
                                    {/* <div className="text-sm italic text-gray-500">
                                        <span>Name: {reply.name}</span><br />
                                        <span>Email: {reply.email}</span>
                                    </div> */}
                                    <div className="text-sm italic text-gray-500">
                                        <span>Replied: 3 Days Ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div>
                        <input type='text' className='w-[49%] p-2 mb-4 mr-2 border rounded' placeholder="Enter name" />
                        <input type='text' className='w-[50%] p-2 mb-4 border rounded' placeholder="Enter email" />
                    </div>
                    <textarea className="w-full p-2 mb-4 border rounded" placeholder="Write a comment..." />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Post Comment</button>
                </div>
            </div>
        </TitleCard>
    )
}

export default ArticleDetails