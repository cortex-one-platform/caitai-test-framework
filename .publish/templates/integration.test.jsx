import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TestUtils, TestProviders, IntegrationUtils } from '../index.js';

describe('Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should complete full user workflow', async () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );

    // Test user registration
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Registration successful')).toBeInTheDocument();
    });

    // Test user login
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('should handle API integration securely', async () => {
    const result = await IntegrationUtils.testFullStackFlow({
      frontend: 'user-profile',
      backend: 'user-api',
      security: ['csrf', 'rate-limiting', 'input-validation']
    });

    expect(result.success).toBe(true);
    expect(result.securityChecks.passed).toBe(true);
  });

  it('should test database integration', async () => {
    const mockUser = TestUtils.createMockUser();
    
    // Test user creation
    const createResult = await createUser(mockUser);
    expect(createResult.success).toBe(true);

    // Test user retrieval
    const getUserResult = await getUser(createResult.userId);
    expect(getUserResult.email).toBe(mockUser.email);
  });
});
