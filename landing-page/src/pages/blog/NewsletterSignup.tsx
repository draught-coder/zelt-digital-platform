
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterSignup = () => (
  <section className="py-20 bg-white shadow-lg">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
      <p className="text-xl text-gray-600 mb-8">Get the latest tax updates and bookkeeping tips delivered to your inbox</p>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-1" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  </section>
);
export default NewsletterSignup;
