import { CheckCircle2 } from "lucide-react"
import { Avatar, Box, Card, Container, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes"

export const AppTestimonials = () => {
  return (
    <Section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <Container>
        <Flex direction="column" align="center" justify="center" className="space-y-4 text-center">
          <Box className="space-y-2">
            <Heading size="8" className="font-bold tracking-tighter">
              Trusted by safety professionals
            </Heading>
            <Text size="5" className="max-w-[900px] text-muted-foreground">
              See what our customers have to say about how Redline has transformed their fire watch operations.
            </Text>
          </Box>
        </Flex>

        <Grid columns={{ initial: "1", lg: "3" }} gap="6" className="mx-auto max-w-5xl py-12">
          <Card>
            <Flex direction="column" gap="4" p="6">
              <Flex gap="1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={i} className="h-5 w-5 fill-red-600 text-white" />
                ))}
              </Flex>
              <Text className="text-muted-foreground">
                "Redline has completely transformed how we manage our fire watch teams. Compliance tracking alone has
                saved us countless hours and potential liability issues."
              </Text>
              <Flex align="center" gap="4">
                <Avatar size="3" fallback="RM" />
                <Box>
                  <Text weight="medium">Robert Martinez</Text>
                  <Text size="2" className="text-muted-foreground">
                    Safety Director, Construction Corp
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="4" p="6">
              <Flex gap="1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={i} className="h-5 w-5 fill-red-600 text-white" />
                ))}
              </Flex>
              <Text className="text-muted-foreground">
                "The scheduling features have eliminated double-bookings and gaps in coverage. We can now confidently
                provide 24/7 fire watch services to our clients."
              </Text>
              <Flex align="center" gap="4">
                <Avatar size="3" fallback="JW" />
                <Box>
                  <Text weight="medium">Jennifer Wilson</Text>
                  <Text size="2" className="text-muted-foreground">
                    Operations Manager, FireGuard Services
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="4" p="6">
              <Flex gap="1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={i} className="h-5 w-5 fill-red-600 text-white" />
                ))}
              </Flex>
              <Text className="text-muted-foreground">
                "As a fire safety consultant, I recommend Redline to all my clients. The certification tracking alone
                ensures they stay compliant with regulations."
              </Text>
              <Flex align="center" gap="4">
                <Avatar size="3" fallback="DT" />
                <Box>
                  <Text weight="medium">David Thompson</Text>
                  <Text size="2" className="text-muted-foreground">
                    Fire Safety Consultant, SafetyFirst
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </Container>
    </Section>
  )
}
