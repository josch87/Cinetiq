import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { VStack } from "@chakra-ui/react";
import NoData from "../../components/NoData/NoData.tsx";

export default function NotFoundPage() {
  return (
    <DefaultPageTemplate
      pageTitle="404"
      pageSubtitle="Page not found"
      warning={false}
    >
      <VStack gap={8}>
        <NoData
          image="SNIFFING_DOG"
          text="Sniffed around everywhere but couldn't find a page at that address."
        />
      </VStack>
    </DefaultPageTemplate>
  );
}
