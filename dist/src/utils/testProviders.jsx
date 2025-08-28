import React from 'react';
import { vi } from 'vitest';

// Mock context providers for testing
export const AuthProvider = ({ children }) => {
  const mockAuthContext = {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user'
    },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn()
  };

  return (
    <div data-testid="auth-provider">
      {children}
    </div>
  );
};

export const ThemeProvider = ({ children }) => {
  const mockThemeContext = {
    theme: 'light',
    toggleTheme: vi.fn()
  };

  return (
    <div data-testid="theme-provider">
      {children}
    </div>
  );
};

export const StoreProvider = ({ children }) => {
  const mockStoreContext = {
    state: {},
    dispatch: vi.fn()
  };

  return (
    <div data-testid="store-provider">
      {children}
    </div>
  );
};

// Combined providers component
export const TestProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StoreProvider>
          {children}
        </StoreProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default TestProviders;
