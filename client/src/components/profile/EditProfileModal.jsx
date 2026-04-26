function EditProfileModal({ form, setForm, setFile, setCoverFile, onSave, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg w-125">

                <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border p-2 mb-2"
                />

                <textarea
                    placeholder="Bio"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full border p-2 mb-2"
                />

                <input
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border p-2 mb-2"
                />

                <input
                    placeholder="Website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full border p-2 mb-2"
                />

                {/* ABOUT */}
                <input
                    placeholder="Work"
                    onChange={(e) => setForm({ ...form, work: e.target.value })}
                    className="w-full border p-2 mb-2"
                />

                <input
                    placeholder="Education"
                    onChange={(e) => setForm({ ...form, education: e.target.value })}
                    className="w-full border p-2 mb-2"
                />

                <input
                    placeholder="Interests (comma separated)"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            interests: e.target.value.split(","),
                        })
                    }
                    className="w-full border p-2 mb-2"
                />

                {/* FILES */}
                <label>Profile Image</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <label>Cover Image</label>
                <input type="file" onChange={(e) => setCoverFile(e.target.files[0])} />

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onSave} className="bg-blue-500 text-white px-4 py-1 rounded">
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EditProfileModal;