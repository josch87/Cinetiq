import "./App.css";
import LoginPage from "./pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.tsx";
import { useEffect, useState } from "react";
import { loadUser } from "./services/userService.ts";

function App() {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    loadUser().then(setUser);
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
