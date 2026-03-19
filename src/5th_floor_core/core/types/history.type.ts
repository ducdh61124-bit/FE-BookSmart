export interface HistoryLog {
    id: number;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
    entityType: 'BOOK' | 'CATEGORY' | 'USER' | 'AUTH';
    entityName: string;
    performedBy: string;
    timestamp: string;
    details?: string;
}