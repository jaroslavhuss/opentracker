import React, { useState, useEffect } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import MainLayout from "../Layouts/MainLayout";
import { IUser } from "../../Entities/interfaces/user.interface";
import { emptyUser } from "../../Entities/defaults/user.empty";
import ProfilePicture from "../../assets/rg-doc-profile.png";
import { Link } from "react-router-dom";
const HCPDetail: React.FC = () => {
  const [user, setUser] = useState<IUser>(emptyUser);
  const auth = useAuthUser() as { user: IUser };
  useEffect(() => {
    if (auth) {
      setUser(auth.user);
    }
  }, [auth]);
  return (
    <MainLayout>
      <div className="card w-96 bg-base-100 shadow-xl relative">
        <div className="card-body items-center text-center">
          <p>Zdravíme Vás,</p>
          <h2 className="card-title">{user.name}</h2>
        </div>
        <figure className="px-10">
          <img src={ProfilePicture} alt="Shoes" className="rounded-full" />
        </figure>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/questionnaire-myoms"
            className="px-2 py-2 mx-auto bg-gradient-to-br from-blue-600 to-blue-900 text-white font-bold rounded-md shadow-lg w-full  text-center -mb-4 floating cursor-pointer"
          >
            Dotazník
            <br />
            Myomatóza
          </Link>
          <Link
            to="/questionnaire-endo"
            className="px-2 py-2 mx-auto bg-gradient-to-br from-purple-600 to-purple-900 text-white font-bold rounded-md shadow-lg w-full  text-center -mb-4 floating cursor-pointer"
          >
            Dotazník
            <br />
            Endometrióza
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default HCPDetail;
