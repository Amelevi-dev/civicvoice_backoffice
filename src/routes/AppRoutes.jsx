import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/dashboard";

import CreateConsultation from "../pages/consultations/CreateConsultation";

import ConsultationStats from "../pages/consultations/ConsultationStats";

import Engagement from "../pages/engagements/Engagement";

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
          element={<DashboardLayout />}
        >

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
            path="engagements"
            element={<Engagement />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;