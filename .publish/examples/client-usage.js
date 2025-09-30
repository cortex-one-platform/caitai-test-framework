// Example: How to integrate Security Test Framework into your existing test files

import { describe, it, expect, beforeEach } from 'vitest';
import {
  SecurityTests,
  TestFramework,
  TestUtils,
  AssertionHelpers,
  TestProviders,
  renderWithProviders
} from 'caitai-security-test-framework';

// Example 1: Simple security testing in existing test file
describe('My App Security', () => {
  it('should pass all security tests', async () => {
    // Run all security tests
    const results = await SecurityTests.runAll();
    
    expect(results.passed).toBeGreaterThan(0);
    expect(results.failed).toBe(0);
    expect(results.vulnerabilities).toHaveLength(0);
  });

  it('should prevent XSS attacks', async () => {
    const result = await SecurityTests.testXSSPrevention();
    expect(result.vulnerable).toBe(false);
  });

  it('should validate user input', () => {
    const userInput = '<script>alert("xss")</script>';
    const sanitizedInput = userInput.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    AssertionHelpers.expectNoXSS(sanitizedInput);
    AssertionHelpers.expectValidEmail('user@example.com');
    AssertionHelpers.expectStrongPassword('SecurePass123!');
  });
});

// Example 2: React component testing with security
describe('UserProfile Component', () => {
  it('should render securely', () => {
    const { getByTestId } = renderWithProviders(<UserProfile />);
    
    expect(getByTestId('user-profile')).toBeInTheDocument();
  });

  it('should handle malicious input', async () => {
    const { getByTestId } = renderWithProviders(<UserProfile />);
    const bioInput = getByTestId('bio-input');
    
    const maliciousInput = '<script>alert("xss")</script>';
    fireEvent.change(bioInput, { target: { value: maliciousInput } });
    
    // Test that input is properly sanitized
    expect(bioInput.value).not.toContain('<script>');
  });
});

// Example 3: API endpoint testing
describe('User API', () => {
  it('should handle user creation securely', async () => {
    const mockUser = TestUtils.createMockUser();
    
    // Test with security framework
    const result = await SecurityTests.testInputValidation({
      data: mockUser,
      endpoint: '/api/users',
      method: 'POST'
    });
    
    expect(result.vulnerable).toBe(false);
  });
});

// Example 4: Database security testing
describe('Database Security', () => {
  it('should prevent SQL injection', async () => {
    const maliciousQuery = "'; DROP TABLE users; --";
    
    const result = await SecurityTests.testSQLInjection({
      query: maliciousQuery,
      database: 'users'
    });
    
    expect(result.vulnerable).toBe(false);
  });
});

// Example 5: Authentication testing
describe('Authentication', () => {
  it('should validate JWT tokens', async () => {
    const mockToken = TestUtils.createMockAuth().token;
    
    const result = await SecurityTests.testTokenManagement({
      token: mockToken
    });
    
    expect(result.vulnerable).toBe(false);
  });
});

// Example 6: File upload security
describe('File Upload', () => {
  it('should validate file types', async () => {
    const mockFile = TestUtils.createMockFileUpload({
      originalname: 'malicious.exe',
      mimetype: 'application/x-executable'
    });
    
    const result = await SecurityTests.testFileUploadSecurity({
      file: mockFile
    });
    
    expect(result.vulnerable).toBe(true); // Should detect malicious file
  });
});

// Example 7: Environment security
describe('Environment Security', () => {
  it('should not expose sensitive data', async () => {
    const result = await SecurityTests.testEnvironmentSecurity();
    expect(result.vulnerable).toBe(false);
  });
});

// Example 8: Comprehensive testing with TestFramework
describe('Full Application Security', () => {
  it('should run comprehensive security audit', async () => {
    const framework = new TestFramework();
    
    const results = await framework.runSecurityAudit({
      includeCoverage: true,
      includePerformance: true,
      generateReport: true,
      reportFormat: 'html'
    });
    
    expect(results.security.passed).toBeGreaterThan(0);
    expect(results.coverage.overall).toBeGreaterThan(80);
    expect(results.performance.score).toBeGreaterThan(90);
  });
});
