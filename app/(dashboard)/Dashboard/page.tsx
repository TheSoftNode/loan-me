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

// import { withAuth } from '@/components/withAuth';
// import Dashboard from '@/components/Dashboard';

// const DashboardPage = () => <Dashboard />;

// export default withAuth(DashboardPage);

const page = () =>
{
    return (
        <MainDashboard {...dashboardData} />
    )
}

export default page