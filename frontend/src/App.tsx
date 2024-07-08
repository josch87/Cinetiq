import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [user, setUser] = useState<GithubUserAuthType | null | undefined>(
    undefined
  );

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
    </>
  );
}

export default App;
