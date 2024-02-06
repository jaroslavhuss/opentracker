import { Roles } from './roles.enum';
import { Types } from 'mongoose';
import { IJobname } from './jobname.interface';
export interface IUser {
  _id?: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
  lastLoggedIn: Date;
  isUserApproved: boolean;
  authLevel: Roles;
  jobName: IJobname;
  department: {
    name: string;
    description: string;
    country: string;
    creator: string;
    createdAt: Date;
    updatedAt: Date;
    _id?: string;
    __v?: number;
  };
  country: string;
  surname: string;
  name: string;
  password?: string;
  email: string;
  refresh_token: string;

  //new props for GDPR and so on
  startDateOfEmployment?: Date;
  currentPositionHeldSince?: Date;
  gdprConsent?: boolean;
  gdprConsentDate?: Date;
}
