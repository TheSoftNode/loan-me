import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicyPage = () =>
{
    const sections = [
        {
            icon: <Shield className="h-6 w-6 text-teal-600" />,
            title: "Information We Collect",
            content: [
                "Personal identification information (Name, email address, phone number, etc.)",
                "Financial information (Income, employment details, bank statements)",
                "Technical information (IP address, browser type, device information)",
                "Usage data (How you interact with our services)"
            ]
        },
        {
            icon: <Lock className="h-6 w-6 text-teal-600" />,
            title: "How We Protect Your Data",
            content: [
                "Industry-standard encryption protocols",
                "Regular security audits and updates",
                "Strict access controls and authentication",
                "Secure data storage and transmission"
            ]
        },
        {
            icon: <Eye className="h-6 w-6 text-teal-600" />,
            title: "How We Use Your Information",
            content: [
                "Process loan applications and verify identity",
                "Communicate about your account and services",
                "Improve our products and user experience",
                "Comply with legal and regulatory requirements"
            ]
        },
        {
            icon: <FileText className="h-6 w-6 text-teal-600" />,
            title: "Your Rights",
            content: [
                "Access your personal data",
                "Request data correction or deletion",
                "Opt-out of marketing communications",
                "File a complaint with regulatory authorities"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        At LoanMe, we take your privacy seriously. This policy details how we collect, use, and protect your personal information.
                    </p>
                </div>

                {/* Last Updated */}
                <div className="text-center mb-12">
                    <p className="text-sm text-gray-500">Last Updated: October 26, 2024</p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Key Points Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {sections.map((section, index) => (
                            <Card key={index} className="border border-gray-100">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full p-3 mr-4">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-2">
                                        {section.content.map((item, idx) => (
                                            <li key={idx} className="text-gray-600 flex items-start">
                                                <span className="text-teal-500 mr-2">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Detailed Policy Sections */}
                    <div className="space-y-12 text-gray-700">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
                            <p className="mb-4">
                                This Privacy Policy explains how LoanMe (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, uses, shares, and protects your personal information when you use our website, mobile applications, and services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Information Collection</h2>
                            <p className="mb-4">
                                We collect information you provide directly to us, information we collect automatically when you use our services, and information from third-party sources in accordance with applicable law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Use of Information</h2>
                            <p className="mb-4">
                                We use the information we collect to provide, maintain, and improve our services, to process your loan applications, to communicate with you, and to comply with our legal obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Data Sharing</h2>
                            <p className="mb-4">
                                We may share your information with service providers, financial institutions, regulatory authorities, and other third parties as described in this policy and as required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                Email: privacy@loanme.com
                                <br />
                                Phone: +1 (555) 123-4567
                                <br />
                                Address: 123 Finance Street, NY 10001
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;