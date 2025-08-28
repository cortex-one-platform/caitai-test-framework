# Security Test Framework - Quick Start Guide

## Installation

```bash
npm install security-test-framework
```

## Basic Usage

### 1. Import in your test files

```javascript
import { describe, it, expect } from 'vitest';
import { 
  SecurityTests, 
  TestUtils, 
  AssertionHelpers 
} from 'security-test-framework';

describe('My App Security', () => {
  it('should pass security tests', async () => {
    const results = await SecurityTests.runAll();
    expect(results.vulnerabilities).toHaveLength(0);
  });
});
```

### 2. React Component Testing

```javascript
import { renderWithProviders } from 'security-test-framework';

describe('UserProfile Component', () => {
  it('should handle malicious input', () => {
    const { getByTestId } = renderWithProviders(<UserProfile />);
    const input = getByTestId('bio-input');
    
    fireEvent.change(input, { 
      target: { value: '<script>alert("xss")</script>' } 
    });
    
    expect(input.value).not.toContain('<script>');
  });
});
```

### 3. API Security Testing

```javascript
describe('User API', () => {
  it('should prevent SQL injection', async () => {
    const maliciousQuery = "'; DROP TABLE users; --";
    
    const result = await SecurityTests.testSQLInjection({
      query: maliciousQuery,
      endpoint: '/api/users'
    });
    
    expect(result.vulnerable).toBe(false);
  });
});
```

### 4. Input Validation

```javascript
describe('Input Validation', () => {
  it('should validate user inputs', () => {
    AssertionHelpers.expectValidEmail('user@example.com');
    AssertionHelpers.expectStrongPassword('SecurePass123!');
    AssertionHelpers.expectNoXSS('<p>Safe content</p>');
  });
});
```

## Configuration

Create a `security-test.config.js` file in your project root:

```javascript
export default {
  security: {
    enabled: {
      xss: true,
      sqlInjection: true,
      csrf: true
    },
    thresholds: {
      maxVulnerabilities: 0,
      minSecurityScore: 90
    }
  },
  coverage: {
    threshold: 80
  },
  reporting: {
    formats: ['html', 'json'],
    outputPath: './reports'
  }
};
```

## Available Exports

### Core Classes
- `SecurityTests` - Run security tests
- `TestFramework` - Main framework class
- `TestUtils` - Mock data generation
- `AssertionHelpers` - Validation functions

### React Utilities
- `TestProviders` - React context providers
- `renderWithProviders` - Enhanced render function
- `renderWithAuth` - Render with authentication
- `renderWithTheme` - Render with theme provider

### Backend Utilities
- `IntegrationUtils` - E2E testing utilities
- `PerformanceTester` - Load testing
- `CoverageAnalyzer` - Code coverage analysis

## CLI Usage

```bash
# Run security tests
npx security-test security

# Generate reports
npx security-test report:security
npx security-test report:coverage

# Run with coverage
npx security-test coverage
```

## Examples

See the `examples/` directory for complete usage examples:
- `client-usage.js` - Integration examples
- `security-test.config.js` - Configuration example

## Security Test Categories

1. **XSS Prevention** - Cross-site scripting protection
2. **SQL Injection** - Database query security
3. **CSRF Protection** - Cross-site request forgery
4. **Authentication** - User authentication
5. **Authorization** - Access control
6. **Input Validation** - Data sanitization
7. **File Upload Security** - File type validation
8. **Session Security** - Session management
9. **Encryption** - Data encryption
10. **Dependency Vulnerabilities** - Package security
11. **Environment Security** - Environment variables
12. **Logging Security** - Secure logging
13. **Security Headers** - HTTP headers
14. **Rate Limiting** - Request throttling
15. **Token Management** - JWT/API tokens
16. **Error Handling** - Secure error responses

## Report Generation

The framework generates beautiful neumorphic-styled HTML reports:

```javascript
// Generate security report
const report = await SecurityTests.generateReport({
  format: 'html',
  outputPath: './reports'
});
```

## Support

- 📖 [API Documentation](./docs/API.md)
- 🔒 [Security Guide](./docs/SECURITY.md)
- 📚 [Examples](./docs/EXAMPLES.md)
- 🐛 [Issues](https://github.com/yourusername/security-test-framework/issues)
