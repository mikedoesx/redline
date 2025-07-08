import { ArrowRight, Flame } from "lucide-react"
import { Button, Card, Container, Flex, Grid, Heading, Section, Text, TextField } from "@radix-ui/themes"
import { AppGetOnMobileButtons } from "../AppGetOnMobileButtons"
import Link from "next/link"

export const AppHero = () => {
  return (
    <Section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Container>
        <Grid columns={{ initial: "1", lg: "2" }} gap="6" className="max-w-6xl mx-auto">
          <Flex direction="column" justify="center" className="space-y-4">
            <Flex direction="column" className="space-y-2">
              <Flex align="center" className="text-3xl">
                <Flame color="#dc2626" className="h-8 w-8 sm:h-12 sm:w-12 xl:h-14 xl:w-14" />
                <Heading size="9" className="text-3xl font-bold sm:text-5xl xl:text-6xl/none ml-2">
                  Redline
                </Heading>
              </Flex>

              <Heading size="7" className="font-bold tracking-tighter">
                Fire Watch Staffing Made Simple
              </Heading>

              <Text size="4" className="max-w-[600px] text-muted-foreground">
                The specialized platform that helps you recruit, deploy, and manage fire watch personnel with confidence
                and compliance.
              </Text>
            </Flex>

            <Flex direction={{ initial: "column", sm: "row" }} gap="2">
              <Button size="4">
                Request Demo <ArrowRight className="h-4 w-4 ml-1" />
              </Button>

              <Button size="4" variant="outline">
                Learn More
              </Button>
            </Flex>

            <AppGetOnMobileButtons />
          </Flex>

          {/* Login Card */}
          <Card size="3">
            <Flex direction="column" className="space-y-4">
              <Flex align="center" justify="center">
                <Flame className="h-8 w-8 text-red-600" />
                <Heading size="6" className="ml-2">
                  Login
                </Heading>
              </Flex>

              <Flex direction="column" className="space-y-3">
                <Flex direction="column" className="space-y-1">
                  <Text as="label" size="2" weight="medium">
                    Email
                  </Text>
                  <TextField.Root type="email" placeholder="name@company.com" />
                </Flex>

                <Flex direction="column" className="space-y-1">
                  <Flex align="center" justify="between">
                    <Text as="label" size="2" weight="medium">
                      Password
                    </Text>
                    <Link href="#" className="text-xs text-red-600 hover:underline">
                      Forgot password?
                    </Link>
                  </Flex>
                  <TextField.Root type="password" placeholder="••••••••" />
                </Flex>

                <Button className="w-full">Sign In</Button>
              </Flex>

              <Flex justify="center" className="text-center">
                <Text size="2">
                  <Text className="text-muted-foreground">Don't have an account? </Text>
                  <Link href="#" className="text-red-600 hover:underline">
                    Contact sales
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </Container>
    </Section>
  )
}
