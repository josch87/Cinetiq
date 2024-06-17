import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type DashboardWidgetProps = {
  children: ReactNode;
  heading: string;
};

export default function DashboardWidget({
  children,
  heading,
}: DashboardWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{heading}</Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
