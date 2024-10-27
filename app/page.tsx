import { ArrowRight, Clock, DollarSign, Shield } from "lucide-react";
import Link from "next/link";

export default function Home()
{
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-teal-500 to-purple-600">
        {/* Hero Section - Adjusted padding to account for fixed navbar */}
        <div className="container mx-auto px-4 pt-24 md:pt-32 pb-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white">
              Welcome to LoanMe
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-50 mb-6 md:mb-8 px-4">
              Fast, secure, and hassle-free loans at your fingertips
            </p>
            <button className="w-full sm:w-auto bg-white text-teal-600 px-6 sm:px-8 py-3 rounded-full font-semibold flex items-center justify-center mx-auto hover:bg-cyan-50 transition-colors">
              <Link href={"/Dashboard"}>
                Get Started
              </Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mt-8 md:mt-16 px-4">
            <div className="bg-gradient-to-br from-white/20 to-purple-400/20 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center border border-white/10">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-white">Quick Approval</h3>
              <p className="text-cyan-50 text-sm md:text-base">Get loan approval in as fast as 24 hours</p>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-purple-400/20 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center border border-white/10">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-white">Secure Process</h3>
              <p className="text-cyan-50 text-sm md:text-base">Bank-grade security for your peace of mind</p>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-purple-400/20 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center border border-white/10 sm:col-span-2 md:col-span-1">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <DollarSign className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-white">Competitive Rates</h3>
              <p className="text-cyan-50 text-sm md:text-base">Transparent pricing with no hidden fees</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-8 md:mt-16 pb-8 md:pb-16">
            <p className="text-sm md:text-base text-cyan-50 mb-3 md:mb-4">Trusted by over 100,000 customers</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
              <div className="bg-gradient-to-r from-green-400/20 to-teal-400/20 backdrop-blur-lg rounded-full px-4 py-2 text-sm md:text-base border border-white/10">
                ★★★★★ 4.8/5
              </div>
              <div className="bg-gradient-to-r from-green-400/20 to-teal-400/20 backdrop-blur-lg rounded-full px-4 py-2 text-sm md:text-base border border-white/10">
                Licensed Lender
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
