import { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { emptyPatient } from "../Entities/defaults/patient.empty";
import { IPatient } from "../Entities/interfaces/patient.interface";
import { createPatient } from "../APIs/Patients";
import { setError } from "../store/gsms/errorSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getAllQuestionnaires } from "../APIs/Questionnaire";
const CreatePatient = () => {
  const authUser = useAuthUser() as { user: IPatient };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [patient, setPatient] = useState<IPatient>(emptyPatient);
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //@ts-ignore
    patient.supervisingDoctor = authUser.user._id;
    patient.fulltext = `${patient.name} ${patient.surname} ${patient.privateId} ${patient.email}`;

    //validate name, surname and private ID - email can be empty

    if (patient.name === "") {
      dispatch(
        setError({
          message: "Jméno pacienta nesmí být prázdné",
          rawData: "Bohužel, potřebujeme i jméno pacienta",
        })
      );
      return;
    }

    if (patient.surname === "") {
      dispatch(
        setError({
          message: "Příjmení pacienta nesmí být prázdné",
          rawData: "Bohužel, potřebujeme i příjmení pacienta",
        })
      );
      return;
    }

    if (patient.privateId === "") {
      dispatch(
        setError({
          message: "Rodné číslo pacienta nesmí být prázdné",
          rawData: "Bohužel, potřebujeme i rodné číslo pacienta",
        })
      );
      return;
    }

    createPatient(patient);
    setPatient(emptyPatient);

    navigate("/patient/get");
  };

  useEffect(() => {
    (async () => {
      const data = await getAllQuestionnaires();
      setAvailableQuestionnaires(data);
    })();
  }, []);

  const addAssignedQuestionnaire = (id: string) => {
    //@ts-ignore
    const arrayOfAssignedQuestionnaires = [...patient.assignedQuestionnaires];
    arrayOfAssignedQuestionnaires.push(id);
    setPatient({
      ...patient,
      assignedQuestionnaires: arrayOfAssignedQuestionnaires,
    });
  };

  const removeAssignedQuestionnaire = (id: string) => {
    //@ts-ignore
    const arrayOfAssignedQuestionnaires = [...patient.assignedQuestionnaires];
    const index = arrayOfAssignedQuestionnaires.indexOf(id);
    if (index > -1) {
      arrayOfAssignedQuestionnaires.splice(index, 1);
    }
    setPatient({
      ...patient,
      assignedQuestionnaires: arrayOfAssignedQuestionnaires,
    });
  };

  return (
    <MainLayout>
      <div className="w-full text-center flex flex-col justify-center align-middle">
        <h1 className="text-2xl my-2">Vyvtoření nového pacienta</h1>
        <form
          onSubmit={handleFormSubmit}
          className="card w-full max-w-3xl flex flex-col gap-3 p-3 shadow-xl self-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-1">
              {" "}
              <span className=" font-bold py-1 mx-2">Jméno</span>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-3xl"
                value={patient.name}
                onChange={(e) =>
                  setPatient({ ...patient, name: e.target.value })
                }
              />
            </div>
            <div className="col-span-1">
              {" "}
              <span className=" font-bold py-1 mx-2">Příjmení</span>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-3xl"
                value={patient.surname}
                onChange={(e) =>
                  setPatient({ ...patient, surname: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-1">
              {" "}
              <span className=" font-bold py-1 mx-2">Rodné číslo</span>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-3xl"
                value={patient.privateId}
                onChange={(e) =>
                  setPatient({ ...patient, privateId: e.target.value })
                }
              />
            </div>
            <div className="col-span-1">
              {" "}
              <span className=" font-bold py-1 mx-2">Email</span>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-3xl"
                value={patient.email}
                onChange={(e) =>
                  setPatient({ ...patient, email: e.target.value })
                }
              />
            </div>
          </div>
          <hr />
          {availableQuestionnaires.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <div className="col-span-1">
                {" "}
                <span className=" font-bold py-2 mb-5 text-xl ">
                  Přiřazení dotazníků
                </span>
                <br />
                <br />
                <div className="grid grid-cols-12 gap-2">
                  {availableQuestionnaires.map((questionnaire: any) => {
                    return (
                      <div
                        className=" col-span-12 md:col-span-6 flex flex-row gap-3 align-middle justify-center"
                        key={questionnaire._id}
                      >
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          onChange={() => {
                            if (
                              patient.assignedQuestionnaires?.includes(
                                questionnaire._id
                              )
                            ) {
                              removeAssignedQuestionnaire(questionnaire._id);
                            } else {
                              addAssignedQuestionnaire(questionnaire._id);
                            }
                          }}
                          checked={patient.assignedQuestionnaires?.includes(
                            questionnaire._id
                          )}
                        />
                        <span className=" font-bold py-1 mx-2">
                          {questionnaire.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <hr />
          <button
            type="submit"
            className="btn btn-success w-full max-w-3xl self-center mt-10"
          >
            Vytvořit pacienta
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreatePatient;
