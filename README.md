# Security Test Framework

A comprehensive npm package for integrating security testing, coverage reporting, and validation into your existing test files. Perfect for React, NestJS, and full-stack applications.

## 🚀 Quick Start

```bash
npm install caitai-security-test-framework
```

```javascript
import { describe, it, expect } from 'vitest';
import { SecurityTests, AssertionHelpers } from 'caitai-security-test-framework';

describe('My App Security', () => {
  it('should pass security tests', async () => {
    const results = await SecurityTests.runAll();
    expect(results.vulnerabilities).toHaveLength(0);
  });

  it('should validate user input', () => {
    AssertionHelpers.expectValidEmail('user@example.com');
    AssertionHelpers.expectStrongPassword('SecurePass123!');
    AssertionHelpers.expectNoXSS('<p>Safe content</p>');
  });
});
```

## Features

- 🔒 **Security Testing**: Built-in security vulnerability testing (XSS, SQL Injection, CSRF, etc.)
- 📊 **Coverage Reporting**: Comprehensive coverage analysis
- 🧪 **Multiple Test Types**: Unit, component, integration, and security tests
- 🎭 **Advanced Mocking**: Sophisticated mocking for Firebase, APIs, and stores
- 🚀 **CLI Tool**: Command-line interface for test execution
- 📦 **Portable**: Easy to integrate into any React/NestJS project
- ⚡ **Performance Testing**: Load testing with security focus
- 🔄 **Auto-Detection**: Automatically detects project type and applies appropriate settings

## Installation

```bash
npm install caitai-security-test-framework
```

## Quick Start

### 1. Add to Your Package.json Scripts

```json
{
  "scripts": {
    "test": "security-test run",
    "test:security": "security-test security",
    "test:coverage": "security-test coverage",
    "test:frontend": "security-test frontend:component",
    "test:backend": "security-test backend:controller",
    "test:fullstack": "security-test fullstack:e2e"
  }
}
```

### 2. Create a Simple Test File

```javascript
// tests/security.test.js
import { SecurityTests, CoverageAnalyzer } from 'caitai-security-test-framework';

describe('My App Security', () => {
  it('should pass basic security checks', async () => {
    const result = await SecurityTests.runAll();
    expect(result.passed).toBeGreaterThan(0);
  });
});
```

### 3. Run Tests

```bash
npm test
```

## CLI Usage

```bash
# Run all tests
npx security-test run

# Run security tests only
npx security-test security

# Run with coverage
npx security-test coverage

# Run specific test types
npx security-test frontend:component
npx security-test backend:controller
npx security-test fullstack:e2e

# Run specific security tests
npx security-test security:xss
npx security-test security:sql-injection
npx security-test security:csrf

# Auto-detect and run appropriate tests
npx security-test auto
```

## Integration Examples

### React Frontend Project

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./node_modules/caitai-security-test-framework/src/core/setup.js'],
    globals: true,
  },
});
```

```javascript
// src/components/UserProfile.test.jsx
import { render, screen } from '@testing-library/react';
import { SecurityTests, CoverageAnalyzer } from 'caitai-security-test-framework';
import UserProfile from './UserProfile';

describe('UserProfile Security', () => {
  it('should prevent XSS attacks', async () => {
    render(<UserProfile />);
    
    const result = await SecurityTests.testXSSPrevention({
      component: screen.getByTestId('user-profile'),
      input: '<script>alert("xss")</script>'
    });
    
    expect(result.vulnerable).toBe(false);
  });
});
```

### NestJS Backend Project

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./node_modules/caitai-security-test-framework/src/core/setup.js'],
    globals: true,
  },
});
```

```javascript
// src/users/users.controller.test.ts
import { Test } from '@nestjs/testing';
import { SecurityTests, CoverageAnalyzer } from 'caitai-security-test-framework';
import { UsersController } from './users.controller';

describe('UsersController Security', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should prevent SQL injection', async () => {
    const result = await SecurityTests.testSQLInjection({
      controller: controller,
      method: 'create',
      payload: { email: "'; DROP TABLE users; --" }
    });
    
    expect(result.vulnerable).toBe(false);
  });
});
```

### Full-Stack Project

```javascript
// tests/integration/auth-flow.test.js
import { IntegrationUtils, SecurityTests } from 'caitai-security-test-framework';

describe('Authentication Flow', () => {
  it('should complete secure login', async () => {
    const result = await IntegrationUtils.testFullStackFlow({
      frontend: 'login-form',
      backend: 'auth-endpoint',
      security: ['csrf', 'rate-limiting', 'input-validation']
    });
    
    expect(result.success).toBe(true);
  });
});
```

## API Reference

### SecurityTests

```javascript
import { SecurityTests } from 'caitai-security-test-framework';

// Run all security tests
const results = await SecurityTests.runAll();

// Run specific security tests
const xssResult = await SecurityTests.testXSSPrevention();
const sqlResult = await SecurityTests.testSQLInjection();
const csrfResult = await SecurityTests.testCSRFProtection();
```

### CoverageAnalyzer

```javascript
import { CoverageAnalyzer } from 'caitai-security-test-framework';

// Analyze code coverage
const coverage = await CoverageAnalyzer.analyzeCoverage();
console.log(`Overall coverage: ${coverage.overall}%`);
```

### PerformanceTester

```javascript
import { PerformanceTester } from 'caitai-security-test-framework';

// Run performance tests
const performance = await PerformanceTester.runLoadTests({
  concurrentUsers: 100,
  duration: 30000
});
```

### TestUtils (Mock Generator)

```javascript
import { TestUtils } from 'caitai-security-test-framework';

// Generate mock data
const mockUser = TestUtils.createMockUser();
const mockProduct = TestUtils.createMockProduct();
const mockOrder = TestUtils.createMockOrder();
const mockAuth = TestUtils.createMockAuth();
```

### AssertionHelpers

```javascript
import { AssertionHelpers } from 'caitai-security-test-framework';

// Enhanced assertions
AssertionHelpers.expectValidEmail('test@example.com');
AssertionHelpers.expectStrongPassword('SecurePass123!');
AssertionHelpers.expectNoXSS(userInput);
AssertionHelpers.expectNoSQLInjection(queryInput);
```

## Configuration

### Basic Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/caitai-security-test-framework/src/core/setup.js'],
  },
});
```

### Advanced Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/caitai-security-test-framework/src/core/setup.js'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/'],
    },
    security: {
      enabled: true,
      strict: true,
      report: true,
    },
  },
});
```

## Security Testing Features

### XSS Prevention Testing
- Tests for script injection
- Tests for event handler injection
- Tests for iframe injection
- Tests for SVG injection

### SQL Injection Testing
- Tests for SQL command injection
- Tests for UNION attacks
- Tests for comment-based attacks
- Tests for stored procedure attacks

### CSRF Protection Testing
- Tests for CSRF token presence
- Tests for token validation
- Tests for origin validation

### Authentication Testing
- Tests for JWT validation
- Tests for session management
- Tests for password strength
- Tests for brute force protection

### Authorization Testing
- Tests for role-based access control
- Tests for permission validation
- Tests for resource access control

## Coverage Analysis

The framework provides comprehensive coverage analysis including:

- **Code Coverage**: Statements, branches, functions, lines
- **Security Coverage**: Security test coverage metrics
- **Performance Coverage**: Performance test coverage
- **Integration Coverage**: Integration test coverage
- **Accessibility Coverage**: Accessibility test coverage
- **Error Handling Coverage**: Error handling test coverage

## Performance Testing

Performance testing with security focus includes:

- **Load Testing**: Tests application under normal load
- **Stress Testing**: Tests application under extreme load
- **Security Load Testing**: Tests security measures under load
- **Memory Leak Testing**: Detects memory leaks during testing
- **Resource Exhaustion Testing**: Tests resource limits

## Migration Guide

### From Jest
```javascript
// Before (Jest)
import { render, screen } from '@testing-library/react';

// After (Security Framework)
import { render, screen } from '@testing-library/react';
import { SecurityTests } from 'caitai-security-test-framework';

// Your existing tests work + security testing
```

### From Vitest
```javascript
// Before (Vitest)
import { describe, it, expect } from 'vitest';

// After (Security Framework)
import { describe, it, expect } from 'vitest';
import { SecurityTests } from 'caitai-security-test-framework';

// Your existing tests work + security testing
```

## Troubleshooting

### Common Issues

**Issue**: "Module not found"
```bash
# Solution: Clear cache and reinstall
npm cache clean --force
npm install caitai-security-test-framework
```

**Issue**: "Setup file not found"
```javascript
// Solution: Use correct path
setupFiles: ['./node_modules/caitai-security-test-framework/src/core/setup.js']
```

**Issue**: "Security tests not running"
```javascript
// Solution: Import SecurityTests
import { SecurityTests } from 'caitai-security-test-framework';
```

## Support

- 📖 [Documentation](https://github.com/cortex-one-platform/caitai-test-framework)
- 💬 [Discussions](https://github.com/cortex-one-platform/caitai-test-framework/discussions)
- 🐛 [Issues](https://github.com/cortex-one-platform/caitai-test-framework/issues)
- 📧 [Email Support](mailto:support@cait.app)

## License

Copyright (c) 2025 CAIT AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


