import React from 'react';
import { Scale, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const TermsOfServicePage = () =>
{
    const keyPoints = [
        {
            icon: <Scale className="h-6 w-6 text-teal-600" />,
            title: "Service Terms",
            content: "By accessing our services, you agree to these terms and conditions. Our services are subject to eligibility requirements and applicable laws."
        },
        {
            icon: <AlertCircle className="h-6 w-6 text-teal-600" />,
            title: "User Responsibilities",
            content: "You must provide accurate information, maintain account security, and use our services in compliance with all applicable laws and regulations."
        },
        {
            icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
            title: "Account Terms",
            content: "You must be 18 or older to use our services. Each user is limited to one account unless explicitly authorized otherwise."
        },
        {
            icon: <Shield className="h-6 w-6 text-teal-600" />,
            title: "Security",
            content: "You are responsible for maintaining the confidentiality of your account credentials and must notify us immediately of any unauthorized access."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Please read these terms carefully before using LoanMe&apos;s services. By using our services, you agree to be bound by these terms.
                    </p>
                </div>

                {/* Last Updated */}
                <div className="text-center mb-12">
                    <p className="text-sm text-gray-500">Last Updated: October 26, 2024</p>
                </div>

                {/* Key Points */}
                <div className="max-w-4xl mx-auto mb-16 grid md:grid-cols-2 gap-6">
                    {keyPoints.map((point, index) => (
                        <Card key={index} className="border border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full p-3 mr-4">
                                        {point.icon}
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">{point.title}</h2>
                                </div>
                                <p className="text-gray-600">{point.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Detailed Terms */}
                <div className="max-w-4xl mx-auto space-y-12 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing or using LoanMe&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Eligibility</h2>
                        <p className="mb-4">
                            To be eligible for our services, you must:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Be at least 18 years old</li>
                            <li>Be a legal resident of the United States</li>
                            <li>Have a valid Social Security number</li>
                            <li>Have a regular source of income</li>
                            <li>Have an active bank account</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Account Registration</h2>
                        <p className="mb-4">
                            When you create an account with us, you must provide accurate, complete, and current information. Any false or misleading information may result in immediate termination of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Service Modifications</h2>
                        <p className="mb-4">
                            We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Termination</h2>
                        <p className="mb-4">
                            We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Contact Information</h2>
                        <p className="mb-4">
                            If you have any questions about these Terms of Service, please contact us at:
                            <br />
                            Email: legal@loanme.com
                            <br />
                            Phone: +1 (555) 123-4567
                            <br />
                            Address: 123 Finance Street, NY 10001
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;