import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import socket from "./socket";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DonorSearchPage from "./pages/donor/DonorSearchPage";
import CreateRequestPage from "./pages/requests/CreateRequestPage";
import AllRequestsPage from "./pages/requests/AllRequestsPage";
import MyRequestsPage from "./pages/requests/MyRequestsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import HospitalPage from "./pages/hospitals/HospitalPage";
import EmergencySearchPage from "./pages/search/EmergencySearchPage";
import EmergencyAlertsPage from "./pages/alerts/EmergencyAlertsPage";
import EmergencyMapPage from "./pages/maps/EmergencyMapPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import NotFoundPage from "./pages/NotFoundPage";

import {
  useNotifications,
} from "./context/NotificationContext";

function App() {

  const {
    addNotification,
  } = useNotifications();

  useEffect(() => {

    socket.connect();

    socket.on(
      "new-request",
      () => {

        toast.success(
          "New Emergency Blood Request"
        );

      }
    );

    socket.on(
      "request-response",
      () => {

        toast.success(
          "A Donor Responded"
        );

      }
    );

    socket.on(
      "request-status-updated",
      (data) => {

        toast.success(
          `Request ${data.status}`
        );

      }
    );

    socket.on(
      "emergency-alert",
      (data) => {

        toast.error(
          `${data.bloodGroup} Blood Required`
        );

        addNotification(data);

      }
    );

    return () => {

      socket.off("new-request");
      socket.off("request-response");
      socket.off("request-status-updated");
      socket.off("emergency-alert");

      socket.disconnect();

    };

  }, [addNotification]);

  return (
    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/donors"
        element={
          <ProtectedRoute>
            <DonorSearchPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-request"
        element={
          <ProtectedRoute>
            <CreateRequestPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <AllRequestsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-requests"
        element={
          <ProtectedRoute>
            <MyRequestsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/hospitals"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <HospitalPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency-search"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EmergencySearchPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency-alerts"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EmergencyAlertsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency-map"
        element={
          <ProtectedRoute>
            <EmergencyMapPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
}

export default App;