
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <section className="section-padding bg-apple-black text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter to receive updates on new product arrivals, special offers, and Apple news.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="apple-button whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Apple Deals Ghana.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
