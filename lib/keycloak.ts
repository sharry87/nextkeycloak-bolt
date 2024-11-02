import Keycloak from 'keycloak-js';

const KEYCLOAK_CONFIG = {
  url: 'http://localhost:9080',
  realm: 'pt001-auth-realmregistration',
  clientId: 'pt001-auth-client-web',
  credentials: {
    secret: 'zdOATtY89dLjFKLmC7UHxIcczJnyK1Sv'
  }
};

let keycloakInstance: Keycloak | null = null;

export const initKeycloak = () => {
  if (typeof window === 'undefined') return null;
  
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: KEYCLOAK_CONFIG.url,
      realm: KEYCLOAK_CONFIG.realm,
      clientId: KEYCLOAK_CONFIG.clientId
    });
  }
  return keycloakInstance;
};

export const getKeycloak = () => keycloakInstance;