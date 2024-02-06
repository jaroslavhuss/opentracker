import { IPerformanceMetricComments, IPerformanceMetricInput, IPerformanceMetricOutput, IPerformanceMetricCompetencies, IRatingDistribution } from ".";
export interface IAppraisalDocument {
    country:string;
    inputs:IPerformanceMetricInput[];
    inputName:string;
    inputDescription:string;
    outputs:IPerformanceMetricOutput[];
    outputName:string;
    outputDescription:string;
    comments: IPerformanceMetricComments[];
    commentsName:string;
    commentsDescription:string;
    competencies:IPerformanceMetricCompetencies[];
    competenciesName:string;
    competenciesDescription:string;
    evaluationPeriod:string;
    creator: string;
    _id?:string;
    createdAt?: Date;
    updatedAt?: Date;
    ratingDistribution:IRatingDistribution
}