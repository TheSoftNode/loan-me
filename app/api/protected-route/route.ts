import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/withAuth';

export async function GET(request: NextRequest)
{
    return withAuth(request, async (authenticatedRequest: AuthenticatedRequest) =>
    {
        const decodedToken = authenticatedRequest.decodedToken!;

        return NextResponse.json({
            message: 'Protected data retrieved successfully',
            userId: decodedToken.uid,
            data: {
                decodedToken
            }
        });
    });
}