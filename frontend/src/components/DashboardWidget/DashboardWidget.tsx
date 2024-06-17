import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type DashboardWidgetProps = {
  children: ReactNode;
};

export default function DashboardWidget({ children }: DashboardWidgetProps) {
  return (
    <Box border="1px solid" borderColor="gray.400" rounded="lg" p={4}>
      {children}
    </Box>
  );
}
