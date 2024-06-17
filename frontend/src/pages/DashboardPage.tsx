import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";
import { Grid, GridItem } from "@chakra-ui/react";
import DashboardWidget from "../components/DashboardWidget/DashboardWidget.tsx";

type DashboardPageProps = {
  user: githubUserType | null | undefined;
};

export default function DashboardPage({ user }: Readonly<DashboardPageProps>) {
  return (
    <DefaultPageTemplate
      pageTitle="Dashboard"
      pageSubtitle="Quick access and overview of all festival data"
      user={user}
    >
      <Grid
        templateAreas={`"main side"
                        "main side"
                        "main side"`}
        gridTemplateRows={"50px 50px 50px"}
        gridTemplateColumns={"2fr 1fr"}
        gap={4}
      >
        <GridItem w="100%" h="10">
          <DashboardWidget />
        </GridItem>
        <GridItem w="100%" h="10">
          test4
        </GridItem>
      </Grid>
    </DefaultPageTemplate>
  );
}
