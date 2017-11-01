export interface ISupportRequestCareModel {
    IncidentId: string;
    Matter: string;
    OrderCount: number;
    ClientId: number;
    Description: string;
    Status: string;
    CreatedDateTime: string;
    HasNewComment: boolean;
    RequestedBy: string;
}