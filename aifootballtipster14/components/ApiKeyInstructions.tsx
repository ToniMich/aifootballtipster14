import React from 'react';

// This component is no longer used as TheSportsDB API calls are now
// securely proxied through a Netlify Function, which uses secrets
// configured on the backend.
const ApiKeyInstructions: React.FC<{ onKeySave: (key: string) => void; }> = () => null;

export default ApiKeyInstructions;