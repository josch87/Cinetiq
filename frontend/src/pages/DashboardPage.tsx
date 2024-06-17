import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";
import { Grid, GridItem, Text } from "@chakra-ui/react";
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
        gridTemplateColumns={"2fr 1fr"}
        gap={4}
      >
        <GridItem w="100%" h="10">
          <DashboardWidget heading="Welcome to the Film Festival Organizer!">
            <Text pb={2}>
              We're excited to have you on board. Our platform is designed to
              help you efficiently manage and coordinate all aspects of our film
              festivals. Whether you're scheduling screenings, handling
              submissions, or communicating with participants, we've got you
              covered. Let's work together to create an amazing festival
              experience.
            </Text>
            <Text>Happy organizing!</Text>
          </DashboardWidget>
        </GridItem>
      </Grid>
    </DefaultPageTemplate>
  );
}
