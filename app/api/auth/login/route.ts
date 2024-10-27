import { NextRequest, NextResponse } from 'next/server';
import { UserCredential } from 'firebase/auth';
import { emailPasswordLogin } from '@/services/authentications/login';

interface LoginRequestBody
{
  method: 'emailPassword';
  email?: string;
  password?: string;
}

interface LoginSuccessResponse
{
  token?: string;
  message?: string;
}

interface LoginErrorResponse
{
  error: string;
  code?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<LoginSuccessResponse | LoginErrorResponse>>
{
  try
  {
    const { method, email, password }: LoginRequestBody = await request.json();

    if (method !== 'emailPassword')
    {
      return NextResponse.json(
        { error: 'Invalid authentication method' },
        { status: 400 }
      );
    }

    if (!email || !password)
    {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const userCredential: UserCredential = await emailPasswordLogin(email, password);
    const token = await userCredential.user.getIdToken();
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }
    });

  } catch (error: any)
  {
    // const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // return NextResponse.json({ error: errorMessage }, { status: 401 });
    // Return a more specific status code based on the error
    const status = error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'
      ? 401  // Unauthorized
      : error.code === 'auth/too-many-requests'
        ? 429  // Too Many Requests
        : 400; // Bad Request

    return NextResponse.json(
      {
        error: error.message,
        code: error.code  // Include the error code for frontend handling
      },
      { status }
    );
  }
}
