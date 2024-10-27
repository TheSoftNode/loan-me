// components/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authFetch } from '@/utils/authFetch';
import { AuthStorage } from '@/utils/storage';

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
)
{
    return function WithAuthComponent(props: P)
    {
        const router = useRouter();
        const [isValidating, setIsValidating] = useState(true);

        useEffect(() =>
        {
            const validateToken = async () =>
            {
                try
                {
                    // Verify token on component mount
                    const response = await authFetch('/api/auth/verify');
                    if (!response.ok)
                    {
                        throw new Error('Invalid token');
                    }
                } catch (error)
                {
                    AuthStorage.clearToken();
                    router.push('/login?error=invalid_session');
                } finally
                {
                    setIsValidating(false);
                }
            };

            const token = AuthStorage.getToken();
            if (!token)
            {
                router.push('/login');
            } else
            {
                validateToken();
            }
        }, []);

        if (isValidating)
        {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
}