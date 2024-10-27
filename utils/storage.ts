export class AuthStorage
{
    private static readonly TOKEN_KEY = 'authToken';
    private static readonly EXPIRY_KEY = 'tokenExpiry';

    static saveToken(token: string, rememberMe: boolean): void
    {
        const storage = rememberMe ? localStorage : sessionStorage;

        // Set expiry to 30 days for remember me, 1 day for regular session
        const expiryDays = rememberMe ? 30 : 1;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expiryDays);

        storage.setItem(this.TOKEN_KEY, token);
        storage.setItem(this.EXPIRY_KEY, expiryDate.toISOString());
    }

    static getToken(): string | null
    {
        // Try both storage locations
        const token = localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
        const expiry = localStorage.getItem(this.EXPIRY_KEY) || sessionStorage.getItem(this.EXPIRY_KEY);

        if (!token || !expiry) return null;

        // Check if token has expired
        if (new Date(expiry) < new Date())
        {
            this.clearToken();
            return null;
        }

        return token;
    }

    static clearToken(): void
    {
        // Clear from both storage locations
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.EXPIRY_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.EXPIRY_KEY);
    }
}