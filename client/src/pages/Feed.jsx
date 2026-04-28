import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";
import FeedCard from "../components/FeedCard";
import CreatePost from "../components/CreatePost";
import ProfileSidebar from "../components/ProfileSidebar";
import MessagesSidebar from "../components/MessagesSidebar";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ ADDED

    const user = JSON.parse(localStorage.getItem("user"));

    // Fetch Posts
    const fetchPosts = async () => {
        try {
            setLoading(true); 
            const res = await API.get("/posts");
            setPosts(res.data);

        } catch (error) {
            toast.error("Failed to load posts");
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // HANDLE LIKE FUNCTION
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
        <div className="flex max-w-7xl mx-auto mt-10 gap-6 mb-25">

            {/* LEFT SIDEBAR */}
            <div className="w-1/4">
                <ProfileSidebar user={user} />
            </div>

            {/* CENTER FEED */}
            <div className="flex-1 max-w-2xl">
                <CreatePost onPostCreated={fetchPosts} />

                {/* LOADING STATE */}
                {loading ? (
                    <p className="text-center text-gray-500 mt-10">
                        Loading posts...
                    </p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        No posts yet. Start sharing something 🚀
                    </p>
                ) : (
                    posts.map((post) => (
                        <FeedCard
                            key={post._id}
                            post={post}
                            handleLike={handleLike}
                            setPosts={setPosts}
                        />
                    ))
                )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-1/4">
                <MessagesSidebar />
            </div>

        </div>
    );
}

export default Feed;