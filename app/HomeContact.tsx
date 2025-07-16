"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import { HomeListItem } from "./HomeListItem";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import type React from "react";
import { Textarea } from "@/lib/components/ui/textarea";
import { useState } from "react";

export const HomeContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const list = [
    {
      Icon: Phone,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-foreground",
      titleText: "Phone",
      descriptionText: "+1 (555) 123-4567",
    },
    {
      Icon: Mail,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-foreground",
      titleText: "Email",
      descriptionText: "contact@redlinestaff.com",
    },
    {
      Icon: MapPin,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-foreground",
      titleText: "Address",
      descriptionText: `123 Safety Street, Fire Watch City, FW 12345`,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    <section id="contact" className="px-4 py-12 md:py-24 lg:py-32 bg-muted">
      <HomeSectionHeader
        subtitleClass="text-foreground"
        sectionTitle="Get in Touch"
        subtitle="Ready to streamline your fire watch operations? Contact our team to learn how REDLINE: Fire Watch&trade; can transform your staffing management."
      />

      <div className="container mx-auto grid grid-cols-1 items-center lg:mx-auto lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="flex flex-col space-y-8">
          <div>
            <div className="flex flex-col gap-6">
              {list.map((it) => (
                <HomeListItem key={it.titleText} {...it} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">Business Hours</div>
            <div className="flex justify-between">
              <div>Monday - Friday</div>
              <div>8:00 AM - 6:00 PM</div>
            </div>
            <div className="flex justify-between">
              <div>Saturday</div>
              <div>9:00 AM - 4:00 PM</div>
            </div>
            <div className="flex justify-between">
              <div>Sunday</div>
              <div>Emergency Only</div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label>Message *</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your fire watch staffing needs..."
                  required
                  rows={5}
                />
              </div>

              <Button
                type="submit"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
