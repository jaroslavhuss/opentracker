import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { store } from "../store/store";
import { formatErrorMessage } from "../utils/FormatError";
import { GLOBAL_URL } from "../GLOBAL_URL";
import { setError } from "../store/gsms/errorSlice";
import { setSuccess } from "../store/gsms/successSlice";
export const createQuestionnaire = async (questionnaire: IQuestionnaire) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );

      return;
    }
    const response: Response = await fetch(GLOBAL_URL + "/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(questionnaire),
    });

    const data = await response.json();

    if (data.statusCode === 401) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );
      return;
    }

    store.dispatch(
      setSuccess({
        message: "Dotazník byl úspěšně vytvořen",
        rawData: data,
      })
    );
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const getAllQuestionnaires = async () => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );

      return;
    }
    const response: Response = await fetch(GLOBAL_URL + "/questionnaire", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();
    if (data.statusCode === 401) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );
      return [];
    }
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const getQuestionnaireById = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );

      return;
    }
    const response: Response = await fetch(
      GLOBAL_URL + `/questionnaire/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    if (data.statusCode === 401) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );
      return;
    }
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const deleteQuestionnaireById = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );

      return;
    }
    const response: Response = await fetch(
      GLOBAL_URL + `/questionnaire/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    if (data.statusCode === 401) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );
      return;
    }

    if (data) {
      store.dispatch(
        setSuccess({
          message: "Dotazník byl úspěšně smazán",
          rawData: `Dotazník s id ${id} byl úspěšně smazán`,
        })
      );
    }
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const updateQuestionnaireById = async (
  id: string,
  questionnaire: IQuestionnaire
) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );

      return;
    }
    const response: Response = await fetch(
      GLOBAL_URL + `/questionnaire/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(questionnaire),
      }
    );

    const data = await response.json();

    if (data.statusCode === 401) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );
      return;
    }
    if (data) {
      store.dispatch(
        setSuccess({
          message: "Dotazník byl úspěšně upraven",
          rawData: `Dotazník s id ${id} byl úspěšně upraven`,
        })
      );
    }
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};
