"use client";

import { useState, useEffect } from 'react';
import { initKeycloak, getKeycloak } from '@/lib/keycloak';
import { useToast } from '@/components/ui/use-toast';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const keycloak = initKeycloak();
        if (!keycloak) {
          throw new Error('Failed to initialize Keycloak');
        }

        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          checkLoginIframe: false,
          pkceMethod: 'S256',
          enableLogging: true
        });

        if (authenticated) {
          const userProfile = await keycloak.loadUserProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
          toast({
            title: "Welcome back!",
            description: `Signed in as ${userProfile.firstName || userProfile.username}`,
          });
        }
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Keycloak:', err);
        setError(err instanceof Error ? err : new Error('Authentication failed'));
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Failed to connect to authentication server",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [toast]);

  const login = async () => {
    try {
      const keycloak = getKeycloak();
      if (!keycloak) {
        throw new Error('Keycloak not initialized');
      }
      await keycloak.login({
        redirectUri: window.location.origin,
        scope: 'openid profile email'
      });
    } catch (err) {
      console.error('Login failed:', err);
      setError(err instanceof Error ? err : new Error('Login failed'));
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "Failed to sign in. Please try again.",
      });
    }
  };

  const logout = async () => {
    try {
      const keycloak = getKeycloak();
      if (!keycloak) {
        throw new Error('Keycloak not initialized');
      }
      await keycloak.logout({
        redirectUri: window.location.origin
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout
  };
};