// integration-example.test.js
// Real-world example of integrating Security Test Framework into existing tests

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  SecurityTests, 
  TestUtils, 
  AssertionHelpers,
  renderWithProviders 
} from 'security-test-framework';

// Your existing components (these would be from your actual project)
const LoginForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit} data-testid="login-form">
    <input 
      type="email" 
      name="email" 
      data-testid="email-input"
      placeholder="Email"
    />
    <input 
      type="password" 
      name="password" 
      data-testid="password-input"
      placeholder="Password"
    />
    <button type="submit">Login</button>
  </form>
);

const UserProfile = ({ user, onUpdate }) => (
  <div data-testid="user-profile">
    <form onSubmit={onUpdate} data-testid="profile-form">
      <input 
        type="text" 
        name="bio" 
        data-testid="bio-input"
        defaultValue={user.bio}
      />
      <button type="submit">Update Profile</button>
    </form>
  </div>
);

// Your existing API functions (these would be from your actual project)
const loginUser = async (email, password) => {
  // Simulate API call
  if (email && password) {
    return { success: true, token: 'mock-jwt-token' };
  }
  throw new Error('Invalid credentials');
};

const updateUserProfile = async (userId, data) => {
  // Simulate API call
  return { success: true, user: { ...data, id: userId } };
};

// Integration tests with security framework
describe('Login Form Security', () => {
  beforeEach(() => {
    // Setup any mocks or test data
  });

  it('should validate email format', async () => {
    const { getByTestId } = renderWithProviders(<LoginForm onSubmit={() => {}} />);
    const emailInput = getByTestId('email-input');
    
    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    AssertionHelpers.expectValidEmail(emailInput.value);
    
    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(() => AssertionHelpers.expectValidEmail(emailInput.value)).toThrow();
  });

  it('should validate password strength', async () => {
    const { getByTestId } = renderWithProviders(<LoginForm onSubmit={() => {}} />);
    const passwordInput = getByTestId('password-input');
    
    // Test weak password
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    expect(() => AssertionHelpers.expectStrongPassword(passwordInput.value)).toThrow();
    
    // Test strong password
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });
    AssertionHelpers.expectStrongPassword(passwordInput.value);
  });

  it('should prevent XSS in form inputs', async () => {
    const { getByTestId } = renderWithProviders(<LoginForm onSubmit={() => {}} />);
    const emailInput = getByTestId('email-input');
    
    const maliciousInput = '<script>alert("xss")</script>';
    fireEvent.change(emailInput, { target: { value: maliciousInput } });
    
    // The framework should detect this as vulnerable
    const result = await SecurityTests.testXSSPrevention({
      input: emailInput.value
    });
    
    expect(result.vulnerable).toBe(true);
  });

  it('should handle login securely', async () => {
    const mockSubmit = vi.fn();
    const { getByTestId } = renderWithProviders(<LoginForm onSubmit={mockSubmit} />);
    
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    
    // Test with valid credentials
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });
    
    // Validate inputs before submission
    AssertionHelpers.expectValidEmail(emailInput.value);
    AssertionHelpers.expectStrongPassword(passwordInput.value);
    
    // Test the actual login function
    const result = await loginUser(emailInput.value, passwordInput.value);
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
});

describe('User Profile Security', () => {
  const mockUser = TestUtils.createMockUser({
    bio: 'My safe bio content'
  });

  it('should sanitize bio input', async () => {
    const { getByTestId } = renderWithProviders(
      <UserProfile user={mockUser} onUpdate={() => {}} />
    );
    
    const bioInput = getByTestId('bio-input');
    const maliciousBio = '<script>alert("xss")</script>My bio';
    
    fireEvent.change(bioInput, { target: { value: maliciousBio } });
    
    // Test that the input is properly sanitized
    const sanitizedBio = bioInput.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    AssertionHelpers.expectNoXSS(sanitizedBio);
  });

  it('should validate profile updates', async () => {
    const mockUpdate = vi.fn();
    const { getByTestId } = renderWithProviders(
      <UserProfile user={mockUser} onUpdate={mockUpdate} />
    );
    
    const bioInput = getByTestId('bio-input');
    const safeBio = 'This is a safe bio update';
    
    fireEvent.change(bioInput, { target: { value: safeBio } });
    
    // Validate the input
    AssertionHelpers.expectNoXSS(bioInput.value);
    
    // Test the update function
    const result = await updateUserProfile(mockUser.id, { bio: safeBio });
    expect(result.success).toBe(true);
    expect(result.user.bio).toBe(safeBio);
  });
});

describe('API Security', () => {
  it('should prevent SQL injection in user queries', async () => {
    const maliciousQuery = "'; DROP TABLE users; --";
    
    const result = await SecurityTests.testSQLInjection({
      query: maliciousQuery,
      endpoint: '/api/users/search'
    });
    
    expect(result.vulnerable).toBe(true);
  });

  it('should validate JWT tokens', async () => {
    const mockToken = TestUtils.createMockAuth().token;
    
    const result = await SecurityTests.testTokenManagement({
      token: mockToken
    });
    
    expect(result.vulnerable).toBe(false);
  });

  it('should check for CSRF protection', async () => {
    const form = document.createElement('form');
    form.setAttribute('data-csrf-token', 'mock-csrf-token');
    
    const result = await SecurityTests.testCSRFProtection({
      form: form
    });
    
    expect(result.vulnerable).toBe(false);
  });
});

describe('Comprehensive Security Audit', () => {
  it('should run full security audit', async () => {
    // Run all security tests
    const results = await SecurityTests.runAll();
    
    // Check results
    expect(results.passed).toBeGreaterThan(0);
    expect(results.failed).toBeLessThanOrEqual(5); // Allow some expected failures
    expect(results.vulnerabilities.length).toBeLessThanOrEqual(5);
    
    // Generate report
    const report = await SecurityTests.generateReport({
      format: 'html',
      outputPath: './reports',
      includeDetails: true,
      includeRecommendations: true
    });
    
    expect(report).toBeDefined();
  });

  it('should validate environment security', async () => {
    const result = await SecurityTests.testEnvironmentSecurity();
    
    // Should not expose sensitive data
    expect(result.vulnerable).toBe(false);
  });

  it('should check dependency vulnerabilities', async () => {
    const result = await SecurityTests.testDependencyVulnerabilities();
    
    // Should not have known vulnerabilities
    expect(result.vulnerable).toBe(false);
  });
});

describe('Input Validation Suite', () => {
  it('should validate various data types', () => {
    // Email validation
    AssertionHelpers.expectValidEmail('test@example.com');
    expect(() => AssertionHelpers.expectValidEmail('invalid')).toThrow();
    
    // URL validation
    AssertionHelpers.expectValidUrl('https://example.com');
    expect(() => AssertionHelpers.expectValidUrl('not-a-url')).toThrow();
    
    // Phone validation
    AssertionHelpers.expectValidPhoneNumber('+1234567890');
    expect(() => AssertionHelpers.expectValidPhoneNumber('123')).toThrow();
    
    // Credit card validation
    AssertionHelpers.expectValidCreditCard('4532015112830366');
    expect(() => AssertionHelpers.expectValidCreditCard('1234')).toThrow();
    
    // IP address validation
    AssertionHelpers.expectValidIPAddress('192.168.1.1');
    expect(() => AssertionHelpers.expectValidIPAddress('256.256.256.256')).toThrow();
  });

  it('should validate complex data structures', () => {
    const user = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'user@example.com',
      profile: {
        avatar: 'https://example.com/avatar.jpg',
        bio: 'Safe bio content'
      }
    };
    
    // Validate UUID
    AssertionHelpers.expectValidUUID(user.id);
    
    // Validate email
    AssertionHelpers.expectValidEmail(user.email);
    
    // Validate URL
    AssertionHelpers.expectValidUrl(user.profile.avatar);
    
    // Validate no XSS in bio
    AssertionHelpers.expectNoXSS(user.profile.bio);
  });
});
