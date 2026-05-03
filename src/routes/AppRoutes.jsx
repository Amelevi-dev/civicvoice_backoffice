import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/dashboard";
import CreateConsultation from "../pages/consultations/CreateConsultation";
import ConsultationStats from "../pages/consultations/ConsultationStats";
import Engagement from "../pages/engagements/Engagement";
import VotePage from "../pages/votes/vote";
import Ledger from "../pages/ledger/Ledger";
import AuditReports from "../pages/audit/AuditReports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={<ProtectedRoute />}
        >
          <Route element={<DashboardLayout />}>
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="consultations/create"
              element={<CreateConsultation />}
            />

            <Route
              path="consultations/stats"
              element={<ConsultationStats />}
            />

            <Route
              path="votes"
              element={<VotePage />}
            />

            <Route
              path="engagements"
              element={<Engagement />}
            />

            <Route
              path="ledger"
              element={<Ledger />}
            />
            
            <Route
              path="audit"
              element={<AuditReports />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;