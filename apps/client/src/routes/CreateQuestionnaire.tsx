import { useState } from "react";
import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import MainLayout from "../components/Layouts/MainLayout";
import { emptyQuestionnaire } from "../Entities/defaults/questionnaire.empty";
import { BsFillTrash3Fill, BsPlusCircle } from "react-icons/bs";
import { createQuestionnaire } from "../APIs/Questionnaire";
import { setError } from "../store/gsms/errorSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUser } from "../Entities/interfaces/user.interface";
const CreateQuestionnaire = () => {
  const authUser = useAuthUser() as { user: IUser };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionnaire, setQuestionnaire] =
    useState<IQuestionnaire>(emptyQuestionnaire);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validation of all IQuestionnaire fields

    if (questionnaire.name.length < 1) {
      dispatch(
        setError({
          message: "Název dotazníku musí být vyplněn!",
          rawData: "Název dotazníku musí být vyplněn!",
        })
      );
      return;
    }

    if (questionnaire.description.length < 1) {
      dispatch(
        setError({
          message: "Popis dotazníku musí být vyplněn!",
          rawData: "Popis dotazníku musí být vyplněn!",
        })
      );
      return;
    }

    if (questionnaire.maxrange < 1) {
      dispatch(
        setError({
          message: "Maximální rozsah hodnocení musí být vyplněn!",
          rawData: "Maximální rozsah hodnocení musí být vyplněn!",
        })
      );
      return;
    }

    if (questionnaire.questions.length < 1) {
      dispatch(
        setError({
          message: "Dotazník musí obsahovat alespoň jednu otázku!",
          rawData: "Dotazník musí obsahovat alespoň jednu otázku!",
        })
      );
      return;
    }
    console.log(authUser);
    questionnaire.supervisingDoctor = authUser.user._id;
    createQuestionnaire(questionnaire);

    setQuestionnaire(emptyQuestionnaire);

    navigate("/questionnaire/get");
  };

  const addQuestion = () => {
    const newQuestion = "";
    const questionsArray: string[] = [...questionnaire.questions];
    questionsArray.push(newQuestion);
    setQuestionnaire({ ...questionnaire, questions: questionsArray });
  };

  const removeQuestion = (index: number) => {
    const questionsArray: string[] = [...questionnaire.questions];
    questionsArray.splice(index, 1);
    setQuestionnaire({ ...questionnaire, questions: questionsArray });
  };
  return (
    <MainLayout>
      <div className="w-full text-center flex flex-col justify-center align-middle">
        <h1 className="text-2xl my-2">Vyvtoření nového dotazníku</h1>
        <form
          onSubmit={handleFormSubmit}
          className="card w-full max-w-3xl flex flex-col gap-3 p-3 shadow-xl self-center"
        >
          <span className=" font-bold py-1 mx-2">Pojmenujte dotazník</span>
          <input
            type="text"
            className="input input-bordered input-primary w-full max-w-3xl"
            onChange={({ target }) => {
              setQuestionnaire({ ...questionnaire, name: target.value });
            }}
            value={questionnaire.name}
          />
          <hr />
          <span className=" font-bold py-1 mx-2">
            Úvodní zpráva pro pacienta, proč má dotazník vyplnit.
          </span>
          <textarea
            className="textarea textarea-primary"
            onChange={({ target }) => {
              setQuestionnaire({ ...questionnaire, description: target.value });
            }}
            value={questionnaire.description}
          ></textarea>
          <hr />
          <span className=" font-bold py-1 mx-2">
            Nastavení maximálního rozsahu hodnocení dotazníku (například 10 -
            {">"} otázky se pak budou vyhodnocovat v rozmezí 0 - 10)
          </span>
          <input
            type="number"
            min={0}
            className="input input-bordered input-primary w-full max-w-3xl"
            onChange={({ target }) => {
              setQuestionnaire({ ...questionnaire, maxrange: +target.value });
            }}
            value={questionnaire.maxrange}
          />
          <hr />
          <span className=" font-bold py-1 mx-2">Sledované metriky</span>

          {questionnaire.questions.map((question, index) => {
            return (
              <div
                className="flex flex-row gap-3 align-middle justify-center"
                key={index}
              >
                <span className=" font-bold py-1 mx-2">{index + 1}.</span>
                <input
                  type="text"
                  className="input input-bordered input-primary w-full max-w-3xl"
                  onChange={({ target }) => {
                    const questionsArray: string[] = [
                      ...questionnaire.questions,
                    ];
                    questionsArray[index] = target.value;
                    setQuestionnaire({
                      ...questionnaire,
                      questions: questionsArray,
                    });
                  }}
                  value={question}
                />
                <div
                  onClick={() => {
                    removeQuestion(index);
                  }}
                  className="flex align-middle justify-center"
                >
                  <BsFillTrash3Fill className="hover:text-red-500 text-xl" />
                </div>
              </div>
            );
          })}
          <div
            onClick={() => {
              addQuestion();
            }}
            className="w-full flex align-middle justify-end border-t-2 py-2"
          >
            <BsPlusCircle className="hover:text-green-500 text-3xl text-right" />
          </div>
          {questionnaire.questions.length > 0 && (
            <button
              type="submit"
              className="btn btn-success w-full max-w-3xl self-center"
            >
              Vytvořit dotazník
            </button>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateQuestionnaire;
