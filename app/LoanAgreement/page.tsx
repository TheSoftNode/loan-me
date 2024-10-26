import React from 'react';
import { DollarSign, Calendar, Percent, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const LoanAgreementPage = () =>
{
    const keyTerms = [
        {
            icon: <DollarSign className="h-6 w-6 text-teal-600" />,
            title: "Loan Amount",
            content: "The principal amount borrowed, as specified in your loan application and approval documents."
        },
        {
            icon: <Percent className="h-6 w-6 text-teal-600" />,
            title: "Interest Rate",
            content: "The annual percentage rate (APR) applied to your loan, including all applicable fees and charges."
        },
        {
            icon: <Calendar className="h-6 w-6 text-teal-600" />,
            title: "Repayment Terms",
            content: "The schedule and method of repayment, including payment amounts, due dates, and term length."
        },
        {
            icon: <FileText className="h-6 w-6 text-teal-600" />,
            title: "Default Terms",
            content: "Conditions that constitute default and the consequences of defaulting on your loan obligations."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-6">
                        Loan Agreement
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        This document outlines the terms and conditions of your loan with LoanMe. Please read carefully before accepting.
                    </p>
                </div>

                {/* Last Updated */}
                <div className="text-center mb-12">
                    <p className="text-sm text-gray-500">Last Updated: October 26, 2024</p>
                </div>

                {/* Key Terms */}
                <div className="max-w-4xl mx-auto mb-16 grid md:grid-cols-2 gap-6">
                    {keyTerms.map((term, index) => (
                        <Card key={index} className="border border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full p-3 mr-4">
                                        {term.icon}
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">{term.title}</h2>
                                </div>
                                <p className="text-gray-600">{term.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Detailed Agreement Sections */}
                <div className="max-w-4xl mx-auto space-y-12 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Definitions</h2>
                        <p className="mb-4">
                            In this Agreement, unless the context otherwise requires:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>&ldquo;Lender&rdquo; refers to LoanMe, its successors and assigns</li>
                            <li>&ldquo;Borrower&rdquo; refers to the individual or entity receiving the loan</li>
                            <li>&ldquo;Loan&rdquo; refers to the principal amount borrowed plus any accrued interest</li>
                            <li>&ldquo;Payment Date&rdquo; refers to the scheduled date for loan repayment installments</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Loan Terms</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-800">2.1 Principal Amount</h3>
                            <p className="text-gray-600">
                                The principal amount of the loan shall be as specified in the loan approval documentation. This amount will be disbursed to the Borrower&apos;s designated bank account upon completion of all required documentation and approvals.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800">2.2 Interest Rate</h3>
                            <p className="text-gray-600">
                                Interest shall accrue on the principal amount at the rate specified in the loan approval documentation. The interest rate is fixed for the duration of the loan term unless otherwise specified.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800">2.3 Repayment Schedule</h3>
                            <p className="text-gray-600">
                                The Borrower agrees to repay the loan in regular installments as specified in the repayment schedule. Each payment shall include both principal and interest.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Fees and Charges</h2>
                        <p className="mb-4">
                            The following fees and charges may apply to your loan:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Origination fee: Up to 5% of the loan amount</li>
                            <li>Late payment fee: $35 or 5% of the missed payment, whichever is greater</li>
                            <li>Returned payment fee: $25 per occurrence</li>
                            <li>Early repayment fee: None - you may repay your loan early without penalty</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Default</h2>
                        <p className="mb-4">
                            The following events constitute default under this Agreement:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Failure to make any payment when due</li>
                            <li>Providing false or misleading information</li>
                            <li>Filing for bankruptcy or insolvency</li>
                            <li>Death or incapacity of the Borrower</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Rights and Remedies</h2>
                        <p className="mb-4">
                            Upon default, the Lender may:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Declare the entire unpaid balance immediately due and payable</li>
                            <li>Pursue legal action to collect the debt</li>
                            <li>Report the default to credit bureaus</li>
                            <li>Exercise any other rights available under applicable law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Contact Information</h2>
                        <p className="mb-4">
                            For questions about your loan agreement or to report issues, contact us at:
                            <br />
                            Email: loans@loanme.com
                            <br />
                            Phone: +1 (555) 123-4567
                            <br />
                            Address: 123 Finance Street, NY 10001
                        </p>
                    </section>

                    {/* Agreement Acceptance */}
                    <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Agreement Acceptance</h2>
                        <p className="text-gray-600 mb-4">
                            By proceeding with the loan application, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions outlined in this Loan Agreement.
                        </p>
                        <div className="flex items-center justify-end space-x-4">
                            <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                                Download PDF
                            </button>
                            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 transition-opacity">
                                Accept Agreement
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LoanAgreementPage;