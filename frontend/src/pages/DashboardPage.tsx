import { Button } from "@chakra-ui/react";

export default function DashboardPage() {
  function logout() {
    const host =
      window.location.host === "localhost:5173"
        ? "http://localhost:8080"
        : window.location.origin;

    window.open(host + "/logout", "_self");
  }

  return (
    <>
      Dashboard
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
