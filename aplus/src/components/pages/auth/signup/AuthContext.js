import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3009/api/auth/check');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3009/api/auth/login', credentials);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3009/api/auth/register', userData);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3009/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
