import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/withAuth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';

export async function GET(request: NextRequest)
{
    return withAuth(request, async (authenticatedRequest: AuthenticatedRequest) =>
    {
        try
        {
            const userId = authenticatedRequest.decodedToken!.uid;
            const userDoc = await getDoc(doc(db, 'users', userId));

            if (!userDoc.exists())
            {
                return NextResponse.json(
                    { success: false, error: 'User profile not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                profile: userDoc.data()
            });
        } catch (error)
        {
            console.error('Profile fetch error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to fetch user profile' },
                { status: 500 }
            );
        }
    });
}

export async function PATCH(request: NextRequest)
{
    return withAuth(request, async (authenticatedRequest: AuthenticatedRequest) =>
    {
        try
        {
            const userId = authenticatedRequest.decodedToken!.uid;
            const updates = await request.json();

            // Validate updates here if needed
            const allowedFields = [
                'firstName',
                'lastName',
                'photoURL',
                'lastLogin'
            ];

            const sanitizedUpdates = Object.keys(updates)
                .filter(key => allowedFields.includes(key))
                .reduce((obj, key) => ({
                    ...obj,
                    [key]: updates[key]
                }), {});

            await updateDoc(doc(db, 'users', userId), sanitizedUpdates);

            return NextResponse.json({
                success: true,
                message: 'Profile updated successfully'
            });
        } catch (error)
        {
            console.error('Profile update error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to update user profile' },
                { status: 500 }
            );
        }
    });
}