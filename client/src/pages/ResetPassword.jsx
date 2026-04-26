import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import API from "../api/axiosInstance";

// Advanced Schema for strict validation and matching
const schema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[0-9]/, "Must contain one number")
        .regex(/[^a-zA-Z0-9]/, "Must contain one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Refs for keyboard navigation
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    // Extract refs and fields from react-hook-form to merge with local refs
    const { ref: registerPasswordRef, ...passwordFields } = register("password");
    const { ref: registerConfirmRef, ...confirmFields } = register("confirmPassword");

    const passwordValue = watch("password", "");

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await API.post(`/auth/reset-password/${token}`, { password: data.password });
            toast.success("Security updated! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Link expired or invalid");
        } finally {
            setLoading(false);
        }
    };

    // Advanced Keyboard Navigation
    const handleKeyDown = (e, nextRef, prevRef) => {
        if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            nextRef?.current?.focus();
        } else if (e.key === "ArrowUp") {
            if (prevRef) {
                e.preventDefault();
                prevRef.current?.focus();
            }
        }
    };

    // Strength Meter Logic
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength += 25;
        if (/[A-Z]/.test(pass)) strength += 25;
        if (/[0-9]/.test(pass)) strength += 25;
        if (/[^a-zA-Z0-9]/.test(pass)) strength += 25;
        return strength;
    };

    const strength = getStrength(passwordValue);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20">

                {/* Header */}
                <div className="p-8 pb-0 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Set New Password</h2>
                    <p className="mt-2 text-sm text-gray-500">Secure your account with a strong password.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">

                    {/* New Password Field */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Create Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                {...passwordFields}
                                type={showPassword ? "text" : "password"}
                                ref={(e) => {
                                    registerPasswordRef(e);
                                    passwordRef.current = e;
                                }}
                                onKeyDown={(e) => handleKeyDown(e, confirmRef, null)}
                                className={`w-full pl-11 pr-12 py-3.5 rounded-xl border transition-all outline-none focus:ring-4 ${errors.password ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                    }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Dynamic Strength Meter */}
                        {passwordValue && (
                            <div className="mt-3 px-1 animate-in fade-in duration-300">
                                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                                    <span className={strength <= 25 ? "text-red-500" : strength <= 75 ? "text-yellow-500" : "text-green-500"}>
                                        {strength <= 25 ? "Weak" : strength <= 75 ? "Moderate" : "Strong"}
                                    </span>
                                    <span className="text-gray-400">{strength}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-700 ease-out ${strength <= 25 ? "bg-red-500" : strength <= 75 ? "bg-yellow-500" : "bg-green-500"
                                            }`}
                                        style={{ width: `${strength}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        {errors.password && <p className="mt-2 text-xs text-red-600 font-medium ml-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Confirm Security</label>
                        <div className="relative">
                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                {...confirmFields}
                                type={showPassword ? "text" : "password"} // Synced with first field
                                ref={(e) => {
                                    registerConfirmRef(e);
                                    confirmRef.current = e;
                                }}
                                onKeyDown={(e) => handleKeyDown(e, null, passwordRef)}
                                className={`w-full pl-11 pr-12 py-3.5 rounded-xl border transition-all outline-none focus:ring-4 ${errors.confirmPassword ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                    }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="mt-2 text-xs text-red-600 font-medium ml-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                    >
                        {loading ? "Updating Security..." : "Reset Password"}
                    </button>
                </form>

                {/* Footer Section */}
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

export default ResetPassword;