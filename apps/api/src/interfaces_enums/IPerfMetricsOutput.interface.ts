import { Category } from './category.enum';
import { PerfType } from './perftype.enum';
export interface IPerformanceMetricOutput {
  name: string;
  explanation: string;
  category: Category;
  type: PerfType;
  country: string;
  importance: number;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  _id?: string;
}
