import { IDetailsMatchResult } from './details-match-result';
export interface IValidationSummary {
    detailsMatchResult: IDetailsMatchResult;
    faceMatchResult: boolean;
}