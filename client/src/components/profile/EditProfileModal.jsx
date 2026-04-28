import { X, Camera, MapPin, Link as LinkIcon, Briefcase, GraduationCap } from "lucide-react";

function EditProfileModal({ form, setForm, setFile, setCoverFile, onSave, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-100 px-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 custom-scrollbar">

                    {/* Image Upload Section */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Camera size={16} /> Profile Picture
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Camera size={16} /> Cover Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setCoverFile(e.target.files[0])}
                                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <input
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm transition-all"
                        />

                        <textarea
                            placeholder="Tell us about yourself..."
                            value={form.bio}
                            rows={3}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm transition-all resize-none"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                                <input
                                    placeholder="Location"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm"
                                />
                            </div>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3 text-gray-400" size={16} />
                                <input
                                    placeholder="Website"
                                    value={form.website}
                                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                                    className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
                            <input
                                placeholder="Work / Occupation"
                                value={form.work}
                                onChange={(e) => setForm({ ...form, work: e.target.value })}
                                className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm"
                            />
                        </div>

                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-3 text-gray-400" size={16} />
                            <input
                                placeholder="Education"
                                value={form.education}
                                onChange={(e) => setForm({ ...form, education: e.target.value })}
                                className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm"
                            />
                        </div>

                        <input
                            placeholder="Interests (e.g. Coding, Music, Travel)"
                            value={form.interests?.join(", ")}
                            onChange={(e) => setForm({ ...form, interests: e.target.value.split(",").map(i => i.trim()) })}
                            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-8 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;