import { ArrowRight } from "lucide-react"
import { Button, Container, Flex, Heading, Section, Text } from "@radix-ui/themes"

export const AppCallToAction = () => {
  return (
    <Section className="w-full py-12 md:py-24 lg:py-32 bg-red-600 text-white">
      <Container>
        <Flex direction="column" align="center" justify="center" className="space-y-4 text-center">
          <Flex direction="column" className="space-y-2">
            <Heading size="8" className="font-bold tracking-tighter text-white">
              Ready to Transform Your Fire Watch Operations?
            </Heading>
            <Text size="5" className="max-w-[600px] text-red-100">
              Join hundreds of companies who trust Redline to manage their fire watch staffing with confidence and
              compliance.
            </Text>
          </Flex>
          <Flex direction={{ initial: "column", sm: "row" }} gap="2" className="min-[400px]:flex-row">
            <Button size="4" variant="solid" className="bg-white text-red-600 hover:bg-gray-100">
              Request Demo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              size="4"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
            >
              Contact Sales
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Section>
  )
}
