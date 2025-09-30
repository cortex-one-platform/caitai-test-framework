import { vi } from 'vitest';

// Mock context creators
export const createMockAuthContext = (overrides = {}) => ({
  user: {
    id: 'mock-user-id',
    email: 'mock@example.com',
    name: 'Mock User',
    role: 'user'
  },
  isAuthenticated: true,
  login: vi.fn().mockResolvedValue({ success: true }),
  logout: vi.fn().mockResolvedValue({ success: true }),
  register: vi.fn().mockResolvedValue({ success: true }),
  ...overrides
});

export const createMockThemeContext = (overrides = {}) => ({
  theme: 'light',
  toggleTheme: vi.fn(),
  setTheme: vi.fn(),
  ...overrides
});

export const createMockStoreContext = (overrides = {}) => ({
  state: {
    user: null,
    products: [],
    cart: []
  },
  dispatch: vi.fn(),
  getState: vi.fn().mockReturnValue({}),
  subscribe: vi.fn(),
  ...overrides
});

export const createMockRouterContext = (overrides = {}) => ({
  pathname: '/',
  query: {},
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  ...overrides
});

export const createMockNotificationContext = (overrides = {}) => ({
  notifications: [],
  addNotification: vi.fn(),
  removeNotification: vi.fn(),
  clearNotifications: vi.fn(),
  ...overrides
});

// Mock context hook
export const mockUseContext = (contextValue) => {
  return vi.fn().mockReturnValue(contextValue);
};

// Mock context provider
export const MockContextProvider = ({ value, children }) => {
  return children;
};

export default {
  createMockAuthContext,
  createMockThemeContext,
  createMockStoreContext,
  createMockRouterContext,
  createMockNotificationContext,
  mockUseContext,
  MockContextProvider
};
