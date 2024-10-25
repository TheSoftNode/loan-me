import MainDashboard from '../../../components/Dashboard/MainDashboard';
import React from 'react'

const dashboardData = {
    userData: {
        name: "John Doe",
        accountBalance: 5000,
        savingsBalance: 2000,
        creditScore: 750
    },
    loans: [],
    transactions: [],
    notifications: []
};

const page = () =>
{
    return (
        <MainDashboard {...dashboardData} />
    )
}

export default page