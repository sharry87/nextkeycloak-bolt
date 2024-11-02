"use client";

import { Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../auth/AuthProvider";

export function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold">Secure Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.name || 'User'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}