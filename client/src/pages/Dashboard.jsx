import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5000/api/users/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(res.data);
            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="text-center mt-10">
            {user ? (
                <>
                    <h1 className="text-2xl">Welcome {user.name} 👋</h1>
                    <p className="text-lg">{user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;