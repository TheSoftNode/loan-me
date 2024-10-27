// hooks/useProtectedData.ts
import { authFetch } from '@/utils/authFetch';
import { useState } from 'react';

export function useProtectedData()
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = async () =>
    {
        setLoading(true);
        try
        {
            const response = await authFetch('/api/user/profile');
            const data = await response.json();
            return data;
        } catch (error)
        {
            setError(error instanceof Error ? error.message : 'Failed to fetch profile');
            throw error;
        } finally
        {
            setLoading(false);
        }
    };

    const fetchDashboardData = async () =>
    {
        setLoading(true);
        try
        {
            const response = await authFetch('/api/dashboard');
            const data = await response.json();
            return data;
        } catch (error)
        {
            setError(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
            throw error;
        } finally
        {
            setLoading(false);
        }
    };

    return {
        fetchUserProfile,
        fetchDashboardData,
        loading,
        error
    };
}