import { IEndo } from "../interfaces/endo.interface";
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const dateString = `${day}.${month}.${year}`;

export const emptyEndo: IEndo = {

    pacientName: '',
    pacientSSN: '',
    questionnaireDate: dateString,
    supervisorDoctor: "",
    __01Question: 0,
    __02Question: 0,
    __03Question: 0,
    __04Question: 0,
    __05Question: 0,
    __06Question: 0,
    __07Question: 0,
    __08Question: 0,
    __09Question: 0,
    __10Question: 0,
    __11Question: 0,
    __12Question: 0,
    __13Question: 0,
    __14Question: 0,
    __15Question: 0,
    sumValue: 0,
    _v: 0,
}