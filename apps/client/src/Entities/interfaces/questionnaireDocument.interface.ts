export interface IQuestionnaire {
  _id?: string;
  name: string;
  description: string;
  maxrange: number;
  questions: string[];
  supervisingDoctor: string;
  createdAt?: Date;
}
