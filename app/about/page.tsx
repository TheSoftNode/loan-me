"use client"

import React from 'react';
import { Building2, Users2, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

function AboutPage()
{
    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "$50M+", label: "Loans Processed" },
        { number: "98%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Customer Support" },
    ];

    const values = [
        {
            icon: <Users2 className="h-6 w-6 text-teal-600" />,
            title: "Customer First",
            description: "We prioritize our customers' needs and provide personalized financial solutions."
        },
        {
            icon: <Target className="h-6 w-6 text-teal-600" />,
            title: "Transparency",
            description: "Clear communication and no hidden fees - we believe in complete honesty."
        },
        {
            icon: <Building2 className="h-6 w-6 text-teal-600" />,
            title: "Innovation",
            description: "Leveraging technology to make loan processes faster and more efficient."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 pt-24 pb-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">
                        <h1 className="text-4xl md:text-6xl font-bold text-transparent mb-6">About LoanMe</h1>
                    </div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Transforming the lending industry through technology and trust, making financial freedom accessible to everyone.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mission Statement */}
                <Card className="bg-gradient-to-r from-cyan-500 to-teal-500">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                        <p className="text-white/90 text-lg">
                            To democratize lending by providing accessible, transparent, and fair financial solutions that empower individuals to achieve their goals and secure their future.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AboutPage;