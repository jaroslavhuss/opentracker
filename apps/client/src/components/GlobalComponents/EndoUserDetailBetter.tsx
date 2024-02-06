import React from "react";
import { BsPersonFillCheck } from "react-icons/bs";
import HealthStatusProgress from "./HealthStatusProgress";
import { IQuestionnaire } from "../../Entities/interfaces/questionnaire.interface";
import QuestionnaireDetail from "./QuestionnaireDetail";

interface Props {
  allData: IQuestionnaire[];
  questions: string[];
}

const EndoUserDetailBetter: React.FC<Props> = ({ allData, questions }) => {
  return (
    <>
      {allData.length > 0 && (
        <div className="w-full m-1">
          <div className="card w-full bg-base-100 shadow-xl relative mx-auto">
            <figure className="px-10 pt-10">
              <BsPersonFillCheck
                style={{
                  fontSize: "3rem",
                  color: "grey",
                }}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{allData[0].pacientName}</h2>
              <div className="border w-full p-5 rounded-md">
                {allData.map((user: IQuestionnaire, index) => {
                  return (
                    <div className="grid grid-cols-12 gap-3 w-full" key={index}>
                      <div className="col-span-2 text-left">
                        {user.questionnaireDate}
                      </div>
                      <div className="col-span-8 text-left">
                        <progress
                          className="progress w-full"
                          value={user.sumValue}
                          max="150"
                        ></progress>
                      </div>
                      <div className="col-span-2 text-right">
                        {user.sumValue}
                      </div>
                    </div>
                  );
                })}
              </div>
           
              {allData.map((q: IQuestionnaire, index: number) => {
                return <QuestionnaireDetail key={index} questionnaire={q} ind={index} questions={questions} />;
              })}

              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-200"
              >
                <div className="collapse-title text-xl font-medium">
                  Porovnání dat v čase u jednotlivých metrik
                </div>
                <div className="collapse-content">
                  {questions.map((question, indexx) => {
                    return (
                      <>
                        {question}
                        {allData.map(
                          (userData: IQuestionnaire, index: number) => {
                            let keyName: string = `__${
                              indexx + 1 < 10 ? 0 : ""
                            }${indexx + 1}Question`;
                            return (
                              <>
                                <HealthStatusProgress
                                  className="progress col-span-6"
                                  current={
                                    (userData as any)[
                                      keyName as string
                                    ] as number
                                  }
                                  max={10}
                                  date={userData.questionnaireDate}
                                  key={index}
                                />
                              </>
                            );
                          }
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EndoUserDetailBetter;
