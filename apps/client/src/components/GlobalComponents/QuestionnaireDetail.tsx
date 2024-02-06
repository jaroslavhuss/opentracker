import React from 'react';
import { IQuestionnaire } from '../../Entities/interfaces/questionnaire.interface';
import HealthStatusProgress from './HealthStatusProgress';
interface Props {
    questionnaire: IQuestionnaire;
    ind:number;
    questions:string[];
}

const QuestionnaireDetail: React.FC<Props> = ({questionnaire, ind, questions}) => {
  return (

    <div tabIndex={ind} className="collapse collapse-arrow border border-base-300 bg-base-200">
  <div className="collapse-title text-xl font-medium">
  <h1>Záznam z {questionnaire.questionnaireDate}</h1>
  </div>
  <div className="collapse-content"> 
  {
        questions.map((question, index) => {
            let keyName: string = `__${index + 1 < 10 ? 0 : ""}${
                index + 1
              }Question`;
          return (
            <div key={index} className='w-full'>
              <h3>{question} {questionnaire[keyName as any] as number}</h3>
              <HealthStatusProgress 
                current={questionnaire[keyName as any] as number}
                max={10}
                date={questionnaire.questionnaireDate}
              />
            </div>
          )
        })   
      }
  </div>
</div>
  );
};

export default QuestionnaireDetail;