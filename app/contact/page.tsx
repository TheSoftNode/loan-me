"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactPage() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Message sent successfully!');
    // Add your form submission logic here
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-teal-600" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <Mail className="h-6 w-6 text-teal-600" />,
      title: "Email",
      details: "support@loanme.com",
      link: "mailto:support@loanme.com"
    },
    {
      icon: <MapPin className="h-6 w-6 text-teal-600" />,
      title: "Office",
      details: "123 Finance Street, NY 10001",
      link: "https://maps.google.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent mb-6">Contact Us</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.a
              href={info.link}
              key={index}
              className="block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white shadow-lg border border-gray-100">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-gray-600">{info.details}</p>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto bg-white shadow-lg border border-gray-100">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-32"
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
              {formStatus && (
                <p className="text-center text-teal-600 mt-4">{formStatus}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ContactPage;