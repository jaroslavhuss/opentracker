import { IMyomatosys } from "../interfaces/myomatosys.interface";
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const dateString = `${day}.${month}.${year}`;

export const emptyMyomatosys: IMyomatosys = {

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
    sumValue: 0,
    _v: 0,
}