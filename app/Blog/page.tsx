"use client"

import React, { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Shield, DollarSign, PiggyBank } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogPage = () =>
{
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Posts', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'financial-tips', name: 'Financial Tips', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'loan-advice', name: 'Loan Advice', icon: <DollarSign className="w-4 h-4" /> },
        { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
        { id: 'savings', name: 'Savings', icon: <PiggyBank className="w-4 h-4" /> },
    ];

    const blogPosts = [
        {
            id: 1,
            title: "How to Improve Your Credit Score in 2024",
            excerpt: "Discover the most effective strategies to boost your credit score and unlock better loan terms...",
            category: "financial-tips",
            author: "Sarah Johnson",
            date: "Oct 25, 2024",
            readTime: "5 min read",
            image: "/api/placeholder/800/400",
            featured: true
        },
        {
            id: 2,
            title: "Understanding Personal Loan Interest Rates",
            excerpt: "Everything you need to know about how personal loan interest rates are calculated and what affects them...",
            category: "loan-advice",
            author: "Michael Chen",
            date: "Oct 24, 2024",
            readTime: "8 min read",
            image: "/api/placeholder/800/400",
            featured: true
        },
        // Add more blog posts here...
        {
            id: 3,
            title: "5 Smart Ways to Save for a Down Payment",
            excerpt: "Practical tips and strategies to help you save effectively for your next big purchase...",
            category: "savings",
            author: "Emily Wilson",
            date: "Oct 23, 2024",
            readTime: "6 min read",
            image: "/api/placeholder/800/400"
        },
        {
            id: 4,
            title: "Protecting Your Financial Information Online",
            excerpt: "Essential cybersecurity tips to keep your financial data safe in the digital age...",
            category: "security",
            author: "David Kumar",
            date: "Oct 22, 2024",
            readTime: "7 min read",
            image: "/api/placeholder/800/400"
        },
        {
            id: 5,
            title: "Debt Consolidation: Is It Right for You?",
            excerpt: "An in-depth look at the pros and cons of debt consolidation and when it makes sense...",
            category: "loan-advice",
            author: "Rachel Martinez",
            date: "Oct 21, 2024",
            readTime: "10 min read",
            image: "/api/placeholder/800/400"
        },
        {
            id: 6,
            title: "Emergency Fund Basics: How Much Should You Save?",
            excerpt: "Learn how to build and maintain an emergency fund that fits your lifestyle...",
            category: "savings",
            author: "Tom Anderson",
            date: "Oct 20, 2024",
            readTime: "4 min read",
            image: "/api/placeholder/800/400"
        }
    ];

    const filteredPosts = blogPosts
        .filter(post =>
            (selectedCategory === 'all' || post.category === selectedCategory) &&
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    const featuredPosts = blogPosts.filter(post => post.featured);

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-6">
                        LoanMe Blog
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Expert insights, financial tips, and guides to help you make informed decisions about your money.
                    </p>
                </div>

                {/* Featured Posts Slider */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Articles</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredPosts.map(post => (
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardContent className="p-0">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 mb-3">
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {post.date}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">By {post.author}</span>
                                            <Button
                                                variant="ghost"
                                                className="text-teal-600 hover:text-teal-700 flex items-center"
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Search and Categories */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    className={`flex items-center space-x-2 ${selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                                            : 'text-gray-600'
                                        }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.icon}
                                    <span>{category.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(post => (
                        <Card key={post.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 mb-3">
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {post.date}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">By {post.author}</span>
                                        <Button
                                            variant="ghost"
                                            className="text-teal-600 hover:text-teal-700 flex items-center"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Newsletter Subscription */}
                <Card className="mt-16 bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
                    <CardContent className="p-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
                            <p className="mb-6">Subscribe to our newsletter for the latest financial tips and insights.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                />
                                <Button className="bg-white text-teal-600 hover:bg-gray-50">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BlogPage;