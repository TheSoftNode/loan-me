"use client"
import React, { useState, FormEvent } from 'react';
import { User, Mail, Lock, Upload } from 'lucide-react';
import Link from 'next/link';


interface FormElements extends HTMLFormControlsCollection
{
    email: HTMLInputElement;
    password: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    termsAccepted: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement
{
    readonly elements: FormElements;
}

const RegisterPage: React.FC = () =>
{
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleSubmit = (e: FormEvent<RegisterFormElement>) =>
    {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-teal-500 to-purple-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-white/20 to-purple-400/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-cyan-50 text-sm">First Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                        placeholder="John"
                                    />
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-cyan-50 text-sm">Last Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                        placeholder="Doe"
                                    />
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-cyan-50 text-sm">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                    placeholder="john.doe@example.com"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-cyan-50 text-sm">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                                    placeholder="Create a strong password"
                                />
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-cyan-50 text-sm">ID Verification</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full bg-white/10 border border-white/20 border-dashed rounded-lg px-4 py-4 text-cyan-50 hover:bg-white/20 transition-colors flex flex-col items-center gap-2"
                                >
                                    <Upload className="h-6 w-6" />
                                    <span>Upload ID Document</span>
                                    <span className="text-xs text-white/50">Supported: PDF, JPG, PNG (max 5MB)</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 text-sm">
                            <input type="checkbox" name="termsAccepted" className="mt-1" />
                            <label className="text-cyan-50">
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-teal-600 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-colors flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <Link
                            href={"/Login"}
                            type="button"
                            className="w-full flex items-center justify-center text-cyan-50 hover:text-white"
                        >
                            Already have an account? Sign in
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;