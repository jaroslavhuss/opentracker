import React, { useState } from "react";
import { BsAt, BsKey } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { emptyLoginFormData } from "../Entities/defaults/login.empty";
import { loginUser } from "../APIs/Users";
import { isEmailValid, isPasswordValid } from "../utils/InputValidations";
import { setError } from "../store/gsms/errorSlice";

import useSignIn from "react-auth-kit/hooks/useSignIn";
import PasswordRenewal from "../components/GlobalComponents/PasswordRenewal";

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch: Function = useDispatch();
  const signIn = useSignIn();
  const [formData, setformData] = useState(emptyLoginFormData);
  const navigate = useNavigate();
  const [triggerPasswordRenewalProcess, setTriggerPasswordRenewalProcess] =
    useState<boolean>(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const emailValid: boolean = isEmailValid(formData.email);

    if (!emailValid) {
      dispatch(
        setError({
          message: "Email není validní",
          rawData:
            "email nesmí obsahovat diakritiku a musí být ve formátu například:huss@richtergedeon.cz",
        })
      );
      return;
    }

    const response = await loginUser(formData);
    if (response) {
      signIn({
        auth: {
          token: response.tokens.access_token,
          type: "Bearer",
        },
        userState: { user: response.user },
      });

      localStorage.setItem("token", "Bearer " + response.tokens.access_token);

      navigate("/dashboard");
      window.location.reload();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col w-full max-w-sm px-4 py-8  rounded-lg shadow-lg sm:px-6 md:px-8 lg:px-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 transition-all ease-in-out duration-700 hover:scale-105">
        <div className="self-center mb-6 text-xl font-light text-gray-100 sm:text-2xl dark:text-white">
          Přihlášení do svého účtu
        </div>
        <div className="mt-8 ">
          <form
            action="#"
            autoComplete="off"
            className="relative"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsAt />
                </span>
                <input
                  type="text"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your email"
                  value={formData?.email}
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsKey />
                </span>
                <input
                  type="password"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password"
                  value={formData?.password}
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <div
                  onClick={() => {
                    setTriggerPasswordRenewalProcess(true);
                  }}
                  className="inline-flex text-xs font-thin text-white sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                >
                  Zapomněli jste heslo?
                </div>
              </div>
            </div>
            <div className="flex w-full mt-8">
              <button
                type="submit"
                className="py-2 px-4 focus:ring-offset-purple-200
       transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-slate-800 shadow-lg hover:bg-slate-400 text-white"
              >
                Přihlásit se do aplikace
              </button>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex mr-auto">
                <Link
                  to="/register"
                  className="inline-flex text-xs font-thin text-white sm:text-sm hover:text-gray-700 dark:hover:text-white"
                >
                  Nemáte účet? Zaregistrujte se
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {triggerPasswordRenewalProcess && (
        <PasswordRenewal
          turnOff={() => {
            setTriggerPasswordRenewalProcess(false);
          }}
        />
      )}
    </div>
  );
};

export default Login;
