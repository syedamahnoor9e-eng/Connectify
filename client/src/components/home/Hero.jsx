import { ArrowRight, Play } from "lucide-react";

export function Hero() {
    return (
        <section className="pt-40 pb-35">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                <div className="space-y-6">
                    <h1 className="text-6xl font-bold">
                        Connect with people who{" "}
                        <span className="text-purple-600">matter</span>
                    </h1>

                    <p className="text-xl text-gray-600">
                        Connectify helps you build genuine relationships with people who truly matter.
                        Discover communities, share your thoughts, and stay connected with friends,
                        creators, and professionals — all in one place.
                    </p>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg flex gap-2">
                            Start Connecting <ArrowRight size={18} />
                        </button>

                        <button className="px-6 py-3 border flex gap-2 rounded-lg">
                            <Play size={18} /> Watch Demo
                        </button>
                    </div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1573152143286-0c422b4d2175"
                    className="rounded-2xl shadow-xl"
                />
            </div>
        </section>
    );
}