import { Category } from './category.enum';
import { PerfType } from './perftype.enum';
export interface IPerformanceMetricCompetencies {
  name: string;
  explanation: string;
  category: Category;
  type: PerfType;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  _id?: string;
}
