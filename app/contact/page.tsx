"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  CheckCircle,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send the form data to your server
    setIsSubmitting(true);
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl slide-up">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto slide-up">
            Get in touch with us for inquiries about Tirthan Valley
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="slide-in-left">
            <Card className="overflow-hidden border-0 shadow-lg hover-lift">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                <CardTitle>Send us a message</CardTitle>
                <CardDescription className="text-white/90">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Thank you for reaching out. We'll get back to you as soon
                      as possible.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        form.reset();
                      }}
                      className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email"
                                {...field}
                                className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Subject of your message"
                                {...field}
                                className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message"
                                className="min-h-[120px] rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-full py-6 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending Message...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 slide-in-right">
            <Card className="overflow-hidden border-0 shadow-lg hover-lift">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Tirthan Valley, Banjar Tehsil
                      <br />
                      Kullu District, Himachal Pradesh
                      <br />
                      India - 175123
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +91 78078 18119
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      exploretirthanvalley@gmail.com
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href="https://www.instagram.com/thetirthanvalley/"
                      target="_blank"
                      className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg hover-lift">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54570.14806326748!2d77.41693716953123!3d31.63500710000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904f8c0a4e1bea3%3A0x7a73af102a4eb05a!2sTirthan%20Valley!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
