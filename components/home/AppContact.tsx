"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Mail, MapPin, Phone } from "lucide-react";

import type React from "react";
import { useState } from "react";

export const AppContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
    setIsSubmitting(false);

    // You would typically send the data to your backend here
    console.log("Form submitted:", formData);
  };

  return (
    <Container id="contact" className="py-16 md:py-24 bg-red-100">
      <Flex direction="column" align="center" className="text-center mb-12">
        <Heading size="8" className="mb-4">
          Get in Touch
        </Heading>
        <Text size="5" className="max-w-2xl">
          Ready to streamline your fire watch operations? Contact our team to
          learn how REDLINE &trade; can transform your staffing management.
        </Text>
      </Flex>

      <Grid columns={{ initial: "1", lg: "2" }} gap="8">
        {/* Contact Information */}
        <Flex direction="column" className="space-y-8">
          <Box>
            <Heading size="6" className="mb-6">
              Contact Information
            </Heading>
            <Flex direction="column" className="space-y-6">
              <Flex align="center" gap="4">
                <Box className="p-3 bg-white rounded-lg">
                  <Phone className="h-6 w-6 text-red-600" />
                </Box>
                <Box>
                  <Text as="div" weight="medium" size="3">
                    Phone
                  </Text>
                  <Text as="div" size="3">
                    +1 (555) 123-4567
                  </Text>
                </Box>
              </Flex>

              <Flex align="center" gap="4">
                <Box className="p-3 bg-white rounded-lg">
                  <Mail className="h-6 w-6 text-red-600" />
                </Box>
                <Box>
                  <Text as="div" weight="medium" size="3">
                    Email
                  </Text>
                  <Text as="div" size="3">
                    contact@redlinestaff.com
                  </Text>
                </Box>
              </Flex>

              <Flex align="center" gap="4">
                <Box className="p-3 bg-white rounded-lg">
                  <MapPin className="h-6 w-6 text-red-600" />
                </Box>
                <Box>
                  <Text as="div" weight="medium" size="3">
                    Address
                  </Text>
                  <Text as="div" size="3">
                    123 Safety Street
                    <br />
                    Fire Watch City, FW 12345
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>

          <Box>
            <Heading size="5" className="mb-4">
              Business Hours
            </Heading>
            <Flex direction="column" className="space-y-2">
              <Flex justify="between">
                <Text size="3">Monday - Friday</Text>
                <Text size="3">8:00 AM - 6:00 PM</Text>
              </Flex>
              <Flex justify="between">
                <Text size="3">Saturday</Text>
                <Text size="3">9:00 AM - 4:00 PM</Text>
              </Flex>
              <Flex justify="between">
                <Text size="3">Sunday</Text>
                <Text size="3">Emergency Only</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>

        {/* Contact Form */}
        <Box className="bg-white p-8 rounded-lg shadow-sm border">
          <Heading size="6" className="mb-6">
            Send us a message
          </Heading>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              <Box>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  className="mb-2 block"
                >
                  Full Name *
                </Text>
                <TextField.Root
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </Box>
              <Box>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  className="mb-2 block"
                >
                  Email Address *
                </Text>
                <TextField.Root
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  required
                />
              </Box>
            </Grid>

            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              <Box>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  className="mb-2 block"
                >
                  Company
                </Text>
                <TextField.Root
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                />
              </Box>
              <Box>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  className="mb-2 block"
                >
                  Phone Number
                </Text>
                <TextField.Root
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </Box>
            </Grid>

            <Box>
              <Text as="label" size="2" weight="medium" className="mb-2 block">
                Message *
              </Text>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your fire watch staffing needs..."
                required
                rows={5}
              />
            </Box>

            <Button
              type="submit"
              style={{ width: "100%" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Box>
      </Grid>
    </Container>
  );
};
