"use client"

import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Fingerprint } from 'lucide-react';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';



interface SocialButtonProps
{
    Icon: React.ElementType;
    label: string;
}

const LoginPage: React.FC = () =>
{
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>
    {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br mt-6 from-cyan-500 via-teal-500 to-purple-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-white/20 to-purple-400/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-cyan-50 text-sm">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                    placeholder="Enter your email"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-cyan-50 text-sm">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                    placeholder="Enter your password"
                                />
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                            </div>
                        </div>

                        {/* Biometric Login Option - Only shown on mobile */}
                        <button
                            type="button"
                            className="w-full md:hidden bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                        >
                            <Fingerprint className="h-5 w-5" />
                            Use Biometric Login
                        </button>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-cyan-50">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <Link
                                type="button"
                                href={"/ResetPassword"}
                                className="text-cyan-50 hover:text-white"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-teal-600 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-colors flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-cyan-50 bg-gradient-to-br from-cyan-500 via-teal-500 to-purple-600">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { Icon: FaGoogle, label: 'Google' },
                                { Icon: FaGithub, label: 'GitHub' },
                                { Icon: FaFacebookF, label: 'Facebook' }
                            ].map(({ Icon, label }: SocialButtonProps) => (
                                <button
                                    key={label}
                                    type="button"
                                    className="flex items-center justify-center py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                                >
                                    <Icon className="h-5 w-5 text-white" />
                                </button>
                            ))}
                        </div>

                        <Link
                            href={"/Register"}
                            type="button"
                            className="w-full flex items-center justify-center text-cyan-50 hover:text-white mt-4"
                        >
                            Don&apos;t have an account? Sign up
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;