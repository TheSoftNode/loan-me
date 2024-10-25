"use client"

import LoanApplication from '@/components/LoanApplication/LoanApplication';
import React from 'react';

type Props = {};

export interface LoanType
{
    id: string;
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    minTerm: number;
    maxTerm: number;
    baseRate: number;
    requirements: string[];
    features: string[];
}

type LoanApplicationProps = {
    loanTypes: LoanType[];
    onSubmit: (applicationData: any) => void;
};

// Mock data for LoanType
const LoanData: LoanApplicationProps = {
    loanTypes: [
        {
            id: 'loan1',
            name: 'Personal Loan',
            description: 'A loan for personal expenses',
            minAmount: 1000,
            maxAmount: 10000,
            minTerm: 12,
            maxTerm: 60,
            baseRate: 5.5,
            requirements: ['Proof of income', 'Credit score check'],
            features: ['Fixed interest rate', 'No early repayment fee'],
        },
        {
            id: 'loan2',
            name: 'Business Loan',
            description: 'A loan for business purposes',
            minAmount: 5000,
            maxAmount: 50000,
            minTerm: 24,
            maxTerm: 120,
            baseRate: 4.5,
            requirements: ['Business plan', 'Financial statements'],
            features: ['Flexible repayment', 'Lower rates for long-term'],
        },
    ],
    onSubmit: (applicationData: any) =>
    {
        console.log("Application Submitted:", applicationData);
        // Additional processing logic can be added here
    },
};

function Page({ }: Props)
{
    return (
        <div>
            <LoanApplication {...LoanData} />
        </div>
    );
}

export default Page;
