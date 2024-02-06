import { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { getAllQuestionnaires } from "../APIs/Questionnaire";
import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";

const GetQuestionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState<IQuestionnaire[]>([]);
  useEffect(() => {
    (async () => {
      const data: IQuestionnaire[] = await getAllQuestionnaires();
      setQuestionnaires(data);
    })();

    return () => {
      setQuestionnaires([]);
    };
  }, []);
  return (
    <MainLayout>
      {questionnaires.length > 0 ? (
        <h1 className="text-center text-2xl">Přehled dotazníků</h1>
      ) : (
        <h1 className="text-center text-2xl">
          Zatím nebyl vytvořen žádný dotazník
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {questionnaires.length > 0 &&
          questionnaires.map((questionnaire: IQuestionnaire, index: number) => {
            return (
              <div
                className="card bg-base-100 shadow-xl col-span-4 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer"
                key={questionnaire._id || index}
              >
                <Link
                  to={`/questionnaire/${questionnaire._id}`}
                  className="absolute -top-3 -right-3 cursor-pointer hover:text-slate-600 transition-all duration-700 bg-orange-200 rounded-full w-14 h-14 bg-contain p-0 text-[12px] flex justify-center items-center hover:p-2 hover:w-16 hover:h-16"
                >
                  <BsPencil className="text-2xl" />
                </Link>

                <div className="card-body block mx-auto">
                  <div
                    tabIndex={0}
                    className="collapse collapse-plus border border-base-300 bg-base-200"
                  >
                    <div className="collapse-title text-xl font-medium">
                      <h2 className="card-title text-center mx-auto">
                        {questionnaire.name}
                      </h2>
                    </div>
                    <div className="collapse-content">
                      <p>
                        <strong>Popis:</strong>
                        <br />
                        {questionnaire.description}
                      </p>
                      <br />
                      <p>
                        <strong>Maximální škála:</strong>
                        <br />
                        {questionnaire.maxrange}
                      </p>
                      <br />
                      <hr />
                      <strong>Otázky: </strong>
                      {questionnaire.questions.map((question, index) => {
                        return (
                          <div key={index}>
                            <p>
                              {index + 1}. {question}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
};

export default GetQuestionnaires;
