# Security Test Framework - Portable NPM Package Guide

## Overview

This guide provides instructions for creating a portable npm package from the comprehensive test framework developed for the ShelfSense frontend. The framework includes security testing, coverage reporting, multiple test categories, and sophisticated mocking capabilities.

## Package Structure

```
security-test-framework/
├── package.json
├── README.md
├── LICENSE
├── .npmignore
├── src/
│   ├── index.js                 # Main entry point
│   ├── setup.js                 # Global test setup
│   ├── config/
│   │   └── testConfig.js        # Centralized test configuration
│   ├── utils/
│   │   ├── testUtils.js         # Common test utilities
│   │   ├── testProviders.jsx    # React context providers
│   │   ├── testRender.js        # Enhanced render utilities
│   │   ├── mockContexts.js      # Context mocking utilities
│   │   └── security/
│   │       ├── securityHeaders.test.js
│   │       ├── csrfProtection.test.js
│   │       ├── rateLimiter.test.js
│   │       ├── tokenManager.test.js
│   │       └── errorHandler.test.js
│   ├── runners/
│   │   ├── runAllTests.js       # Main test runner
│   │   ├── runSecurityTests.js  # Security test runner
│   │   └── runCoverageTests.js  # Coverage test runner
│   ├── templates/
│   │   ├── component.test.jsx   # Component test template
│   │   ├── unit.test.js         # Unit test template
│   │   ├── integration.test.jsx # Integration test template
│   │   └── security.test.js     # Security test template
│   └── examples/
│       ├── basic.test.js        # Basic usage example
│       ├── component.test.jsx   # Component testing example
│       └── security.test.js     # Security testing example
├── bin/
│   └── security-test.js         # CLI executable
└── docs/
    ├── API.md                   # API documentation
    ├── SECURITY.md              # Security testing guide
    └── EXAMPLES.md              # Usage examples
```

## Package.json Configuration

```json
{
  "name": "security-test-framework",
  "version": "1.0.0",
  "description": "A comprehensive test framework with security testing, coverage reporting, and multiple test categories",
  "main": "src/index.js",
  "bin": {
    "security-test": "./bin/security-test.js"
  },
  "type": "module",
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:security": "vitest run src/utils/security/ --reporter=verbose",
    "build": "node scripts/build.js",
    "prepublishOnly": "npm run test && npm run build"
  },
  "keywords": [
    "testing",
    "security",
    "coverage",
    "vitest",
    "react",
    "jest",
    "test-framework",
    "security-testing",
    "automated-testing"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/security-test-framework.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/security-test-framework/issues"
  },
  "homepage": "https://github.com/yourusername/security-test-framework#readme",
  "dependencies": {
    "@testing-library/dom": "^10.0.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.5.2",
    "@nestjs/testing": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/common": "^10.0.0",
    "jsdom": "^25.0.1",
    "msw": "^2.2.3"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "vitest": ">=3.0.0",
    "@nestjs/core": ">=10.0.0",
    "@nestjs/common": ">=10.0.0",
    "@nestjs/testing": ">=10.0.0"
  },
  "devDependencies": {
    "@vitest/coverage-v8": "^3.2.4",
    "@vitest/ui": "^3.2.4",
    "vitest": "^3.2.4"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

## Core Files to Extract

### 1. Main Entry Point (src/index.js)

```javascript
// Export all public APIs
export { default as TestFramework } from './setup.js';
export { default as TestUtils } from './utils/testUtils.js';
export { default as TestProviders } from './utils/testProviders.jsx';
export { default as SecurityTests } from './utils/security/index.js';
export { default as TestRunner } from './runners/runAllTests.js';

// Export individual utilities
export * from './utils/testUtils.js';
export * from './utils/testProviders.jsx';
export * from './utils/security/index.js';

// Export configuration
export * from './config/testConfig.js';
```

### 2. Global Setup (src/setup.js)

Extract the comprehensive setup from `src/test/setup.js` with:
- Firebase mocks
- Axios mocks
- Zustand store mocks
- Global fetch mocks
- Test environment setup

### 3. Test Utilities (src/utils/testUtils.js)

Extract the utilities from `src/test/utils/testUtils.js` with:
- Mock data generators
- Context mock helpers
- Render utilities
- Common test functions

### 4. Security Tests (src/utils/security/)

Extract all security-related tests:
- `securityHeaders.test.js`
- `csrfProtection.test.js`
- `rateLimiter.test.js`
- `tokenManager.test.js`
- `errorHandler.test.js`

### 5. Test Runner (src/runners/runAllTests.js)

Extract the sophisticated test runner with:
- Categorized test execution
- Detailed reporting
- Coverage integration
- Security report generation

## CLI Tool (bin/security-test.js)

```javascript
#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

const commands = {
  'run': 'Run all tests',
  'security': 'Run security tests only',
  'coverage': 'Run tests with coverage',
  'component': 'Run component tests',
  'unit': 'Run unit tests',
  'integration': 'Run integration tests',
  'help': 'Show this help message'
};

function showHelp() {
  console.log('Security Test Framework CLI\n');
  console.log('Usage: security-test <command> [options]\n');
  console.log('Commands:');
  Object.entries(commands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(12)} ${desc}`);
  });
}

function runCommand(command) {
  const runnerPath = join(__dirname, '../src/runners/runAllTests.js');
  
  try {
    execSync(`node ${runnerPath} ${command}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } catch (error) {
    console.error('Error running tests:', error.message);
    process.exit(1);
  }
}

// Parse command
const command = args[0];

if (!command || command === 'help') {
  showHelp();
  process.exit(0);
}

if (!commands[command]) {
  console.error(`Unknown command: ${command}`);
  showHelp();
  process.exit(1);
}

runCommand(command);
```

## Templates

### Component Test Template (src/templates/component.test.jsx)

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TestUtils, TestProviders } from '../index.js';

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(
      <TestProviders>
        <ComponentName />
      </TestProviders>
    );
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(
      <TestProviders>
        <ComponentName />
      </TestProviders>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Updated Text')).toBeInTheDocument();
    });
  });
});
```

### Security Test Template (src/templates/security.test.js)

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { SecurityTests } from '../index.js';

describe('Security Tests', () => {
  beforeEach(() => {
    // Setup security test environment
  });

  it('should validate CSRF protection', () => {
    const result = SecurityTests.validateCSRFProtection();
    expect(result.isValid).toBe(true);
  });

  it('should check rate limiting', () => {
    const result = SecurityTests.checkRateLimiting();
    expect(result.isRateLimited).toBe(true);
  });

  it('should validate security headers', () => {
    const headers = SecurityTests.getSecurityHeaders();
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
  });
});
```

## Documentation

### README.md

```markdown
# Security Test Framework

A comprehensive test framework with security testing, coverage reporting, and multiple test categories.

## Features

- 🔒 **Security Testing**: Built-in security vulnerability testing
- 📊 **Coverage Reporting**: Comprehensive coverage analysis
- 🧪 **Multiple Test Types**: Unit, component, integration, and security tests
- 🎭 **Advanced Mocking**: Sophisticated mocking for Firebase, APIs, and stores
- 🚀 **CLI Tool**: Command-line interface for test execution
- 📦 **Portable**: Easy to integrate into any React project

## Installation

```bash
npm install security-test-framework
```

## Quick Start

```javascript
import { TestFramework, TestUtils, SecurityTests } from 'security-test-framework';

// Run all tests
TestFramework.runAll();

// Run security tests only
SecurityTests.run();

// Use test utilities
const mockUser = TestUtils.createMockUser();
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
npx security-test component
npx security-test unit
npx security-test integration
```

## Documentation

- [API Documentation](./docs/API.md)
- [Security Testing Guide](./docs/SECURITY.md)
- [Usage Examples](./docs/EXAMPLES.md)

## License

MIT
```

## Build Script (scripts/build.js)

```javascript
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Update package.json version
const packagePath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

// Increment patch version
const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = `${major}.${minor}.${parseInt(patch) + 1}`;

writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

console.log(`Built version ${packageJson.version}`);
```

## .npmignore

```
src/test/
coverage/
node_modules/
.git/
.gitignore
.npmignore
*.log
.DS_Store
.vscode/
.idea/
```

## Publishing Instructions

### 1. Create New Project

```bash
# Create new directory
mkdir security-test-framework
cd security-test-framework

# Initialize git
git init
git remote add origin https://github.com/yourusername/security-test-framework.git
```

### 2. Copy Files

```bash
# Copy core files from ShelfSense project
cp -r /path/to/shelfsense-frontend/src/test/* ./src/
cp /path/to/shelfsense-frontend/package.json ./package.json
```

### 3. Modify Package.json

Update the package.json with the configuration provided above.

### 4. Create Additional Files

Create all the files mentioned in the structure:
- `src/index.js`
- `bin/security-test.js`
- `src/templates/`
- `docs/`
- `scripts/build.js`
- `.npmignore`

### 5. Test Locally

```bash
# Install dependencies
npm install

# Run tests
npm test

# Test CLI
node bin/security-test.js help
```

### 6. Publish

```bash
# Login to npm
npm login

# Publish
npm publish

# Or publish with specific tag
npm publish --tag beta
```

## Integration Guide

### For New Projects

```bash
# Install the package
npm install security-test-framework

# Add to package.json scripts
{
  "scripts": {
    "test": "security-test run",
    "test:security": "security-test security",
    "test:coverage": "security-test coverage"
  }
}
```

### Configuration

Create `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import { TestFramework } from 'security-test-framework';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/security-test-framework/src/setup.js'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

## Advanced Features

### Custom Security Tests

```javascript
import { SecurityTests } from 'security-test-framework';

// Extend security tests
SecurityTests.addCustomTest('custom-vulnerability', (app) => {
  // Custom security test logic
  return { isValid: true, details: 'Custom test passed' };
});
```

### Custom Test Utilities

```javascript
import { TestUtils } from 'security-test-framework';

// Extend test utilities
TestUtils.addCustomMock('custom-api', () => ({
  get: vi.fn(() => Promise.resolve({ data: {} })),
  post: vi.fn(() => Promise.resolve({ data: {} })),
}));
```

## Maintenance

### Version Management

- Use semantic versioning
- Update CHANGELOG.md for each release
- Tag releases in git

### Testing

- Run full test suite before publishing
- Test in different environments
- Validate CLI functionality

### Documentation

- Keep API documentation updated
- Add examples for new features
- Maintain security testing guide

## Support

- GitHub Issues for bug reports
- GitHub Discussions for questions
- Security issues: security@yourdomain.com

---

This framework provides a robust, portable testing solution that can be easily integrated into any React project while maintaining the sophisticated security testing and coverage reporting capabilities developed for the ShelfSense project.

## Comprehensive Security & Coverage Framework

### Full-Spectrum Testing Support

The framework provides comprehensive security testing and coverage reporting across all layers:

#### Frontend Security & Coverage
- **Component Security Testing**
  - XSS vulnerability detection
  - CSRF protection validation
  - Input sanitization testing
  - DOM-based attack prevention
  - Client-side data validation
- **UI/UX Security Testing**
  - Clickjacking prevention
  - Form injection attacks
  - Local storage security
  - Session management
  - Browser API security
- **Coverage Analysis**
  - Component coverage metrics
  - User interaction coverage
  - Error handling coverage
  - Accessibility coverage
  - Performance coverage

#### Backend Security & Coverage (NestJS)
- **API Security Testing**
  - Authentication bypass detection
  - Authorization testing
  - Input validation testing
  - SQL injection prevention
  - NoSQL injection testing
  - Command injection testing
  - File upload security
  - Rate limiting validation
- **Database Security Testing**
  - TypeORM/Prisma injection testing
  - Database connection security
  - Query optimization security
  - Data encryption validation
  - Backup security testing
- **Infrastructure Security**
  - Environment variable security
  - Configuration security
  - Logging security
  - Error handling security
  - Dependency vulnerability scanning
- **Coverage Analysis**
  - Controller coverage metrics
  - Service layer coverage
  - Database query coverage
  - Error handling coverage
  - Security middleware coverage

#### Full-Stack Security & Coverage
- **End-to-End Security Testing**
  - Complete user journey security
  - Cross-layer vulnerability detection
  - Integration security testing
  - API gateway security
  - Microservices security
- **Performance Security Testing**
  - Load testing with security focus
  - Stress testing security boundaries
  - Memory leak security testing
  - Resource exhaustion testing
- **Coverage Integration**
  - Full-stack coverage reporting
  - Security coverage metrics
  - Performance coverage analysis
  - Integration coverage tracking

### Comprehensive Framework Architecture

```
security-test-framework/
├── src/
│   ├── core/                           # Core testing utilities
│   │   ├── testRunner.js               # Universal test runner
│   │   ├── mockGenerator.js            # Mock data generators
│   │   ├── assertionHelpers.js         # Enhanced assertions
│   │   ├── coverageAnalyzer.js         # Coverage analysis engine
│   │   └── securityScanner.js          # Security vulnerability scanner
│   ├── frontend/                       # Frontend security & coverage
│   │   ├── reactUtils.js               # React testing utilities
│   │   ├── domUtils.js                 # DOM testing utilities
│   │   ├── browserMocks.js             # Browser API mocks
│   │   ├── xssDetector.js              # XSS vulnerability detection
│   │   ├── csrfValidator.js            # CSRF protection validation
│   │   ├── inputSanitizer.js           # Input sanitization testing
│   │   ├── clickjackingDetector.js     # Clickjacking prevention
│   │   └── clientSecurity.js           # Client-side security testing
│   ├── backend/                        # Backend security & coverage (NestJS)
│   │   ├── nestUtils.js                # NestJS testing utilities
│   │   ├── controllerUtils.js          # Controller testing utilities
│   │   ├── serviceUtils.js             # Service testing utilities
│   │   ├── dbUtils.js                  # Database testing utilities
│   │   ├── authUtils.js                # Authentication testing utilities
│   │   ├── sqlInjectionDetector.js     # SQL injection detection
│   │   ├── noSqlInjectionDetector.js   # NoSQL injection detection
│   │   ├── commandInjectionDetector.js # Command injection detection
│   │   ├── fileUploadSecurity.js       # File upload security testing
│   │   ├── rateLimitValidator.js       # Rate limiting validation
│   │   └── serverMocks.js              # Server environment mocks
│   ├── security/                       # Comprehensive security testing
│   │   ├── authTests.js                # Authentication testing
│   │   ├── authorizationTests.js       # Authorization testing
│   │   ├── inputValidation.js          # Input validation testing
│   │   ├── sqlInjection.js             # SQL injection testing
│   │   ├── noSqlInjection.js           # NoSQL injection testing
│   │   ├── xssTests.js                 # XSS vulnerability testing
│   │   ├── csrfTests.js                # CSRF protection testing
│   │   ├── commandInjection.js         # Command injection testing
│   │   ├── fileUploadTests.js          # File upload security testing
│   │   ├── sessionSecurity.js          # Session security testing
│   │   ├── encryptionTests.js          # Encryption validation testing
│   │   ├── dependencyVulnerability.js  # Dependency vulnerability scanning
│   │   ├── environmentSecurity.js      # Environment security testing
│   │   └── loggingSecurity.js          # Logging security testing
│   ├── coverage/                       # Comprehensive coverage analysis
│   │   ├── codeCoverage.js             # Code coverage analysis
│   │   ├── securityCoverage.js         # Security coverage metrics
│   │   ├── performanceCoverage.js      # Performance coverage analysis
│   │   ├── integrationCoverage.js      # Integration coverage tracking
│   │   ├── accessibilityCoverage.js    # Accessibility coverage
│   │   └── errorHandlingCoverage.js    # Error handling coverage
│   ├── performance/                    # Performance security testing
│   │   ├── loadTesting.js              # Load testing with security focus
│   │   ├── stressTesting.js            # Stress testing security boundaries
│   │   ├── memoryLeakDetector.js       # Memory leak security testing
│   │   ├── resourceExhaustion.js       # Resource exhaustion testing
│   │   └── performanceSecurity.js      # Performance security validation
│   └── integration/                    # Integration testing
│       ├── e2eUtils.js                 # End-to-end testing utilities
│       ├── apiIntegration.js           # API integration testing
│       ├── fullStackTests.js           # Full-stack testing scenarios
│       ├── microservicesSecurity.js    # Microservices security testing
│       └── crossLayerSecurity.js       # Cross-layer security testing
```

### Comprehensive Usage Examples

#### Frontend Security & Coverage Testing
```javascript
import { FrontendUtils, SecurityTests, CoverageAnalyzer } from 'security-test-framework';

// Comprehensive React component testing
describe('UserProfile Component Security & Coverage', () => {
  it('should handle user input securely and maintain coverage', () => {
    const { getByLabelText, getByRole } = render(<UserProfile />);
    const input = getByLabelText('Email');
    
    // Test XSS prevention
    fireEvent.change(input, { target: { value: '<script>alert("xss")</script>' } });
    expect(input.value).not.toContain('<script>');
    
    // Test CSRF protection
    const form = getByRole('form');
    expect(form).toHaveAttribute('data-csrf-token');
    
    // Coverage analysis
    const coverage = CoverageAnalyzer.getComponentCoverage('UserProfile');
    expect(coverage.security).toBeGreaterThan(90);
    expect(coverage.userInteraction).toBeGreaterThan(85);
  });

  it('should prevent clickjacking attacks', () => {
    const result = SecurityTests.testClickjackingPrevention({
      component: 'UserProfile',
      iframeAttempts: true,
      overlayAttempts: true
    });
    
    expect(result.vulnerable).toBe(false);
  });

  it('should validate local storage security', () => {
    const result = SecurityTests.testLocalStorageSecurity({
      sensitiveData: ['userToken', 'sessionId'],
      encryption: true,
      expiration: true
    });
    
    expect(result.secure).toBe(true);
  });
});
```

#### Backend Security & Coverage Testing (NestJS)
```javascript
import { NestUtils, SecurityTests, CoverageAnalyzer, PerformanceTester } from 'security-test-framework';

// Comprehensive NestJS testing
describe('UserController Security & Coverage', () => {
  let controller: UserController;
  let service: UserService;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await NestUtils.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [TypeOrmModule.forRoot(testConfig)]
    });
    
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should prevent SQL injection and maintain coverage', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    const createUserDto = { email: maliciousInput, name: 'Test User' };
    
    await expect(controller.create(createUserDto)).rejects.toThrow();
    expect(service.create).not.toHaveBeenCalled();
    
    // Coverage analysis
    const coverage = CoverageAnalyzer.getControllerCoverage('UserController');
    expect(coverage.security).toBeGreaterThan(95);
    expect(coverage.errorHandling).toBeGreaterThan(90);
  });

  it('should validate JWT authentication comprehensively', async () => {
    const testCases = [
      { token: 'valid-jwt-token', expected: 'success' },
      { token: 'invalid-jwt-token', expected: 'reject' },
      { token: 'expired-jwt-token', expected: 'reject' },
      { token: 'malformed-jwt-token', expected: 'reject' }
    ];

    for (const testCase of testCases) {
      const mockRequest = NestUtils.createMockRequest({
        headers: { authorization: `Bearer ${testCase.token}` }
      });
      
      if (testCase.expected === 'success') {
        await expect(controller.getProfile(mockRequest)).resolves.toBeDefined();
      } else {
        await expect(controller.getProfile(mockRequest)).rejects.toThrow();
      }
    }
  });

  it('should test file upload security', async () => {
    const maliciousFiles = [
      { name: 'script.js', content: '<script>alert("xss")</script>' },
      { name: 'virus.exe', content: 'malicious-binary-content' },
      { name: 'large-file.txt', content: 'x'.repeat(10000000) } // 10MB file
    ];

    for (const file of maliciousFiles) {
      const result = await SecurityTests.testFileUploadSecurity({
        app,
        endpoint: '/users/upload',
        file: file
      });
      
      expect(result.accepted).toBe(false);
    }
  });

  it('should validate rate limiting', async () => {
    const result = await SecurityTests.testRateLimiting({
      app,
      endpoint: '/users/login',
      method: 'POST',
      attempts: 100,
      timeWindow: 60000 // 1 minute
    });
    
    expect(result.rateLimited).toBe(true);
    expect(result.blockedAfter).toBeLessThan(10);
  });

  it('should test performance under security load', async () => {
    const performanceResult = await PerformanceTester.testSecurityLoad({
      app,
      endpoint: '/users',
      concurrentUsers: 100,
      securityTests: ['sql-injection', 'xss', 'csrf'],
      duration: 30000 // 30 seconds
    });
    
    expect(performanceResult.responseTime.avg).toBeLessThan(200);
    expect(performanceResult.securityChecks.passed).toBe(true);
  });
});
```

#### Full-Stack Security & Coverage Testing
```javascript
import { IntegrationUtils, SecurityTests, CoverageAnalyzer, PerformanceTester } from 'security-test-framework';

// Comprehensive end-to-end testing
describe('Complete User Authentication Flow', () => {
  it('should complete secure login process with full coverage', async () => {
    const result = await IntegrationUtils.testFullStackFlow({
      frontend: 'login-form',
      backend: 'auth-endpoint',
      security: ['csrf', 'rate-limiting', 'input-validation', 'xss', 'sql-injection'],
      coverage: ['frontend', 'backend', 'integration', 'security']
    });
    
    expect(result.success).toBe(true);
    expect(result.securityChecks.passed).toBe(true);
    expect(result.coverage.frontend).toBeGreaterThan(90);
    expect(result.coverage.backend).toBeGreaterThan(95);
    expect(result.coverage.integration).toBeGreaterThan(85);
  });

  it('should test complete user journey security', async () => {
    const userJourney = [
      { step: 'registration', security: ['input-validation', 'password-strength'] },
      { step: 'login', security: ['rate-limiting', 'jwt-validation'] },
      { step: 'profile-update', security: ['csrf', 'authorization'] },
      { step: 'file-upload', security: ['file-validation', 'virus-scan'] },
      { step: 'logout', security: ['session-cleanup', 'token-invalidation'] }
    ];

    for (const step of userJourney) {
      const stepResult = await IntegrationUtils.testUserJourneyStep({
        step: step.step,
        securityTests: step.security,
        coverage: true
      });
      
      expect(stepResult.security.passed).toBe(true);
      expect(stepResult.coverage).toBeGreaterThan(85);
    }
  });

  it('should test microservices security integration', async () => {
    const microservices = [
      { service: 'auth-service', endpoints: ['/login', '/register', '/verify'] },
      { service: 'user-service', endpoints: ['/profile', '/update', '/delete'] },
      { service: 'file-service', endpoints: ['/upload', '/download', '/delete'] }
    ];

    for (const service of microservices) {
      const serviceResult = await IntegrationUtils.testMicroserviceSecurity({
        service: service.service,
        endpoints: service.endpoints,
        security: ['authentication', 'authorization', 'rate-limiting'],
        coverage: true
      });
      
      expect(serviceResult.security.passed).toBe(true);
      expect(serviceResult.coverage).toBeGreaterThan(90);
    }
  });

  it('should test performance under full security load', async () => {
    const performanceResult = await PerformanceTester.testFullStackPerformance({
      concurrentUsers: 500,
      securityTests: ['all'],
      coverage: true,
      duration: 60000 // 1 minute
    });
    
    expect(performanceResult.responseTime.avg).toBeLessThan(300);
    expect(performanceResult.securityChecks.passed).toBe(true);
    expect(performanceResult.coverage.maintained).toBe(true);
  });
});
```

### Configuration for Different Project Types

#### Frontend Project (React/Vue/Angular)
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./node_modules/security-test-framework/src/frontend/setup.js'],
    globals: true,
  },
});
```

#### Backend Project (NestJS)
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./node_modules/security-test-framework/src/backend/setup.js'],
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
  },
});
```

#### Full-Stack Project
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./node_modules/security-test-framework/src/integration/setup.js'],
    globals: true,
  },
});
```

### CLI Commands for Different Contexts

```bash
# Frontend testing
npx security-test frontend:component
npx security-test frontend:integration
npx security-test frontend:security

# Backend testing (NestJS)
npx security-test backend:controller
npx security-test backend:service
npx security-test backend:database
npx security-test backend:auth
npx security-test backend:security

# Full-stack testing
npx security-test fullstack:e2e
npx security-test fullstack:integration
npx security-test fullstack:security

# Universal security testing
npx security-test security:auth
npx security-test security:input
npx security-test security:injection
```

### Database Testing Support (TypeORM/Prisma)

```javascript
import { DatabaseUtils } from 'security-test-framework';

// TypeORM database security testing
describe('TypeORM Database Security', () => {
  it('should prevent SQL injection in repositories', async () => {
    const result = await DatabaseUtils.testTypeORMInjection({
      repository: UserRepository,
      queries: [
        { method: 'findOne', params: { email: 'test@example.com' } },
        { method: 'findOne', params: { email: "'; DROP TABLE users; --" } }
      ]
    });
    
    expect(result.vulnerable).toBe(false);
  });
});

// Prisma database security testing
describe('Prisma Database Security', () => {
  it('should prevent SQL injection in Prisma queries', async () => {
    const result = await DatabaseUtils.testPrismaInjection({
      client: prisma,
      queries: [
        { model: 'user', action: 'findFirst', where: { email: 'test@example.com' } },
        { model: 'user', action: 'findFirst', where: { email: "'; DROP TABLE users; --" } }
      ]
    });
    
    expect(result.vulnerable).toBe(false);
  });
});
```

### NestJS API Testing Support

```javascript
import { NestAPIUtils } from 'security-test-framework';

// NestJS API security testing
describe('NestJS API Security', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await NestAPIUtils.createTestingModule({
      imports: [AppModule],
    });
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should validate DTO input properly', async () => {
    const result = await NestAPIUtils.testDTOValidation({
      app,
      endpoint: '/users',
      method: 'POST',
      payloads: [
        { email: 'valid@example.com', name: 'Test User' },
        { email: '<script>alert("xss")</script>', name: 'Test User' },
        { email: "'; DROP TABLE users; --", name: 'Test User' }
      ]
    });
    
    expect(result.validInputs.accepted).toBe(true);
    expect(result.maliciousInputs.rejected).toBe(true);
  });

  it('should test JWT authentication guards', async () => {
    const result = await NestAPIUtils.testAuthGuards({
      app,
      endpoint: '/users/profile',
      method: 'GET',
      tokens: [
        'valid-jwt-token',
        'invalid-jwt-token',
        'expired-jwt-token'
      ]
    });
    
    expect(result.validToken.accepted).toBe(true);
    expect(result.invalidToken.rejected).toBe(true);
  });

  it('should test role-based authorization', async () => {
    const result = await NestAPIUtils.testRoleAuthorization({
      app,
      endpoint: '/admin/users',
      method: 'GET',
      roles: ['admin', 'user', 'guest']
    });
    
    expect(result.adminRole.accepted).toBe(true);
    expect(result.userRole.rejected).toBe(true);
  });
});
```

This universal approach makes the framework suitable for any type of project while maintaining the sophisticated security testing capabilities.

## 🚀 Easy Integration Guide

### Quick Start (5 Minutes Setup)

#### 1. Install the Package
```bash
npm install security-test-framework
```

#### 2. Add to Your Package.json Scripts
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

#### 3. Create a Simple Test File
```javascript
// tests/security.test.js
import { SecurityTests, CoverageAnalyzer } from 'security-test-framework';

describe('My App Security', () => {
  it('should pass basic security checks', () => {
    const result = SecurityTests.runBasicChecks();
    expect(result.passed).toBe(true);
  });
});
```

#### 4. Run Tests
```bash
npm test
```

### Integration Examples by Project Type

#### React Frontend Project
```bash
# Install
npm install security-test-framework

# Create vitest.config.js
```

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./node_modules/security-test-framework/src/frontend/setup.js'],
    globals: true,
  },
});
```

```javascript
// src/components/UserProfile.test.jsx
import { render, screen } from '@testing-library/react';
import { SecurityTests, CoverageAnalyzer } from 'security-test-framework';
import UserProfile from './UserProfile';

describe('UserProfile Security', () => {
  it('should prevent XSS attacks', () => {
    render(<UserProfile />);
    
    const result = SecurityTests.testXSSPrevention({
      component: screen.getByTestId('user-profile'),
      input: '<script>alert("xss")</script>'
    });
    
    expect(result.vulnerable).toBe(false);
  });
});
```

#### NestJS Backend Project
```bash
# Install
npm install security-test-framework

# Create vitest.config.js
```

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./node_modules/security-test-framework/src/backend/setup.js'],
    globals: true,
  },
});
```

```javascript
// src/users/users.controller.test.ts
import { Test } from '@nestjs/testing';
import { SecurityTests, CoverageAnalyzer } from 'security-test-framework';
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

#### Full-Stack Project
```bash
# Install
npm install security-test-framework

# Create vitest.config.js
```

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./node_modules/security-test-framework/src/integration/setup.js'],
    globals: true,
  },
});
```

```javascript
// tests/integration/auth-flow.test.js
import { IntegrationUtils, SecurityTests } from 'security-test-framework';

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

### One-Line Integration

#### For Existing Projects
```bash
# Add to existing test setup
npm install security-test-framework && echo "import 'security-test-framework/src/core/setup.js';" >> your-test-setup.js
```

#### For New Projects
```bash
# Create new project with security testing
npx create-react-app my-app && cd my-app && npm install security-test-framework
```

### CLI Commands (No Configuration Needed)

```bash
# Run all security tests
npx security-test run

# Run specific security tests
npx security-test security:xss
npx security-test security:sql-injection
npx security-test security:csrf

# Run with coverage
npx security-test coverage

# Run performance tests
npx security-test performance:load

# Generate security report
npx security-test report:security
```

### Automatic Integration

#### Zero-Config Mode
The framework automatically detects your project type and applies appropriate settings:

```bash
# Just run - no config needed
npx security-test auto
```

#### Auto-Detection Features
- ✅ Detects React/Vue/Angular frontend
- ✅ Detects NestJS/Express backend
- ✅ Detects TypeScript/JavaScript
- ✅ Detects testing framework (Vitest/Jest)
- ✅ Auto-configures environment
- ✅ Auto-generates test templates

### Migration from Existing Tests

#### From Jest
```javascript
// Before (Jest)
import { render, screen } from '@testing-library/react';

// After (Security Framework)
import { render, screen } from '@testing-library/react';
import { SecurityTests } from 'security-test-framework';

// Your existing tests work + security testing
```

#### From Vitest
```javascript
// Before (Vitest)
import { describe, it, expect } from 'vitest';

// After (Security Framework)
import { describe, it, expect } from 'vitest';
import { SecurityTests } from 'security-test-framework';

// Your existing tests work + security testing
```

### Configuration Options

#### Minimal Configuration
```javascript
// vitest.config.js (minimal)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/security-test-framework/src/core/setup.js'],
  },
});
```

#### Advanced Configuration
```javascript
// vitest.config.js (advanced)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./node_modules/security-test-framework/src/core/setup.js'],
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

### Integration Checklist

#### ✅ Frontend Integration (2 minutes)
- [ ] `npm install security-test-framework`
- [ ] Add setup file to vitest.config.js
- [ ] Import SecurityTests in one test file
- [ ] Run `npm test`

#### ✅ Backend Integration (2 minutes)
- [ ] `npm install security-test-framework`
- [ ] Add setup file to vitest.config.js
- [ ] Import SecurityTests in one test file
- [ ] Run `npm test`

#### ✅ Full-Stack Integration (3 minutes)
- [ ] `npm install security-test-framework`
- [ ] Add setup file to vitest.config.js
- [ ] Create integration test file
- [ ] Run `npm test`

### Troubleshooting

#### Common Issues & Solutions

**Issue**: "Module not found"
```bash
# Solution: Clear cache and reinstall
npm cache clean --force
npm install security-test-framework
```

**Issue**: "Setup file not found"
```javascript
// Solution: Use correct path
setupFiles: ['./node_modules/security-test-framework/src/core/setup.js']
```

**Issue**: "Security tests not running"
```javascript
// Solution: Import SecurityTests
import { SecurityTests } from 'security-test-framework';
```

### Migration Support

#### From Other Security Testing Tools
```javascript
// From OWASP ZAP
// Before
const zap = new ZapClient();

// After
import { SecurityTests } from 'security-test-framework';
const result = SecurityTests.testOWASPZAP();

// From Snyk
// Before
const snyk = require('snyk');

// After
import { SecurityTests } from 'security-test-framework';
const result = SecurityTests.testDependencyVulnerabilities();
```

### Support & Community

#### Getting Help
- 📖 [Documentation](https://github.com/yourusername/security-test-framework)
- 💬 [Discussions](https://github.com/yourusername/security-test-framework/discussions)
- 🐛 [Issues](https://github.com/yourusername/security-test-framework/issues)
- 📧 [Email Support](mailto:support@yourdomain.com)

#### Community Examples
- [React + Security Framework](https://github.com/example/react-security-demo)
- [NestJS + Security Framework](https://github.com/example/nestjs-security-demo)
- [Full-Stack + Security Framework](https://github.com/example/fullstack-security-demo)

---

**The framework is designed for maximum ease of use - you can be running security tests in under 5 minutes!**
