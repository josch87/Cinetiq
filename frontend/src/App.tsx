import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.tsx";
import { useEffect, useState } from "react";
import { loadUser } from "./services/userService.ts";
import { githubUserType } from "./model/userModel.ts";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import ContentPage from "./pages/ContentPage.tsx";

function App() {
  const [user, setUser] = useState<githubUserType | null | undefined>(
    undefined
  );

  useEffect(() => {
    loadUser().then(setUser);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoutes user={user} />}>
        <Route path="/dashboard" element={<DashboardPage user={user} />} />
        <Route path="/content" element={<ContentPage user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
