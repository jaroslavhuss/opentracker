import { generateRandomNickname } from "../../utils/Nicknames";
import { IPatient } from "../interfaces/patient.interface";
import { generateRandomLoginId } from "./register.empty";

export const emptyPatient: IPatient = {
  _id: "",
  privateId: generateRandomLoginId(),
  nickname: (() => {
    return generateRandomNickname();
  })(),
  fulltext: "",
  questionnairesDoneByPatient: [],
  assignedQuestionnaires: [],
  createdAt: new Date(),
  supervisingDoctor: "",
};
