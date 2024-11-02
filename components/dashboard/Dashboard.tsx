"use client";

import { useAuthContext } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <User className="h-6 w-6 text-primary" />
            <span className="font-medium">
              Welcome, {user?.firstName || 'User'}
            </span>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add your dashboard content here */}
        </div>
      </main>
    </div>
  );
}