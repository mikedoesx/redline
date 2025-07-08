import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";

import { ArrowRight } from "lucide-react";

export const AppCallToAction = () => {
  return (
    <Container className="w-full px-4 py-12 md:py-24 lg:py-32">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="space-y-4 text-center"
      >
        <Flex direction="column" className="space-y-2">
          <Heading size="8" className="font-bold tracking-tighter">
            Ready to Transform Your Fire Watch Operations?
          </Heading>
          <Text size="5" className="max-w-[600px] mx-auto">
            Join hundreds of companies who trust REDLINE to manage their fire
            watch staffing with confidence and compliance.
          </Text>
        </Flex>
        <Flex
          direction={{ initial: "column", sm: "row" }}
          gap="2"
          className="min-[400px]:flex-row"
        >
          <Button size="4">
            Request Demo <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <Button size="4" variant="outline">
            Contact Sales
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
