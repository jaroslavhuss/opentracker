import { Category } from './category.enum';
export interface ISection {
  name: string;
  description: string;
  category: Category;
  country: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
  _id?: string;
}
