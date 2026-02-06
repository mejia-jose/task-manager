export interface UserSession
{
    userId : string;
    email: string;
    name: string;
}

export interface ApiResponse
{
    success: boolean;
    messages: string;
    detail: {
        data: { id: string; email: string; name: string };
    };
}