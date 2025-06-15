
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email"),
  company: z.string().optional(),
  contact_number: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormValues = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    const { error } = await supabase.from("contact_messages").insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      company: data.company || null,
      contact_number: data.contact_number || null,
      message: data.message,
    });
    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-white p-5 md:p-6 rounded-xl shadow border border-gray-100 max-w-full space-y-4 transition-all"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="First name"
                    className="h-9 px-3 py-1.5 rounded-md bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last name"
                    className="h-9 px-3 py-1.5 rounded-md bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    className="h-9 px-3 py-1.5 rounded-md bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Company <span className="text-gray-400 font-normal">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company name"
                    className="h-9 px-3 py-1.5 rounded-md bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Contact Number <span className="text-gray-400 font-normal">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone or WhatsApp"
                    className="h-9 px-3 py-1.5 rounded-md bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-800">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your bookkeeping needs…"
                  rows={4}
                  className="min-h-[42px] rounded-md px-3 py-2 bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold shadow-sm text-sm transition-all min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
