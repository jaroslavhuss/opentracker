import { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { getAllPatients, deletePatientById } from "../APIs/Patients";

import { BsEyeFill, BsTrash2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IPatient } from "../Entities/interfaces/patient.interface";

const GetPatients = () => {
  const [questionnaires, setQuestionnaires] = useState<IPatient[]>([]);
  const [query, setQuery] = useState("");
  const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<
    IPatient[]
  >([]);

  useEffect(() => {
    (async () => {
      const data: IPatient[] = await getAllPatients();

      setQuestionnaires(data);
    })();
  }, []);

  useEffect(() => {
    if (questionnaires.length === 0) return;
    const filteredData = questionnaires.filter((questionnaire) =>
      questionnaire.fulltext.toLowerCase().includes(query.toLowerCase())
    );
    if (query === "") {
      setFilteredQuestionnaires(questionnaires);
      return;
    }

    if (filteredData.length === 0) {
      setFilteredQuestionnaires(questionnaires);
      return;
    }
    setFilteredQuestionnaires(filteredData);
  }, [query, questionnaires]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Opravdu chcete smazat tohoto pacienta?");
    if (!confirm) return;
    await deletePatientById(id);
    const data: IPatient[] = await getAllPatients();
    setQuestionnaires(data);
  };
  return (
    <MainLayout>
      {filteredQuestionnaires && filteredQuestionnaires.length > 0 ? (
        <h1 className="text-center text-2xl">Přehled pacientů</h1>
      ) : (
        <h1 className="text-center text-2xl">
          Zatím nebyl vytvořen žádný pacient
        </h1>
      )}

      {filteredQuestionnaires && filteredQuestionnaires.length > 0 && (
        <div className="grid gap-4 grid-cols-12 my-10">
          <input
            type="text"
            placeholder="Vyhledat pacienta podle jména, emailu nebo rod. čísla"
            className="w-full border border-base-300 rounded-md p-2 col-span-8 align-middle justify-center"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filteredQuestionnaires.length > 0 && (
            <div className="col-span-2 text-2xl">
              Výsledků: ({filteredQuestionnaires.length})
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {filteredQuestionnaires &&
          filteredQuestionnaires.length > 0 &&
          filteredQuestionnaires.map(
            (questionnaire: IPatient, index: number) => {
              return (
                <div
                  className="card bg-base-100 shadow-xl col-span-4 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer"
                  key={questionnaire._id || index}
                >
                  <Link
                    to={`/patient/${questionnaire._id}`}
                    className="absolute -top-3 -right-3 cursor-pointer hover:text-slate-600 transition-all duration-700 bg-orange-200 rounded-full w-14 h-14 bg-contain p-0 text-[12px] flex justify-center items-center hover:p-2 hover:w-16 hover:h-16"
                  >
                    <BsEyeFill className="text-2xl" />
                  </Link>

                  <button
                    onClick={() => handleDelete(questionnaire._id)}
                    className="absolute -bottom-3 -right-3 cursor-pointer hover:text-slate-600 transition-all duration-700 bg-red-200 rounded-full w-14 h-14 bg-contain p-0 text-[12px] flex justify-center items-center hover:p-2 hover:w-16 hover:h-16"
                  >
                    <BsTrash2Fill className="text-2xl" />
                  </button>

                  <div className="card-body block mx-auto">
                    <div
                      tabIndex={0}
                      className="collapse collapse-plus border border-base-300 bg-base-200"
                    >
                      <div className="collapse-title text-xl font-medium">
                        <h2 className="card-title text-center mx-auto">
                          {questionnaire.name} {questionnaire.surname}
                        </h2>
                      </div>
                      <div className="collapse-content">
                        <p>
                          <strong>email:</strong>
                          <br />
                          {questionnaire.email}
                        </p>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </MainLayout>
  );
};

export default GetPatients;
