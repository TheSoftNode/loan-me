"use client"

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () =>
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navs = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.a
                            href={"/"}
                            className="bg-white rounded-full w-8 h-8 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="text-teal-600 font-bold text-xl">L</span>
                        </motion.a>
                        <span className="text-2xl font-bold text-white">LoanMe</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navs.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white/90 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Login/Register Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <motion.button
                            className="text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/Login">
                                Login
                            </Link>
                            <motion.span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-white/90 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.button>
                        <motion.button
                            className="bg-white text-teal-600 px-4 py-2 rounded-full hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/Register">
                                Register
                            </Link>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Menu className="h-6 w-6" />
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        height: isMenuOpen ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="px-4 py-2 space-y-3">
                        {navs.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="block text-white relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white/90"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                        <div className="border-t border-white/10 pt-2 pb-4 space-y-3">
                            <motion.button
                                className="block w-full text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href="/Login">
                                    Login
                                </Link>
                            </motion.button>
                            <motion.button
                                className="block w-full bg-white text-teal-600 px-4 py-2 rounded-full hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href="/Register">
                                    Register
                                </Link>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </nav >
    );
};

export default Navbar;