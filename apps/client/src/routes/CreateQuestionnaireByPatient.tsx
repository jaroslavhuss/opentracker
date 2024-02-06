import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import { useEffect, useState } from "react";
import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { getQuestionnaireById } from "../APIs/Questionnaire";
import FormInputRange from "../components/GlobalComponents/FormInputRange";
import { updateQuestionnaireDoneByPatientById } from "../APIs/Patients";
import { useDispatch } from "react-redux";
import { setError } from "../store/gsms/errorSlice";
import { setSuccess } from "../store/gsms/successSlice";

const CreateQuestionnaireByPatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, questionnaireId } = useParams<{
    id: string;
    questionnaireId: string;
  }>();
  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire>();
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const [questionAndAnswers, setQuestionAndAnswers] = useState<{
    [key: string]: number;
  }>();

  const generateDefaultRange = (questionnaire: IQuestionnaire) => {
    const defaultValuesForQuestionAndAnswers: { [key: string]: number } = {};
    questionnaire.questions.forEach((question) => {
      defaultValuesForQuestionAndAnswers[question] = 0;
    });
    setQuestionAndAnswers(defaultValuesForQuestionAndAnswers);
  };

  useEffect(() => {
    (async () => {
      if (!questionnaireId) return;

      const data: IQuestionnaire = await getQuestionnaireById(questionnaireId);
      generateDefaultRange(data);

      setQuestionnaire(data);
    })();
  }, [questionnaireId]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalArray: { question: string; answer: number }[] = [];

    if (questionAndAnswers === undefined) return;

    Object.keys(questionAndAnswers).forEach((key) => {
      finalArray.push({
        question: key,
        answer: questionAndAnswers[key],
      });
    });

    const finalQuestionnaire: any = {
      ...questionnaire,
      questionsAndAnswers: finalArray,
    };

    finalQuestionnaire.createdAt = createdAt;

    finalQuestionnaire.sum = finalArray.reduce((acc, curr) => {
      return acc + curr.answer;
    }, 0);

    if (!id) return;
    const data = await updateQuestionnaireDoneByPatientById(
      id,
      finalQuestionnaire
    );

    if (data) {
      dispatch(
        setSuccess({
          message: "Dotazník byl úspěšně odeslán!",
          rawData: data.toString(),
        })
      );
      navigate(`/patient/${id}`);
    } else {
      dispatch(
        setError({
          message: "Dotazník se nepodařilo odeslat!",
          rawData: data.toString(),
        })
      );
    }
  };

  const handleRangeChange = (val: number, questionName: string) => {
    const newQuestionAndAnswers = { ...questionAndAnswers };
    newQuestionAndAnswers[questionName] = val;
    setQuestionAndAnswers(newQuestionAndAnswers);
  };
  return (
    <MainLayout>
      <Link
        to={`/patient/${id}`}
        className=" flex flex-row align-middle items-center gap-4 shadow-xl"
      >
        <BsArrowLeftSquareFill className="text-4xl text-blue-600 my-2" />{" "}
        <span>Zpět</span>
      </Link>

      {
        //@ts-ignore
        questionnaire && (
          <div className="max-w-3xl mx-auto shadow-xl p-2 rounded-xl">
            <h1 className="text-center text-2xl my-5">
              Vyplnění dotazníku{" "}
              <span className="text-purple-700">{questionnaire?.name}</span>
            </h1>
            <p>{questionnaire.description}</p>
            <br />
            <hr />
            <p className="font-bold text-xl py-2 my-2 text-center flex flex-row justify-around">
              <input
                type="date"
                value={createdAt.toLocaleDateString()}
                onChange={({ target }) => {
                  setCreatedAt(new Date(target.value));
                }}
              />
              {createdAt.toLocaleDateString()}
            </p>
            <hr />
            <form onSubmit={handleFormSubmit}>
              {questionnaire.questions.map((question, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <label>
                    {index + 1}. {question}
                  </label>
                  <FormInputRange
                    key={index}
                    max={questionnaire.maxrange}
                    min={0}
                    value={questionAndAnswers?.[question] || 0}
                    returnFunction={(val: number) => {
                      handleRangeChange(val, question);
                    }}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary">
                Odeslat
              </button>
            </form>
          </div>
        )
      }
    </MainLayout>
  );
};

export default CreateQuestionnaireByPatient;
