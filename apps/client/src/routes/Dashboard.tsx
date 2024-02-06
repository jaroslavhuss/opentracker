import { FC } from "react";
import {
  BsFiletypeJson,
  BsFillGearFill,
  BsFillPlusCircleFill,
  BsListTask,
  BsPersonFillAdd,
  BsPersonLinesFill,
} from "react-icons/bs";
import MainLayout from "../components/Layouts/MainLayout";
import { Link } from "react-router-dom";

interface Props {}

const Dashboard: FC<Props> = ({}) => {
  return (
    <MainLayout>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-12 justify-center align-middle">
        <div className="group card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to="/questionnaire/create">
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center transition-all duration-400 ease-in group-hover:text-green-600 group-hover:translate-x-2">
                Vytvořit nový dotazník
              </h2>
              <br />
              <BsFillPlusCircleFill
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                className="group-hover:text-green-400 transition-all duration-700 ease-in group-hover:translate-x-16"
              />
            </div>
          </Link>
        </div>

        <div className="group card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to="/questionnaire/get">
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center transition-all duration-400 ease-in group-hover:text-green-600 group-hover:translate-x-2">
                Přejít na přehled dotazníků
              </h2>
              <br />
              <BsListTask
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                className="group-hover:text-green-400 transition-all duration-700 ease-in group-hover:translate-x-16"
              />
            </div>
          </Link>
        </div>

        <div className="group card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to="/patient/create">
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center transition-all duration-400 ease-in group-hover:text-green-600 group-hover:translate-x-2">
                Vytvořit nového pacienta
              </h2>
              <br />
              <BsPersonFillAdd
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                className="group-hover:text-green-400 transition-all duration-700 ease-in group-hover:translate-x-16"
              />
            </div>
          </Link>
        </div>
        <div className="group card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to="/patient/get">
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center transition-all duration-400 ease-in group-hover:text-green-600 group-hover:translate-x-2">
                Seznam pacientů
              </h2>
              <br />
              <BsPersonLinesFill
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                className="group-hover:text-green-400 transition-all duration-700 ease-in group-hover:translate-x-16"
              />
            </div>
          </Link>
        </div>
        <div className="group card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to="/settings">
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center transition-all duration-400 ease-in group-hover:text-green-600 group-hover:translate-x-2">
                Nastavení
              </h2>
              <br />
              <BsFillGearFill
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                className="group-hover:text-green-400 transition-all duration-700 ease-in group-hover:translate-x-16"
              />
            </div>
          </Link>
        </div>
        <div className="group card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to={`/export`}>
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center transition-all duration-400 ease-in group-hover:text-green-600 group-hover:translate-x-2">
                Export dat
              </h2>
              <br />
              <BsFiletypeJson
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                className="group-hover:text-green-400 transition-all duration-700 ease-in group-hover:translate-x-16"
              />
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
