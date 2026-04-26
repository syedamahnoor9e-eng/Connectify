function ProfileTabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex border-b mt-6">

            {["posts", "media", "about"].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 capitalize ${activeTab === tab
                            ? "border-b-2 border-black font-semibold"
                            : "text-gray-500"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default ProfileTabs;