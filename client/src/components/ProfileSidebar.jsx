import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="w-70 mt-38 mr-20 fixed">

            <div className="bg-white p-4 rounded-xl shadow">

                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate(`/profile/${user._id}`)}
                >
                    <img
                        src={user.profilePic || "/avatar.png"}
                        className="w-14 h-14 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-4 text-center text-sm">
                    <div>
                        <p className="font-bold">{user.posts || 0}</p>
                        <p className="text-gray-500">Posts</p>
                    </div>
                    <div>
                        <p className="font-bold">{user.followers?.length || 0}</p>
                        <p className="text-gray-500">Followers</p>
                    </div>
                    <div>
                        <p className="font-bold">{user.following?.length || 0}</p>
                        <p className="text-gray-500">Following</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
                >
                    Edit Profile
                </button>

            </div>

        </div>
    );
};

export default ProfileSidebar;