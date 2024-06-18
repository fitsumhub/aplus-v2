import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    // Implement Google Sign-In logic
    // Set user state upon successful sign-in
  };

  const signOut = async () => {
    // Implement sign-out logic
    // Clear user state upon successful sign-out
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

