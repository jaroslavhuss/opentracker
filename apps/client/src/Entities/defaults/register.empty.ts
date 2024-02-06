import { IRegisterFormData } from "../interfaces/register.interface";
export const emptyRegisterFormData: IRegisterFormData = {
  loginID: generateRandomLoginId(),
  password: "",
  confirmedPassword: "",
  securityQuestion1: "",
  securityQuestion2: "",
  securityAnswer1: "",
  securityAnswer2: "",
};

export function generateRandomLoginId() {
  return (
    //max 8 characters
    Math.random().toString(36).substring(2, 6) +
    //max 4 characters
    Math.random().toString(36).substring(2, 4)
  );
}
