import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SecurityTests, AssertionHelpers } from '../index.js';
import { TestProviders } from '../utils/testProviders.jsx';

// Mock component for testing
const UserProfile = () => {
  return (
    <div data-testid="user-profile">
      <form role="form">
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" data-testid="email-input" />
        
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" data-testid="bio-input" />
        
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" data-testid="password-input" />
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

describe('UserProfile Component Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Bio:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  it('should detect XSS attacks in bio field', async () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const bioInput = screen.getByTestId('bio-input');
    const maliciousInput = '<script>alert("xss")</script>';
    
    fireEvent.change(bioInput, { target: { value: maliciousInput } });
    
    // The mock component doesn't sanitize input, so it should contain the script tag
    expect(bioInput.value).toContain('<script>');
    
    const result = await SecurityTests.testXSSPrevention({
      component: screen.getByTestId('user-profile'),
      input: maliciousInput
    });
    
    // The security test should detect this vulnerability
    expect(result.vulnerable).toBe(true);
  });

  it('should validate email format', () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const emailInput = screen.getByTestId('email-input');
    
    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    AssertionHelpers.expectValidEmail(emailInput.value);
    
    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(() => AssertionHelpers.expectValidEmail(emailInput.value)).toThrow();
  });

  it('should validate password strength', () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const passwordInput = screen.getByTestId('password-input');
    
    // Test weak password
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    expect(() => AssertionHelpers.expectStrongPassword(passwordInput.value)).toThrow();
    
    // Test strong password
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });
    AssertionHelpers.expectStrongPassword(passwordInput.value);
  });

  it('should handle form submissions securely', async () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const form = screen.getByRole('form');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    
    // Test SQL injection prevention
    fireEvent.change(emailInput, { 
      target: { value: "'; DROP TABLE users; --" } 
    });
    
    const sqlResult = await SecurityTests.testSQLInjection({
      input: emailInput.value
    });
    
    expect(sqlResult.vulnerable).toBe(false);
    
    // Test form submission
    fireEvent.submit(form);
    
    await waitFor(() => {
      // Form should be submitted without errors
      expect(form).toBeInTheDocument();
    });
  });

  it('should detect missing CSRF protection', async () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const form = screen.getByRole('form');
    
    // The mock component doesn't have CSRF protection
    expect(form).not.toHaveAttribute('data-csrf-token');
    
    const result = await SecurityTests.testCSRFProtection({
      form: form
    });
    
    // The security test should detect this vulnerability
    expect(result.vulnerable).toBe(true);
  });
});
