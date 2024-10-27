import { registerUser } from "@/services/authentications/register";
import { NextRequest, NextResponse } from "next/server";

interface RegisterRequestBody
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
}

export async function POST(req: NextRequest): Promise<NextResponse>
{
    try
    {
        const body = await req.json() as RegisterRequestBody;
        const { firstName, lastName, email, password, acceptedTerms } = body;

        if (!firstName || !lastName || !email || !password)
        {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        const user = await registerUser({
            firstName,
            lastName,
            email,
            password,
            acceptedTerms,
        });

        return NextResponse.json(
            { message: "User registered successfully", uid: user.uid },
            { status: 201 }
        );
    } catch (error)
    {
        if (error instanceof Error)
        {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}