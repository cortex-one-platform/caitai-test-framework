import { render } from '@testing-library/react';
import { TestProviders } from './testProviders.jsx';

// Enhanced render function with providers
export const renderWithProviders = (ui, options = {}) => {
  const {
    providers = TestProviders,
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => {
    const Providers = providers;
    return <Providers>{children}</Providers>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Render with specific context
export const renderWithAuth = (ui, authState = {}) => {
  const AuthWrapper = ({ children }) => (
    <TestProviders authState={authState}>
      {children}
    </TestProviders>
  );

  return render(ui, { wrapper: AuthWrapper });
};

// Render with theme
export const renderWithTheme = (ui, theme = 'light') => {
  const ThemeWrapper = ({ children }) => (
    <TestProviders theme={theme}>
      {children}
    </TestProviders>
  );

  return render(ui, { wrapper: ThemeWrapper });
};

// Render with store state
export const renderWithStore = (ui, initialState = {}) => {
  const StoreWrapper = ({ children }) => (
    <TestProviders storeState={initialState}>
      {children}
    </TestProviders>
  );

  return render(ui, { wrapper: StoreWrapper });
};

export default {
  renderWithProviders,
  renderWithAuth,
  renderWithTheme,
  renderWithStore
};
