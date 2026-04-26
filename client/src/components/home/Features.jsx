import { Users, MessageCircle, Heart, Shield, Zap, Globe } from 'lucide-react';

const features = [
    {
        icon: Users,
        title: 'Smart Connections',
        description: 'Our AI-powered algorithm helps you discover people with shared interests and values.',
    },
    {
        icon: MessageCircle,
        title: 'Real-time Messaging',
        description: 'Stay connected with instant messaging, voice notes, and video calls.',
    },
    {
        icon: Heart,
        title: 'Community Building',
        description: 'Create and join communities around your passions and interests.',
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'Your data is yours. We prioritize your privacy and security above all else.',
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Optimized performance ensures smooth scrolling and instant interactions.',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        description: 'Connect with people from around the world in over 50 languages.',
    },
];

export function Features() {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything you need to{' '}
                        <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            stay connected
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to help you build authentic relationships and engage with communities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
