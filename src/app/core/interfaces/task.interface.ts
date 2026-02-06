export interface ApiTaskResponse
{
    success: boolean;
    messages: string;
    detail: {
        data: 
        { 
            id : string
            title: string
            description	: string
            status	: "Pendiente" | 'Completada'
            userId	: string,
            createdAt: Date,
            updatedAt	: Date,
            deletedAt : Date | null 
        };
    };
}