import { Badge, Box, Button, Card, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import { Check, Star } from "lucide-react"

export const AppPricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Contact Us",
      description: "Perfect for small fire watch operations",
      features: [
        "Up to 25 personnel",
        "Basic scheduling",
        "Time tracking",
        "Mobile app access",
        "Email support",
        "Basic reporting",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "Contact Us",
      description: "Ideal for growing fire watch companies",
      features: [
        "Up to 100 personnel",
        "Advanced scheduling",
        "GPS tracking & verification",
        "Certification management",
        "Quicksuite integration",
        "Priority support",
        "Advanced reporting",
        "Custom workflows",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "For large-scale fire watch operations",
      features: [
        "Unlimited personnel",
        "Multi-location management",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Advanced analytics",
        "Custom training",
        "SLA guarantee",
      ],
      popular: false,
    },
  ]

  return (
    <Container id="pricing" className="w-full px-4 py-12 md:py-24 lg:py-32 bg-muted">
      <Flex direction="column" align="center" className="text-center mb-12">
        <Badge color="red" size="2" className="mb-4">
          Pricing
        </Badge>
        <Heading size="8" className="mb-4">
          Choose Your Plan
        </Heading>
        <Text size="5" className="text-muted-foreground max-w-2xl">
          Flexible pricing options designed to scale with your fire watch staffing needs. Contact us for custom pricing
          based on your requirements.
        </Text>
      </Flex>

      <Grid columns={{ initial: "1", md: "3" }} gap="6" className="max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? "border-red-600 border-2" : ""}`}>
            {plan.popular && (
              <Box className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge color="red" size="2" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
                </Badge>
              </Box>
            )}

            <Flex direction="column" p="6" className="h-full">
              <Box className="mb-6">
                <Heading size="6" className="mb-2">
                  {plan.name}
                </Heading>
                <Text size="2" className="text-muted-foreground mb-4">
                  {plan.description}
                </Text>
                <Flex align="baseline" className="mb-4">
                  <Text size="7" weight="bold" className="text-red-600">
                    {plan.price}
                  </Text>
                </Flex>
              </Box>

              <Flex direction="column" className="flex-1 mb-6">
                <Text size="3" weight="medium" className="mb-4">
                  What's included:
                </Text>
                <Flex direction="column" className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <Flex key={featureIndex} align="center" gap="3">
                      <Box className="flex-shrink-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </Box>
                      <Text size="2">{feature}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              <Button
                size="3"
                className={`w-full ${plan.popular ? "bg-red-600 hover:bg-red-700" : "bg-gray-900 hover:bg-gray-800"}`}
              >
                Get Started
              </Button>
            </Flex>
          </Card>
        ))}
      </Grid>

      <Flex direction="column" align="center" className="text-center mt-12">
        <Text size="3" className="text-muted-foreground mb-4">
          Need a custom solution? We offer tailored packages for unique requirements.
        </Text>
        <Button variant="outline" size="3">
          Contact Sales for Custom Pricing
        </Button>
      </Flex>
    </Container>
  )
}
