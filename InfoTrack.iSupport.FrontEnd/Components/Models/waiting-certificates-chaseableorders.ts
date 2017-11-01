export interface IChaseableOrder {
    AlreadyRequestedChase: boolean;
    CanChaseOrder: boolean;
    CertificateDescription: string;
    CouncilName: string;
    DateOrdered: string;
    EstimatedDeliveryTime: string;
    LotPlans: string[];
    Matter: string;
    OrderId: string;
    PencilOrderId: string;
    ServiceManagerId: string;
    State: string;
}