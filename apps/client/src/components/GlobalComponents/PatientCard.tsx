import { FC } from "react";
import QRCode from "react-qr-code";
import { IQuestionnaire } from "../../Entities/interfaces/questionnaireDocument.interface";
interface Props {
  privateId: string;
  nickname: string;
  questionnaires: IQuestionnaire[];
}

const PatientCard: FC<Props> = ({ privateId, nickname, questionnaires }) => {
  const JSONToBeReady = {
    privateId,
    nickname,
    questionnaires,
  };

  console.log(JSONToBeReady);
  return (
    <div className="border-2 p-2 rounded-lg shadow-xl bg-white">
      <h2 className="font-bold">OpenTracker - registrační kartička</h2>
      <hr />
      <p>
        <span className="font-bold">Jméno:</span>{" "}
        <span className="text-pink-700">{nickname}</span>
      </p>
      <p>
        <span className="font-bold">Unikátní ID:</span>{" "}
        <span className="text-pink-700">{privateId}</span>
      </p>
      <br />
      <QRCode value={JSON.stringify(JSONToBeReady)} />
    </div>
  );
};

export default PatientCard;
