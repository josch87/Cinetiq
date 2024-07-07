import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.tsx";
import { useEffect, useState } from "react";
import { loadUser } from "./services/authService.ts";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import ContentPage from "./pages/content/ContentPage.tsx";
import ContentDetailsPage from "./pages/content/ContentDetailsPage.tsx";
import ContentCreationDrawer from "./components/content/ContentCreationDrawer/ContentCreationDrawer.tsx";
import StaffPage from "./pages/management/StaffPage.tsx";
import { GithubUserAuthType } from "./model/githubModel.ts";
import PersonCreationDrawer from "./components/person/PersonCreationDrawer/PersonCreationDrawer.tsx";
import PeoplePage from "./pages/person/PeoplePage.tsx";
import PersonDetailsPage from "./pages/person/PersonDetailsPage.tsx";
import SidebarPageTemplate from "./pages/templates/SidebarPageTemplate.tsx";
import NotFoundPage from "./pages/error/NotFoundPage.tsx";
import LoginModal from "./components/modal/LoginModal.tsx";
import { useLoginModalStore } from "./store/authStore.ts";
import axios from "axios";

function App() {
  const [user, setUser] = useState<GithubUserAuthType | null | undefined>(
    undefined
  );
  const location = useLocation();
  const { onOpen: onLoginModalOpen } = useLoginModalStore();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 && location.pathname !== "/") {
          onLoginModalOpen();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [location, onLoginModalOpen]);

  useEffect(() => {
    loadUser().then(setUser);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoutes user={user} />}>
          <Route element={<SidebarPageTemplate user={user} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/content/:id" element={<ContentDetailsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:id" element={<PersonDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
      <ContentCreationDrawer />
      <PersonCreationDrawer />
      <LoginModal />
    </>
  );
}

export default App;
