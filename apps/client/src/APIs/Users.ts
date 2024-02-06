import axios, { AxiosResponse } from "axios";
import { setError } from "../store/gsms/errorSlice";
import { IRegisterFormData } from "../Entities/interfaces/register.interface";
import { GLOBAL_URL } from "../GLOBAL_URL";
import { store } from "../store/store";
import { formatErrorMessage } from "../utils/FormatError";
import { ILoginFormData } from "../Entities/interfaces/login.interface";
import { IMyomatosys } from "../Entities/interfaces/myomatosys.interface";
import { IUser } from "../Entities/interfaces/user.interface";
import { setSuccess } from "../store/gsms/successSlice";

export const registerUser = async (userData: IRegisterFormData) => {
  try {
    const response: AxiosResponse = await axios.post(
      GLOBAL_URL + "/auth/register",
      userData
    );
    return response.data;
  } catch (error: AxiosResponse & any) {
    if (error.response.status === 401) {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const loginUser = async (userData: ILoginFormData) => {
  try {
    const response: AxiosResponse = await axios.post(
      GLOBAL_URL + "/auth/login",
      userData
    );
    return response.data;
  } catch (error: AxiosResponse & any) {
    if (error.response.status === 401) {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const updateUser = async (userData: IUser) => {
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
      `${GLOBAL_URL}/auth/udpate/${userData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    store.dispatch(
      setSuccess({
        message:
          "Museli jsme Vás odhlásit, abychom mohli provést změny - přihlašte se prosím znovu",
        rawData: data,
      })
    );
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const createMyomsQuestionnaire = async (
  myomData: IMyomatosys,
  token: string,
  endpoint: string
) => {
  try {
    const response: AxiosResponse = await axios.post(
      GLOBAL_URL + endpoint,
      myomData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: AxiosResponse & any) {
    if (error.response.status === 401) {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};
export const getMyUsers = async (token: string, endpoint: string) => {
  try {
    const response: AxiosResponse = await axios.get(GLOBAL_URL + endpoint, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error: AxiosResponse & any) {
    if (error.response.status === 401) {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

//Delete user by ID
export const deleteUser = async (
  id: string,
  token: string,
  endpoint: string
) => {
  try {
    const response: AxiosResponse = await axios.delete(
      GLOBAL_URL + endpoint + id,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: AxiosResponse & any) {
    if (error.response.status === 401) {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const getTokensExpiration = async (endpoint: string, token: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      GLOBAL_URL + endpoint,
      { token: token.split(" ")[1] },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: AxiosResponse & any) {
    console.log(error);
  }
};

export const updateUserById = async (id: string, user: IUser) => {
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
    const response: Response = await fetch(GLOBAL_URL + "/patient/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    store.dispatch(
      setSuccess({
        message: "Pacient byl úspěšně upraven",
        rawData: data,
      })
    );
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const getUserById = async (id: string) => {
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
    const response: Response = await fetch(GLOBAL_URL + "/me/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const startPasswordReset = async (email: string) => {
  try {
    const response: Response = await fetch(
      GLOBAL_URL + "/auth/password-reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const validateSecurityAnswers = async (
  email: string,
  securityAnswer1: string,
  securityAnswer2: string
) => {
  try {
    const response: Response = await fetch(
      GLOBAL_URL + "/auth/password-reset/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, securityAnswer1, securityAnswer2 }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const resetPassword = async (
  email: string,
  securityAnswer1: string,
  securityAnswer2: string,
  newPassword: string,
  confirmedNewPassword: string
) => {
  try {
    const response: Response = await fetch(
      GLOBAL_URL + "/auth/password-reset/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          securityAnswer1,
          securityAnswer2,
          newPassword,
          confirmedNewPassword,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};
