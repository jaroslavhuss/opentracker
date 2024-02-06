type QuestionKeys = `__${string}${"Question"}`;
interface IQuestionnaireConsts {
    _id: string;
    pacientName: string;
    pacientSSN: number;
    supervisorDoctor: string;
    questionnaireDate: string;
    sumValue: number;
  }
  
  type IQuestionnaireDynamic = {
    [key in QuestionKeys]?: number; // Dynamic key indexing for questions
  };
  
  export type IQuestionnaire = IQuestionnaireConsts & IQuestionnaireDynamic;