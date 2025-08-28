import { describe, it, expect } from 'vitest';
import { SecurityTests, TestUtils, AssertionHelpers } from '../index.js';

describe('Basic Security Test Example', () => {
  it('should run basic security tests', async () => {
    const result = await SecurityTests.runAll();
    expect(result.passed).toBeGreaterThan(0);
  });

  it('should generate mock data', () => {
    const mockUser = TestUtils.createMockUser();
    AssertionHelpers.expectValidEmail(mockUser.email);
    expect(mockUser.id).toBeDefined();
  });

  it('should validate input security', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const sanitizedInput = maliciousInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    AssertionHelpers.expectNoXSS(sanitizedInput);
  });
});
