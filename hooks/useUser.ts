import { useEffect, useState } from 'react';
import { authFetch } from '@/utils/authFetch';
import { UserProfile } from '@/lib/type';

interface UserProfileResponse {
    success: boolean;
    profile?: UserProfile;
    error?: string;
}

export function useUser() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async (): Promise<UserProfileResponse> => {
        try {
            const response = await authFetch('/api/users/profile');
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch profile');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error('Failed to fetch profile');
        }
    };

    const loadUser = async () => {
        try {
            const data = await fetchProfile();
            if (data.success && data.profile) {
                setUser(data.profile);
                setError(null);
            } else {
                setError(data.error || 'Failed to load user profile');
                setUser(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load user profile');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
        try {
            const response = await authFetch('/api/users/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }

            await loadUser(); // Refresh user data after update
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update profile');
            return false;
        }
    };

    return {
        user,
        loading,
        error,
        refreshUser: loadUser,
        updateProfile,
    };
}
