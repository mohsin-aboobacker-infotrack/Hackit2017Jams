export interface IFaceMatchModel {
    face1Path: string;
    face2Path: string;
    face1Base64: string;
    matchPercentage: number;
    success: boolean;
    error: string;
}