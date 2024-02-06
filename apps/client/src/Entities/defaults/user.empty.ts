import { IUser } from "../interfaces/user.interface";

export const emptyUser: IUser = {
  _id: "",
  name: "",
  email: "",
  password: "",
  authLevel: "",

  refresh_token: "",
  createdAt: new Date(),
  updatedAt: new Date(),

  isUserApproved: false,

  oldPassword: "",
  newPassword: "",
  confirmedNewPassword: "",
};
