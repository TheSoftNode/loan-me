
import React, { useState } from 'react';
import
{
    Calculator,
    ChevronRight,
    Clock,
    DollarSign,
    FileText,
    Info,
    CheckCircle2,
    AlertCircle,
    BadgeCheck,
    Shield
} from 'lucide-react';
import
{
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import
{
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Alert, AlertDescription } from "../ui/alert";
import { Progress } from "../ui/progress";

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

interface LoanApplicationProps
{
    loanTypes: LoanType[];
    onSubmit: (applicationData: any) => void;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ loanTypes, onSubmit }) =>
{
    const [step, setStep] = useState<number>(1);
    const [selectedLoan, setSelectedLoan] = useState<LoanType | null>(null);
    const [formData, setFormData] = useState({
        amount: '',
        term: '',
        purpose: '',
        employment: '',
        income: '',
    });

    const calculateMonthlyPayment = (amount: number, rate: number, months: number): number =>
    {
        const monthlyRate = rate / 100 / 12;
        return (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    };

    const renderLoanSelection = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanTypes.map((loan) => (
                <Card
                    key={loan.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${selectedLoan?.id === loan.id ? 'ring-2 ring-blue-600' : ''
                        }`}
                    onClick={() => setSelectedLoan(loan)}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {loan.name}
                            {selectedLoan?.id === loan.id && (
                                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            )}
                        </CardTitle>
                        <CardDescription>{loan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Amount Range</span>
                                <span className="font-medium">
                                    ${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Interest Rate</span>
                                <span className="font-medium">From {loan.baseRate}% APR</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Term Range</span>
                                <span className="font-medium">{loan.minTerm} - {loan.maxTerm} months</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-2">
                                <BadgeCheck className="h-4 w-4 text-green-600" />
                                <span className="text-sm">Quick approval process</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">Secure application</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

    const renderLoanCalculator = () => (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Loan Calculator</CardTitle>
                <CardDescription>
                    Estimate your monthly payments based on your loan amount and term
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label>Loan Amount</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                className="pl-10"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                min={selectedLoan?.minAmount}
                                max={selectedLoan?.maxAmount}
                            />
                        </div>
                        <Progress
                            value={(Number(formData.amount) / (selectedLoan?.maxAmount || 1)) * 100}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>Loan Term (months)</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                className="pl-10"
                                placeholder="Enter term"
                                value={formData.term}
                                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                                min={selectedLoan?.minTerm}
                                max={selectedLoan?.maxTerm}
                            />
                        </div>
                    </div>
                </div>

                {formData.amount && formData.term && selectedLoan && (
                    <Card className="bg-gray-50">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>Monthly Payment</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${calculateMonthlyPayment(
                                            Number(formData.amount),
                                            selectedLoan.baseRate,
                                            Number(formData.term)
                                        ).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Total Interest</span>
                                    <span className="font-medium">
                                        ${(calculateMonthlyPayment(
                                            Number(formData.amount),
                                            selectedLoan.baseRate,
                                            Number(formData.term)
                                        ) * Number(formData.term) - Number(formData.amount)).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Total Payment</span>
                                    <span className="font-medium">
                                        ${(calculateMonthlyPayment(
                                            Number(formData.amount),
                                            selectedLoan.baseRate,
                                            Number(formData.term)
                                        ) * Number(formData.term)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );

    const renderApplicationForm = () => (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Loan Application</CardTitle>
                <CardDescription>Please provide your information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label>Loan Purpose</Label>
                        <Select
                            onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Employment Status</Label>
                        <Select
                            onValueChange={(value) => setFormData({ ...formData, employment: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="self-employed">Self-employed</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Monthly Income</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                type="number"
                                className="pl-10"
                                placeholder="Enter monthly income"
                                value={formData.income}
                                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const renderConfirmation = () => (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <CardDescription>Please review your loan details before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Please review all information carefully. You cannot modify your application after submission.
                    </AlertDescription>
                </Alert>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="loan-details">
                        <AccordionTrigger>Loan Details</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Loan Type</span>
                                    <span className="font-medium">{selectedLoan?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount</span>
                                    <span className="font-medium">${Number(formData.amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Term</span>
                                    <span className="font-medium">{formData.term} months</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Interest Rate</span>
                                    <span className="font-medium">{selectedLoan?.baseRate}% APR</span>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="personal-details">
                        <AccordionTrigger>Personal Details</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Purpose</span>
                                    <span className="font-medium">{formData.purpose}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Employment</span>
                                    <span className="font-medium">{formData.employment}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Monthly Income</span>
                                    <span className="font-medium">${Number(formData.income).toLocaleString()}</span>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="terms">
                        <AccordionTrigger>Terms & Conditions</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-sm text-gray-600">
                                <p>By submitting this application, you agree to our terms and conditions...</p>
                                {/* Add your terms content here */}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                </Button>
                <Button onClick={() => onSubmit(formData)}>
                    Submit Application
                </Button>
            </CardFooter>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Progress Tracker */}
                <div className="w-full max-w-2xl mx-auto mb-8">
                    <div className="flex justify-between items-center">
                        {['Select Loan', 'Calculate', 'Apply', 'Review'].map((label, index) => (
                            <div key={label} className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                  ${step > index + 1 ? 'bg-green-600' :
                                        step === index + 1 ? 'bg-blue-600' : 'bg-gray-300'} 
                  text-white font-medium`}>
                                    {step > index + 1 ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <div className="ml-2 text-sm font-medium text-gray-600">{label}</div>
                                {index < 3 && (
                                    <div className={`h-0.5 w-12 mx-2 
                    ${step > index + 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="space-y-6">
                    {step === 1 && renderLoanSelection()}
                    {step === 2 && renderLoanCalculator()}
                    {step === 3 && renderApplicationForm()}
                    {step === 4 && renderConfirmation()}
                </div>

                {/* Navigation Buttons */}
                {step < 4 && (
                    <div className="flex justify-end gap-4">
                        {step > 1 && (
                            <Button variant="outline" onClick={() => setStep(step - 1)}>
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={() => setStep(step + 1)}
                            disabled={
                                (step === 1 && !selectedLoan) ||
                                (step === 2 && (!formData.amount || !formData.term)) ||
                                (step === 3 && (!formData.purpose || !formData.employment || !formData.income))
                            }
                        >
                            Continue
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LoanApplication;