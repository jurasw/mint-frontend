export interface INotification {
    id: number;
    userId: number;
    message: string;
    createdAt: Date;
    isRead: boolean;
    typeNotification: string;
    redirectTo: {
        forumId: number | null;
        threadId: number | null;
        eventId: number | null;
        chatId: number | null;
        articleId: number | null;
        recordingId: string;
    } | undefined;
}
