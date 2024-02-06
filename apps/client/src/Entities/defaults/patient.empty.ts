import { IPatient } from "../interfaces/patient.interface";

export const emptyPatient: IPatient = {
  _id: "",
  name: "",
  surname: "",
  privateId: "",
  email: "",
  fulltext: "",
  questionnairesDoneByPatient: [],
  assignedQuestionnaires: [],
  createdAt: new Date(),
  supervisingDoctor: "",
};
