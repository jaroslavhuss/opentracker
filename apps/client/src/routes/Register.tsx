import React, { useState, useEffect } from "react";
import {
  BsArrowCounterclockwise,
  BsExclamationCircleFill,
  BsInfoLg,
  BsKey,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePasswords,
  isPasswordValid,
  isInputEmpty,
} from "../utils/InputValidations";
import { useDispatch } from "react-redux";
import { setError } from "../store/gsms/errorSlice";
import { IRegisterFormData } from "../Entities/interfaces/register.interface";
import {
  emptyRegisterFormData,
  generateRandomLoginId,
} from "../Entities/defaults/register.empty";
import { AxiosResponse } from "axios";
import { registerUser } from "../APIs/Users";
import { setSuccess } from "../store/gsms/successSlice";
import { SecurityQuestions } from "../utils/SecurityQuestions";
interface Props {}
const Register: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegisterFormData>(
    emptyRegisterFormData
  );

  const generateRandomQuestions = () => {
    const randomQuestion1 = Math.floor(
      Math.random() * SecurityQuestions.length
    );
    const randomQuestion2 = Math.floor(
      Math.random() * SecurityQuestions.length
    );
    if (randomQuestion1 === randomQuestion2) {
      generateRandomQuestions();
      return;
    }
    setFormData({
      ...formData,
      securityQuestion1: SecurityQuestions[randomQuestion1],
      securityQuestion2: SecurityQuestions[randomQuestion2],
    });
  };
  useEffect(() => {
    //set security questions - each must be unique, use SecurityQuestions array
    generateRandomQuestions();

    return () => {
      setFormData(emptyRegisterFormData);
    };
  }, []);

  const handleRegistrationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const passValid: boolean = isPasswordValid(formData.password);
    if (!passValid) {
      dispatch(
        setError({
          message: "Heslo musí obsahovat alespoň 8 znaků, písmeno a číslo!",
          rawData: "Dobrým příkladem může být heslo 'ed992ske'",
        })
      );
      return;
    }
    const passMatch: boolean = validatePasswords(
      formData.password,
      formData.confirmedPassword
    );
    if (!passMatch) {
      dispatch(
        setError({
          message: "Hesla se neshodují",
          rawData: "Zkontrolujte prosím, že obě hesla jsou naprosto stejná!",
        })
      );
      return;
    }

    const nicknameValid: boolean = isInputEmpty(formData.loginID);
    if (!nicknameValid) {
      dispatch(
        setError({
          message: "Email není validní",
          rawData:
            "email nesmí obsahovat diakritiku a musí být ve formátu například: huss@richtergedeon.cz",
        })
      );
      return;
    }

    if (
      formData.securityAnswer1 === null ||
      formData.securityAnswer2 === undefined
    ) {
      dispatch(
        setError({
          message: "Odpovědi na bezpečnostní otázky nesmí být prázdné",
          rawData: "Zvolte prosím jiné odpovědi",
        })
      );
      return;
    }

    if (
      formData.securityAnswer2 === null ||
      formData.securityAnswer2 === undefined
    ) {
      dispatch(
        setError({
          message: "Odpovědi na bezpečnostní otázky nesmí být prázdné",
          rawData: "Zvolte prosím jiné odpovědi",
        })
      );
      return;
    }

    if (formData.securityQuestion1 === formData.securityQuestion2) {
      dispatch(
        setError({
          message:
            "Došlo k chybě vygenerování otázek, prosím, načtěte znovu okno prohlížeče",
          rawData: "Zvolte prosím jiné otázky",
        })
      );
      return;
    }

    if (formData.securityAnswer1 === "" || formData.securityAnswer2 === "") {
      dispatch(
        setError({
          message: "Odpovědi na bezpečnostní otázky nesmí být prázdné",
          rawData: "Zvolte prosím jiné odpovědi",
        })
      );
      return;
    }

    if (formData.securityAnswer1 === formData.securityAnswer2) {
      dispatch(
        setError({
          message: "Odpovědi na bezpečnostní otázky nesmí být stejné",
          rawData: "Zvolte prosím jiné odpovědi",
        })
      );
      return;
    }

    const response: AxiosResponse = await registerUser(formData);
    if (response) {
      navigate("/");
      dispatch(
        setSuccess({
          message: `Registrace proběhla úspěšně. Prosím, uložte si své přihlašovací údaje:\n LoginID: ${formData.loginID}\n\n \n  Odpovědi na bezpečnostní otázky: ${formData.securityAnswer1}, ${formData.securityAnswer2}`,
          rawData: "Nyní se můžete přihlásit",
        })
      );
      setFormData(emptyRegisterFormData);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col w-full max-w-sm px-4 py-8  rounded-lg shadow-lg sm:px-6 md:px-8 lg:px-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800">
        <div className="self-center mb-6 text-xl font-light text-white sm:text-2xl dark:text-white">
          Registrace
        </div>
        <p className=" text-sm text-white">
          Vážený uživateli, tato registrace je speciálně navržena tak, aby
          neobsahovala žádné osobní údaje, skrze které by Vás bylo možné
          identifikovat.{" "}
          <span className="text-red-400 font-bold">
            Prosím, v žádném případě nezadávejte nic, co by Vás mohlo
            identifikovat. Při porušení těchto podmínek si provozovatel aplikace
            vyhrazuje právo Váš účet včetně všech dat smazat.
          </span>
        </p>
        <div className="mt-8">
          <form
            action="#"
            autoComplete="off"
            className="relative"
            onSubmit={handleRegistrationSubmit}
          >
            <div className="grid grid-cols-12 mb-2 gap-1 w-full justify-center align-middle">
              <div className="flex flex-col mb-2 col-span-10">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <BsInfoLg />
                  </span>
                  <input
                    name="loginID"
                    type="text"
                    className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent font-bold"
                    placeholder="Unikátní přezdívka"
                    autoComplete="off"
                    value={formData?.loginID}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        loginID: e.target.value,
                      });
                    }}
                    disabled={true}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setFormData({
                    ...formData,
                    loginID: generateRandomLoginId(),
                  });
                }}
                className="bg-white border-l border-b p-0 m-0 border-gray-300 text-gray-500 shadow-sm text-sm  col-span-2 flex justify-center items-center rounded-r-md"
              >
                <BsArrowCounterclockwise className=" text-xl" />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsKey />
                </span>
                <input
                  autoComplete="off"
                  type="password"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Heslo"
                  value={formData?.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsKey />
                </span>
                <input
                  autoComplete="off"
                  type="password"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Zopakujte své heslo znovu"
                  value={formData?.confirmedPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmedPassword: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 mb-2 mt-10 gap-1 w-full justify-center align-middle">
              <span className="col-span-10 rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm font-bold">
                {formData?.securityQuestion1}
              </span>
              <div
                onClick={generateRandomQuestions}
                className="bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm  col-span-2 p-2 flex justify-center items-center rounded-r-md"
              >
                <BsArrowCounterclockwise className=" text-xl" />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span
                  className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm tooltip"
                  data-tip="Pokud zapomenete heslo, zeptáme se Vás přímo na tuto otázku a je potřeba, abyste odpověděli stejně!"
                >
                  <BsExclamationCircleFill />
                </span>
                <input
                  autoComplete="off"
                  type="text"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Odpověď na bezpečnostní otázku 1"
                  value={formData?.securityAnswer1}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      securityAnswer1: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mb-2 gap-1 w-full justify-center align-middle">
              <span className="col-span-10 rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm font-bold">
                {formData?.securityQuestion2}
              </span>
              <div
                onClick={generateRandomQuestions}
                className="bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm  col-span-2 p-2 flex justify-center items-center rounded-r-md"
              >
                <BsArrowCounterclockwise className=" text-xl" />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span
                  className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm tooltip"
                  data-tip="Pokud zapomenete heslo, zeptáme se Vás přímo na tuto otázku a je potřeba, abyste odpověděli stejně!"
                >
                  <BsExclamationCircleFill />
                </span>
                <input
                  autoComplete="off"
                  type="text"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Odpověď na bezpečnostní otázku 1"
                  value={formData?.securityAnswer2}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      securityAnswer2: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex w-full mt-8">
              <button
                type="submit"
                className="py-2 px-4 focus:ring-offset-purple-200
              text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-slate-800 shadow-lg hover:bg-slate-400"
              >
                Zaregistrovat se
              </button>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex mr-auto">
                <Link
                  to="/"
                  className="inline-flex text-xs font-thin sm:text-sm text-white hover:text-gray-700 dark:hover:text-white"
                >
                  Už máte účet? Přihlaste se!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
