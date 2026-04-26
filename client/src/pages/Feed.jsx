import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";
import FeedCard from "../components/FeedCard";
import CreatePost from "../components/CreatePost";

function Feed() {
    const [posts, setPosts] = useState([])

    //Fetch Posts
    const fetchPosts = async () => {
        try {
            const res = await API.get("/posts")
            setPosts(res.data)
        } catch (error) {
            toast.error("Failed to load posts");
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    //HANDLE LIKE FUNCTION
    const handleLike = async (postId) => {
        try {
            const userId = localStorage.getItem("userId");

            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post._id === postId) {

                        const alreadyLiked = post.likes
                            .map(id => id.toString())
                            .includes(userId);

                        return {
                            ...post,
                            likes: alreadyLiked
                                ? post.likes.filter(id => id.toString() !== userId)
                                : [...post.likes, userId],
                        };
                    }
                    return post;
                })
            );

            const res = await API.put(`/posts/${postId}/like`);

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId ? res.data : post
                )
            );

        } catch (err) {
            toast.error("Failed to like post");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-4 mt-25">

            <CreatePost onPostCreated={fetchPosts} />

            {posts.length == 0 ? (
                <p>No posts yet</p>
            ) : (
                posts.map((post) => (
                    <FeedCard key={post._id} post={post} handleLike={handleLike} setPosts={setPosts} />
                ))
            )}
        </div>
    );

}
export default Feed;