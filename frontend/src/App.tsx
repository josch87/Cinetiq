import "./App.css";
import LoginPage from "./pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  const loadUser = () => {
    axios
      .get("/api/auth/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Routes>
      <Route element={<LoginPage user={user} />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
