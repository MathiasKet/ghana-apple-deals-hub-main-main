
import React from "react";
import AnimatedBanner from "@/components/AnimatedBanner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Account = () => {
  return (
    <>
      <AnimatedBanner />
      
      <main className="flex-grow container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Navigation</h2>
              <nav className="space-y-2">
                <a href="#" className="block p-2 text-apple-blue hover:bg-gray-50 rounded">My Profile</a>
                <a href="#" className="block p-2 text-apple-black hover:bg-gray-50 rounded">Order History</a>
                <a href="#" className="block p-2 text-apple-black hover:bg-gray-50 rounded">Addresses</a>
                <a href="#" className="block p-2 text-apple-black hover:bg-gray-50 rounded">Payment Methods</a>
                <a href="#" className="block p-2 text-apple-black hover:bg-gray-50 rounded">Wishlist</a>
                <a href="#" className="block p-2 text-apple-black hover:bg-gray-50 rounded">Notifications</a>
                <a href="#" className="block p-2 text-red-500 hover:bg-gray-50 rounded">Sign Out</a>
              </nav>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">My Profile</h2>
              
              <Alert className="mb-6">
                <AlertTitle>Complete your profile</AlertTitle>
                <AlertDescription>
                  Add your phone number and delivery address to expedite checkout.
                </AlertDescription>
              </Alert>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
