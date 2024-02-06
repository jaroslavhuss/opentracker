import {IUser, IDepartment, IJobname, IAppraisalDocument, IRatingDistribution} from "."

export interface IEvaluationDynamicDocument {
    _id?:string;
    selectedRep:IUser;
   
    appraisalDate:Date;
    dateConfirmation:Date;
    appraisalDocument:IAppraisalDocument;
    raitingDistribution:IRatingDistribution;
    inputsStandard:{};
    inputsEnergizer:{};
    outputsStandard:{};
    competencies:{};
    competenciesLetter:string;
    competenciesFinaPercentageNumber:number;
    comments:{};
    evaluationSummeries:{};
    managerConsentButton:boolean;
    employeeConsentButton:boolean;

    //Countables for INPUT section
    energizerImportanceSum:number;
    inputImportanceSum:number;
    inputEnergizerSum:number;
    inputStandardSum:number;
    energizerInputFinalValue:number;
    overallInputFinalvalue:number;
    energizerInputLetter:string;
    overallInputLetter:string;

    //Countables for OUTPUT section
    outputStandardImportanceSum:number;
    outputStandardSum:number;
    outputStandardFinalValue:number;
    outputStandardLetter:string;

    //Fast search for quick queries
    repNameQuery:string;
    appraisalPeriod:string;
    country:string;
}