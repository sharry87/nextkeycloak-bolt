"use client";

import { Shield, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthContext } from "./AuthProvider";

export function LoginCard() {
  const { login, error, isLoading } = useAuthContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <Shield className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">
            Please sign in to access your dashboard
          </p>
          {error && (
            <p className="text-sm text-destructive mt-2 bg-destructive/10 p-2 rounded">
              {error.message}
            </p>
          )}
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={login}
          disabled={isLoading}
        >
          <LogIn className="mr-2 h-4 w-4" />
          {isLoading ? 'Connecting...' : 'Sign In with Keycloak'}
        </Button>
      </Card>
    </div>
  );
}