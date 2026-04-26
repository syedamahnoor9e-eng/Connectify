export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-linear-to-brrom-purple-600 to-pink-600 rounded-lg"></div>
                            <span className="text-xl font-bold text-white">Connectify</span>
                        </div>
                        <p className="text-sm">
                            Building meaningful connections, one conversation at a time.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Download</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Updates</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-sm text-center">
                    <p>© 2026 Connectify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
