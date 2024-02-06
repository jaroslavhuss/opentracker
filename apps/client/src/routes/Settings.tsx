import { useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useDispatch } from "react-redux";
import { setError } from "../store/gsms/errorSlice";
import { updateUser } from "../APIs/Users";
import { IUser } from "../Entities/interfaces/user.interface";
import useSignOut from "react-auth-kit/hooks/useSignOut";
const Settings = () => {
  const dispatch = useDispatch();
  const signOut = useSignOut();

  const hcp = useAuthUser() as { user: IUser };

  const [currentHCP, setCurrentHCP] = useState(hcp.user || null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentHCP.oldPassword === undefined) {
      dispatch(
        setError({
          message: "Zadejte staré heslo",
          rawData: "",
        })
      );
      return;
    }

    if (currentHCP.name === undefined || currentHCP.name === "") {
      dispatch(
        setError({
          message: "Zadejte jméno",
          rawData: "",
        })
      );
      return;
    }

    if (currentHCP.email === undefined || currentHCP.email === "") {
      dispatch(
        setError({
          message: "Zadejte email",
          rawData: "",
        })
      );
      return;
    }

    if (
      currentHCP.confirmedNewPassword !== undefined &&
      currentHCP.newPassword !== undefined &&
      currentHCP.newPassword !== currentHCP.confirmedNewPassword
    ) {
      dispatch(
        setError({
          message: "Potvrzení nového hesla se neshoduje",
          rawData: "",
        })
      );
      return;
    }

    await updateUser(currentHCP);

    signOut();
  };

  return (
    <MainLayout>
      {currentHCP && (
        <div className="w-full">
          {" "}
          <h1 className="text-center text-2xl mt-10">
            Nastavení pro {hcp.user.name}
          </h1>
          <form
            className=" form-control gap-2 mx-auto flex flex-col items-center mt-10"
            onSubmit={handleSubmit}
          >
            <span className="font-bold mt-2 text-center">Celé jméno</span>
            <input
              type="text"
              className="input input-bordered input-success w-full max-w-xs"
              value={currentHCP.name}
              onChange={(e) =>
                setCurrentHCP({ ...currentHCP, name: e.target.value })
              }
            />
            <span className="font-bold mt-2 text-center">Email</span>
            <input
              type="email"
              className="input input-bordered input-success w-full max-w-xs"
              value={currentHCP.email}
              onChange={(e) =>
                setCurrentHCP({ ...currentHCP, email: e.target.value })
              }
            />
            <span className="font-bold mt-2 text-center">Staré heslo: </span>
            <input
              type="password"
              className="input input-bordered input-success w-full max-w-xs"
              placeholder="Nové heslo"
              onChange={(e) =>
                setCurrentHCP({ ...currentHCP, oldPassword: e.target.value })
              }
            />
            <span className="font-bold mt-2 text-center">Nové heslo: </span>
            <input
              type="password"
              className="input input-bordered input-success w-full max-w-xs"
              placeholder="Nové heslo"
              onChange={(e) =>
                setCurrentHCP({ ...currentHCP, newPassword: e.target.value })
              }
            />
            <span className="font-bold mt-2 text-center">
              Potvrzení nového hesla:{" "}
            </span>
            <input
              type="password"
              className="input input-bordered input-success w-full max-w-xs"
              placeholder="Potvrzení nového hesla"
              onChange={(e) =>
                setCurrentHCP({
                  ...currentHCP,
                  confirmedNewPassword: e.target.value,
                })
              }
            />
            <input
              type="submit"
              className="btn btn-primary w-full max-w-xs"
              value={"Uložit změny"}
            />
          </form>
        </div>
      )}
    </MainLayout>
  );
};

export default Settings;
