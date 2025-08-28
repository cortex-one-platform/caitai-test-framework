# Security Test Framework - Usage Examples

## Overview

This document provides comprehensive examples of how to use the Security Test Framework in various scenarios and project types.

## Quick Start Examples

### Basic Security Testing

```javascript
import { SecurityTests, TestUtils, AssertionHelpers } from 'security-test-framework';

describe('Basic Security Tests', () => {
  it('should run basic security checks', async () => {
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
```

### React Component Testing

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { SecurityTests, TestProviders } from 'security-test-framework';
import UserProfile from './UserProfile';

describe('UserProfile Component Security', () => {
  it('should prevent XSS attacks', async () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const input = screen.getByLabelText('Bio');
    const maliciousInput = '<script>alert("xss")</script>';
    
    fireEvent.change(input, { target: { value: maliciousInput } });
    
    // Test that input is sanitized
    expect(input.value).not.toContain('<script>');
    
    const result = await SecurityTests.testXSSPrevention({
      component: screen.getByTestId('user-profile'),
      input: maliciousInput
    });
    
    expect(result.vulnerable).toBe(false);
  });

  it('should handle form submissions securely', async () => {
    render(
      <TestProviders>
        <UserProfile />
      </TestProviders>
    );
    
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    // Test SQL injection prevention
    fireEvent.change(emailInput, { 
      target: { value: "'; DROP TABLE users; --" } 
    });
    
    const sqlResult = await SecurityTests.testSQLInjection({
      input: emailInput.value
    });
    
    expect(sqlResult.vulnerable).toBe(false);
    
    // Test password strength
    fireEvent.change(passwordInput, { 
      target: { value: 'weakpassword' } 
    });
    
    AssertionHelpers.expectStrongPassword(passwordInput.value);
  });
});
```

### NestJS Backend Testing

```javascript
import { Test } from '@nestjs/testing';
import { SecurityTests, NestUtils, ControllerUtils } from 'security-test-framework';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController Security', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module = await NestUtils.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should prevent SQL injection in user creation', async () => {
    const maliciousPayload = {
      email: "'; DROP TABLE users; --",
      name: 'Test User'
    };

    const request = ControllerUtils.createMockRequest({
      method: 'POST',
      url: '/users',
      body: maliciousPayload
    });

    const result = await SecurityTests.testSQLInjection({
      controller: controller,
      method: 'create',
      payload: maliciousPayload
    });

    expect(result.vulnerable).toBe(false);
  });

  it('should validate JWT authentication', async () => {
    const testTokens = [
      'valid.jwt.token',
      'expired.jwt.token',
      'invalid.jwt.token'
    ];

    for (const token of testTokens) {
      const request = ControllerUtils.createMockRequest({
        headers: { authorization: `Bearer ${token}` }
      });

      const result = await SecurityTests.testAuthentication({
        request: request,
        token: token
      });

      if (token === 'valid.jwt.token') {
        expect(result.valid).toBe(true);
      } else {
        expect(result.valid).toBe(false);
      }
    }
  });

  it('should validate role-based authorization', async () => {
    const roles = ['user', 'admin', 'superadmin'];
    const resources = ['users', 'settings', 'logs'];

    for (const role of roles) {
      for (const resource of resources) {
        const request = ControllerUtils.createMockRequest({
          user: { role: role },
          params: { resource: resource }
        });

        const result = await SecurityTests.testAuthorization({
          request: request,
          role: role,
          resource: resource
        });

        // Only admin and superadmin should access sensitive resources
        if (['settings', 'logs'].includes(resource) && role === 'user') {
          expect(result.authorized).toBe(false);
        } else {
          expect(result.authorized).toBe(true);
        }
      }
    }
  });
});
```

### Full-Stack Integration Testing

```javascript
import { IntegrationUtils, SecurityTests, TestUtils } from 'security-test-framework';

describe('Full-Stack Security Integration', () => {
  it('should complete secure user registration flow', async () => {
    const mockUser = TestUtils.createMockUser();
    
    const result = await IntegrationUtils.testFullStackFlow({
      frontend: 'registration-form',
      backend: 'user-registration',
      security: ['csrf', 'rate-limiting', 'input-validation', 'xss', 'sql-injection'],
      coverage: ['frontend', 'backend', 'integration']
    });

    expect(result.success).toBe(true);
    expect(result.securityChecks.passed).toBe(true);
    expect(result.coverage.frontend).toBeGreaterThan(80);
    expect(result.coverage.backend).toBeGreaterThan(85);
  });

  it('should handle secure login process', async () => {
    const loginFlow = await IntegrationUtils.testUserJourneyStep({
      step: 'login',
      securityTests: ['authentication', 'rate-limiting', 'session-security'],
      coverage: true
    });

    expect(loginFlow.security.passed).toBe(true);
    expect(loginFlow.coverage).toBeGreaterThan(85);
  });

  it('should test file upload security', async () => {
    const maliciousFiles = [
      { name: 'script.js', content: '<script>alert("xss")</script>' },
      { name: 'virus.exe', content: 'malicious-binary-content' },
      { name: 'large-file.txt', content: 'x'.repeat(10000000) } // 10MB file
    ];

    for (const file of maliciousFiles) {
      const result = await SecurityTests.testFileUploadSecurity({
        endpoint: '/api/upload',
        file: file
      });

      expect(result.accepted).toBe(false);
    }
  });
});
```

## Advanced Examples

### Custom Security Tests

```javascript
import { TestFramework, SecurityTests } from 'security-test-framework';

describe('Custom Security Tests', () => {
  it('should run custom security test', async () => {
    // Add custom security test
    TestFramework.addCustomTest('custom-vulnerability', async (app) => {
      // Custom security test logic
      const result = await testCustomVulnerability(app);
      return { 
        isValid: result.secure, 
        details: 'Custom test completed' 
      };
    });

    const results = await TestFramework.runCustomTests();
    expect(results.length).toBeGreaterThan(0);
  });

  it('should test business logic security', async () => {
    const businessLogicTest = async () => {
      // Test business logic for security vulnerabilities
      const result = await testBusinessLogic();
      return {
        vulnerable: result.hasVulnerability,
        message: result.message
      };
    };

    const result = await businessLogicTest();
    expect(result.vulnerable).toBe(false);
  });
});

async function testCustomVulnerability(app) {
  // Custom vulnerability testing logic
  return { secure: true };
}

async function testBusinessLogic() {
  // Business logic security testing
  return { hasVulnerability: false, message: 'Business logic is secure' };
}
```

### Performance Security Testing

```javascript
import { PerformanceTester, SecurityTests } from 'security-test-framework';

describe('Performance Security Tests', () => {
  it('should test performance under security load', async () => {
    const performanceResult = await PerformanceTester.testSecurityLoad({
      endpoint: '/api/users',
      concurrentUsers: 100,
      securityTests: ['sql-injection', 'xss', 'csrf'],
      duration: 30000 // 30 seconds
    });

    expect(performanceResult.responseTime.avg).toBeLessThan(200);
    expect(performanceResult.securityChecks.passed).toBe(true);
  });

  it('should test memory usage during security scanning', async () => {
    const memoryTest = await PerformanceTester.testMemoryUsage({
      securityScan: true,
      duration: 60000 // 1 minute
    });

    expect(memoryTest.peakUsage).toBeLessThan(100); // MB
    expect(memoryTest.memoryLeak).toBe(false);
  });
});
```

### Database Security Testing

```javascript
import { SecurityTests, TestUtils } from 'security-test-framework';

describe('Database Security Tests', () => {
  it('should test TypeORM injection prevention', async () => {
    const mockRepository = TestUtils.createMockDatabase();
    
    const result = await SecurityTests.testSQLInjection({
      repository: mockRepository,
      queries: [
        { method: 'findOne', params: { email: 'test@example.com' } },
        { method: 'findOne', params: { email: "'; DROP TABLE users; --" } }
      ]
    });

    expect(result.vulnerable).toBe(false);
  });

  it('should test Prisma injection prevention', async () => {
    const mockPrisma = TestUtils.createMockDatabase();
    
    const result = await SecurityTests.testSQLInjection({
      client: mockPrisma,
      queries: [
        { model: 'user', action: 'findFirst', where: { email: 'test@example.com' } },
        { model: 'user', action: 'findFirst', where: { email: "'; DROP TABLE users; --" } }
      ]
    });

    expect(result.vulnerable).toBe(false);
  });
});
```

## Configuration Examples

### Basic Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/security-test-framework/src/core/setup.js'],
    environment: 'jsdom',
    globals: true,
  },
});
```

### Advanced Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/security-test-framework/src/core/setup.js'],
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/*.module.ts',
        '**/*.dto.ts',
        '**/*.entity.ts'
      ]
    },
    security: {
      enabled: true,
      strict: true,
      report: true,
      timeout: 30000
    },
  },
});
```

### Framework Configuration

```javascript
import { TestFramework } from 'security-test-framework';

// Configure the framework
TestFramework.configure({
  security: {
    enabled: true,
    strict: true,
    report: true,
    timeout: 30000
  },
  coverage: {
    enabled: true,
    threshold: 80,
    reporters: ['text', 'json', 'html']
  },
  performance: {
    enabled: true,
    timeout: 30000,
    concurrentUsers: 100
  }
});
```

## CLI Usage Examples

### Basic CLI Commands

```bash
# Run all tests
npx security-test run

# Run security tests only
npx security-test security

# Run with coverage
npx security-test coverage

# Run performance tests
npx security-test performance:load
```

### Advanced CLI Commands

```bash
# Run specific test types
npx security-test frontend:component
npx security-test backend:controller
npx security-test fullstack:e2e

# Run specific security tests
npx security-test security:xss
npx security-test security:sql-injection
npx security-test security:csrf

# Generate reports
npx security-test report:security

# Auto-detect and run appropriate tests
npx security-test auto
```

## Package.json Scripts

```json
{
  "scripts": {
    "test": "security-test run",
    "test:security": "security-test security",
    "test:coverage": "security-test coverage",
    "test:frontend": "security-test frontend:component",
    "test:backend": "security-test backend:controller",
    "test:fullstack": "security-test fullstack:e2e",
    "test:performance": "security-test performance:load",
    "test:report": "security-test report:security"
  }
}
```

## Migration Examples

### From Jest

```javascript
// Before (Jest)
import { render, screen } from '@testing-library/react';

// After (Security Framework)
import { render, screen } from '@testing-library/react';
import { SecurityTests, TestProviders } from 'security-test-framework';

// Your existing tests work + security testing
describe('Component', () => {
  it('should render and be secure', () => {
    render(
      <TestProviders>
        <MyComponent />
      </TestProviders>
    );
    
    // Existing test
    expect(screen.getByText('Hello')).toBeInTheDocument();
    
    // New security test
    const securityResult = await SecurityTests.testXSSPrevention();
    expect(securityResult.vulnerable).toBe(false);
  });
});
```

### From Vitest

```javascript
// Before (Vitest)
import { describe, it, expect } from 'vitest';

// After (Security Framework)
import { describe, it, expect } from 'vitest';
import { SecurityTests, TestUtils } from 'security-test-framework';

// Your existing tests work + security testing
describe('Function', () => {
  it('should work and be secure', () => {
    // Existing test
    const result = myFunction('input');
    expect(result).toBe('expected');
    
    // New security test
    const mockInput = TestUtils.createMockUser();
    const securityResult = SecurityTests.testInputValidation(mockInput);
    expect(securityResult.vulnerable).toBe(false);
  });
});
```

## Troubleshooting Examples

### Common Issues

```javascript
// Issue: Module not found
// Solution: Clear cache and reinstall
// npm cache clean --force
// npm install security-test-framework

// Issue: Setup file not found
// Solution: Use correct path in vitest.config.js
setupFiles: ['./node_modules/security-test-framework/src/core/setup.js']

// Issue: Security tests not running
// Solution: Import SecurityTests
import { SecurityTests } from 'security-test-framework';

// Issue: React components not rendering
// Solution: Use TestProviders
import { TestProviders } from 'security-test-framework';
render(<TestProviders><MyComponent /></TestProviders>);
```

## Best Practices Examples

### Comprehensive Testing

```javascript
describe('Comprehensive Security Testing', () => {
  it('should test all security aspects', async () => {
    // Test all security categories
    const securityTests = [
      SecurityTests.testXSSPrevention(),
      SecurityTests.testSQLInjection(),
      SecurityTests.testCSRFProtection(),
      SecurityTests.testAuthentication(),
      SecurityTests.testAuthorization(),
      SecurityTests.testInputValidation(),
      SecurityTests.testFileUploadSecurity(),
      SecurityTests.testSessionSecurity(),
      SecurityTests.testEncryption(),
      SecurityTests.testDependencyVulnerabilities(),
      SecurityTests.testEnvironmentSecurity(),
      SecurityTests.testLoggingSecurity()
    ];

    const results = await Promise.all(securityTests);
    
    results.forEach(result => {
      expect(result.vulnerable).toBe(false);
    });
  });

  it('should test with different user roles', async () => {
    const roles = ['user', 'admin', 'superadmin'];
    
    for (const role of roles) {
      const result = await SecurityTests.testAuthorization({
        role: role,
        resources: ['users', 'settings', 'logs']
      });
      
      expect(result.authorized).toBeDefined();
    }
  });

  it('should test edge cases', async () => {
    const edgeCases = [
      '',
      ' ',
      'a'.repeat(1000),
      '<script>alert("xss")</script>',
      "'; DROP TABLE users; --",
      'javascript:alert("xss")'
    ];
    
    for (const input of edgeCases) {
      const result = await SecurityTests.testInputValidation({
        input: input
      });
      
      expect(result.vulnerable).toBe(false);
    }
  });
});
```

## Conclusion

These examples demonstrate the comprehensive capabilities of the Security Test Framework. The framework is designed to be easy to integrate into existing projects while providing powerful security testing capabilities. Start with the basic examples and gradually incorporate more advanced features as needed.
