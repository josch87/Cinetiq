import { Button } from "@chakra-ui/react";
import { logout } from "../services/userService.ts";

export default function DashboardPage() {
  return (
    <>
      Dashboard
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
