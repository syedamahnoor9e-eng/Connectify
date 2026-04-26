import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const onSubmit = async (data) => {
        if (cooldown > 0) return;

        try {
            setLoading(true);
            await API.post("/auth/forgot-password", data);

            if (success) {
                toast.success("Email resent successfully! 🚀");
            } else {
                setSuccess(true);
                toast.success("Instructions sent to your inbox");
            }

            setCooldown(60);
        } catch (err) {
            // Anti-enumeration: doesn't reveal if email exists or not
            setSuccess(true);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20">

                {/* Visual Header Section */}
                <div className="p-8 pb-0 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
                        <KeyRound size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {success
                            ? "Check your inbox for a reset link"
                            : "Enter your email and we'll send you instructions to reset your password."}
                    </p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="py-4 px-6 bg-green-50 border border-green-100 rounded-xl text-green-800 text-sm">
                                Instructions sent! Please check your inbox.
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                {/* Resend */}
                                <button
                                    type="button"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={cooldown > 0 || loading}
                                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {cooldown > 0 ? `Resend link in ${cooldown}s` : "Resend Email"}
                                </button>

                                {/* Fix a mistake */}
                                <button
                                    type="button"
                                    onClick={() => setSuccess(false)}
                                    className="text-indigo-600 text-sm font-medium hover:text-indigo-500 transition-colors"
                                >
                                    Entered the wrong email? <span className="underline">Change it</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register("email")}
                                        className={`w-full pl-11 pr-4 py-3.5 rounded-xl border transition-all outline-none focus:ring-4 ${errors.email ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                            }`}
                                        placeholder="name@company.com"
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-xs text-red-600 font-medium ml-1">{errors.email.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;