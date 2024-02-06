import { useState } from "react";
import HCPImage from "../../assets/rg-girl.png";
import { startPasswordReset, validateSecurityAnswers } from "../../APIs/Users";
import { FC } from "react";

interface Props {
  turnOff: () => void;
}
const PasswordRenewal: FC<Props> = ({ turnOff }) => {
  const [progress, setProgress] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<{
    email: string;
    securityQuestion1: string;
    securityQuestion2: string;
    securityAnswer1: string;
    securityAnswer2: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const startReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await startPasswordReset(email);

    if (data.email) {
      setProgress(1);
      setUserData(data);
    } else {
      console.log(data);
      setErrorMessage(data.message.message);

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const validateSecurityAnswersHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (userData === null) return;
    const data = await validateSecurityAnswers(
      userData?.email,
      userData?.securityAnswer1,
      userData?.securityAnswer2
    );
    if (data.password) {
      setErrorMessage(`Vaše heslo je: ${data.password}`);
    }
    if (data.message) {
      setErrorMessage(data.message.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      console.log(data);
    }
  };
  return (
    <div className="w-full h-full bg-white bg-opacity-95 z-50 p-10 rounded-lg absolute top-0 left-0">
      <div className="flex justify-end">
        <button className="text-3xl font-bold text-slate-600" onClick={turnOff}>
          X
        </button>
      </div>
      <h2 className="text-4xl text-center gradientPurpleFont font-bold">
        Vítejte v procesu obnovy hesla
      </h2>
      <div className="max-w-7xl block mx-auto mt-10 text-xl">
        {progress === 0 && (
          <>
            <p>
              V následujících krocích Vás provedeme procesem obnovy hesla. Tento
              proces jsme vymysleli tak, aby se obešel bez vnějšího přístupu na
              internet (kvůli bezpečnosti), proto musíte odpovědět na{" "}
              <strong>dvě bezpečnostní otázky</strong>, na které jsme se Vás
              ptali během registrace. Pokud neznáte odpověď na bezpečnostní
              otázky, <strong>musíte kontaktovat svého správce sítě.</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 m-2 justify-center align-middle">
              <div className="col-span-12 md:col-span-4">
                <img
                  src={HCPImage}
                  alt="HCP"
                  className=" rounded-full shadow-2xl"
                />
              </div>
              <div className="col-span-12 md:col-span-8 self-center p-2 rounded-lg bg-gradient-to-br from-red-200 via-red-100 to-purple-300">
                <form className=" form-control p-3" onSubmit={startReset}>
                  <label
                    htmlFor="email"
                    className="text-2xl font-bold text-slate-600"
                  >
                    Zadejte svůj email
                  </label>
                  <br />
                  <input
                    type="email"
                    className="form-control shadow-2xl input-success p-2 rounded-xl text-center"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="submit"
                    value="Potvrdit svůj registrační email"
                    className="end-0 p-2 bg-gradient-to-br from-slate-500 via-slate-500 to-slate-700 rounded-xl font-bold text-white inline-block mx-auto mt-4 cursor-pointer text-center"
                  />
                </form>
                {errorMessage}
              </div>
            </div>
          </>
        )}

        {progress === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 m-2 justify-center align-middle">
            <div className="col-span-12 md:col-span-4">
              <img
                src={HCPImage}
                alt="HCP"
                className=" rounded-full shadow-2xl"
              />
            </div>
            <div className="col-span-12 md:col-span-8 self-center p-2 rounded-lg bg-gradient-to-br from-red-200 via-red-100 to-purple-300">
              <form
                className=" form-control p-3"
                onSubmit={validateSecurityAnswersHandler}
              >
                <label
                  htmlFor="email"
                  className="text-2xl font-bold text-slate-600"
                >
                  {userData?.securityQuestion1}
                </label>
                <br />
                <input
                  type="text"
                  className="form-control shadow-2xl input-success p-2 rounded-xl text-center"
                  value={userData?.securityAnswer1}
                  onChange={(e) => {
                    //@ts-ignore
                    setUserData({
                      ...userData,
                      securityAnswer1: e.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="email"
                  className="text-2xl font-bold text-slate-600"
                >
                  {userData?.securityQuestion1}
                </label>
                <br />
                <input
                  type="text"
                  className="form-control shadow-2xl input-success p-2 rounded-xl text-center"
                  value={userData?.securityAnswer2}
                  onChange={(e) => {
                    //@ts-ignore
                    setUserData({
                      ...userData,
                      securityAnswer2: e.target.value,
                    });
                  }}
                />
                <input
                  type="submit"
                  value="Odeslat své odpovědi"
                  className="end-0 p-2 bg-gradient-to-br from-slate-500 via-slate-500 to-slate-700 rounded-xl font-bold text-white inline-block mx-auto mt-4 cursor-pointer text-center"
                />
              </form>
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRenewal;
