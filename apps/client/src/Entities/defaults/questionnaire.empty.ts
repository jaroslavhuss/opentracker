import { IQuestionnaire } from "../interfaces/questionnaireDocument.interface";

export const emptyQuestionnaire: IQuestionnaire = {
  name: "",
  description: "",
  maxrange: 0,
  questions: [],
  supervisingDoctor: "",
};
