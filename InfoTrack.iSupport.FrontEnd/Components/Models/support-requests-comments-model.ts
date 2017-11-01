export interface ISupportRequestsCommentsModel {
    Notes: INotes[];
    IncidentId: number;
    ClientId: string;
    Description: string;
    Status: string;
    CreatedDateTime: string;
    ClientStaff: string;
}

interface INotes {
    AddedByClient: boolean;
    DateAddedUTC: string;
    OwnedBy: string;
    Details: string;
    DateCreated: string;
    RecId: string;
}