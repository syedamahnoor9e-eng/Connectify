import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";
import FeedCard from "../components/FeedCard";
import CreatePost from "../components/CreatePost";
import ProfileSidebar from "../components/ProfileSidebar";
import MessagesSidebar from "../components/MessagesSidebar";
import { Loader2 } from "lucide-react"; 

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

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
        <div className="min-h-screen bg-gray-50 pt-20 pb-10"> 
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-8">

                <div className="hidden lg:block w-1/4 sticky top-24 h-fit">
                    <ProfileSidebar user={user} postsCount={posts.length} />
                </div>

                <main className="flex-1 max-w-2xl mx-auto w-full">
                    <div className="mb-6">
                        <CreatePost onPostCreated={fetchPosts} />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                            <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-2" />
                            <p className="font-medium">Curating your feed...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border mt-6">
                            <p className="text-gray-500 text-lg">
                                No posts yet. Start sharing something 🚀
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6"> 
                            {posts.map((post) => (
                                <FeedCard
                                    key={post._id}
                                    post={post}
                                    handleLike={handleLike}
                                    setPosts={setPosts}
                                />
                            ))}
                        </div>
                    )}
                </main>

                <div className="hidden xl:block w-1/4 sticky top-24 h-fit">
                    <MessagesSidebar />
                </div>

            </div>
        </div>
    );
}

export default Feed;