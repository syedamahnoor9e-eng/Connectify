import { LayoutDashboard, MessageSquare, PlusSquare, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BottomNav() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    return (
        <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4">
            <button onClick={() => navigate("/")} className="flex flex-col items-center text-gray-600">
                <Home size={24} />
                <span className="text-[10px]">Home</span>
            </button>
            <button onClick={() => navigate("/messages")} className="flex flex-col items-center text-gray-600">
                <MessageSquare size={24} />
                <span className="text-[10px]">Messages</span>
            </button>
            <button className="flex flex-col items-center text-purple-600">
                <PlusSquare size={28} />
            </button>
            <button onClick={() => navigate(`/profile/${userId}`)} className="flex flex-col items-center text-gray-600">
                <LayoutDashboard size={24} />
                <span className="text-[10px]">Profile</span>
            </button>
        </div>
    );
}