//Default imports
import Navigation from "./components/GlobalComponents/Navigation";
import Success from "./components/GlobalComponents/Success";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Footer from "./components/GlobalComponents/Footer";
import Dashboard from "./routes/Dashboard";
//Named imports
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ISuccessGlobalState } from "./store/store";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import CreateQuestionnaire from "./routes/CreateQuestionnaire";
import GetQuestionnaires from "./routes/GetQuestionnaires";
import UpdateQuestionnaire from "./components/GlobalComponents/UpdateQuestionniare";
import CreatePatient from "./routes/CreatePatient";
import GetPatients from "./routes/GetPatients";
import PatientDetail from "./routes/PatientDetail";
import CreateQuestionnaireByPatient from "./routes/CreateQuestionnaireByPatient";
import Settings from "./routes/Settings";
import Export from "./routes/Export";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const showSuccess: boolean | undefined = useSelector(
    (state: ISuccessGlobalState) => {
      return state.success.showSuccess;
    }
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          {!isAuthenticated() ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            <Route element={<AuthOutlet fallbackPath="/login" />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/questionnaire/create"
                element={<CreateQuestionnaire />}
              />
              <Route
                path="/questionnaire/get"
                element={<GetQuestionnaires />}
              />

              <Route
                path="/questionnaire/:id"
                element={<UpdateQuestionnaire />}
              />

              <Route path="/patient/create" element={<CreatePatient />} />
              <Route path="/patient/get" element={<GetPatients />} />
              <Route path="/patient/:id" element={<PatientDetail />} />
              <Route
                path="/patient/:id/questionnaire/:questionnaireId/create"
                element={<CreateQuestionnaireByPatient />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/export" element={<Export />} />
              <Route path="*" element={<Dashboard />} />
            </Route>
          )}
        </Routes>
        {showSuccess && <Success />}
      </div>
      <Footer />
    </div>
  );
}
