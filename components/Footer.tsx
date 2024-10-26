import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';

const Footer = () =>
{
    return (
        <footer className="bg-gradient-to-br from-cyan-900 via-teal-900 to-purple-900 text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                <span className="text-teal-600 font-bold text-xl">L</span>
                            </div>
                            <span className="text-2xl font-bold">LoanMe</span>
                        </div>
                        <p className="text-gray-300">
                            Making financial freedom accessible to everyone through quick, secure, and hassle-free loans.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaFacebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaYoutube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Loan Products</a></li>
                            <li><a href={"/support"} className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                            <li><a href={"/Blog"} className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-teal-400" />
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-teal-400" />
                                <span className="text-gray-300">support@loanme.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-teal-400" />
                                <span className="text-gray-300">123 Finance Street, NY 10001</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-300 mb-4">Subscribe to get updates on our latest offers!</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                            />
                            <button className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © 2024 LoanMe. All rights reserved.
                        </p>
                        <div className="flex justify-center md:justify-end space-x-6">
                            <a href="/PrivacyPolicy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                            <a href="/TermsOfService" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                            <a href="/LoanAgreement" className="text-gray-400 hover:text-white text-sm transition-colors">Loan Agreement</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;