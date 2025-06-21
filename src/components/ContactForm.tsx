import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Only one name field now
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
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
    try {
      console.log('Submitting form data:', data);
      
      const { error } = await supabase.from("contact_messages").insert({
        Name: data.name,
        email: data.email,
        company: data.company || null,
        contact_number: data.contact_number || null,
        message: data.message,
      });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error",
          description: `Failed to send message: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });
        form.reset();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-white p-4 md:p-5 rounded-lg shadow-md border border-gray-100 max-w-full space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="h-9 px-3 py-1.5 rounded bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    autoComplete="name"
                    {...field}
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
                <FormLabel className="text-sm font-semibold text-gray-800">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    className="h-9 px-3 py-1.5 rounded bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-2">
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
                    className="h-9 px-3 py-1.5 rounded bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    autoComplete="organization"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="h-9 px-3 py-1.5 rounded bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                    autoComplete="tel"
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
              <FormLabel className="text-sm font-semibold text-gray-800">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your bookkeeping needs…"
                  rows={3}
                  className="min-h-[38px] rounded px-3 py-2 bg-gray-50 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
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
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded font-semibold shadow-sm text-sm transition-all min-w-[98px] focus:outline-none focus:ring-2 focus:ring-blue-400"
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
