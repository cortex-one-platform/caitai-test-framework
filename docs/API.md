# Security Test Framework - API Documentation

## Overview

The Security Test Framework provides a comprehensive API for security testing, coverage analysis, and performance testing in React, NestJS, and full-stack applications.

## Core APIs

### TestFramework

The main test framework class that orchestrates all testing operations.

```javascript
import { TestFramework } from 'security-test-framework';

// Run all tests
const results = await TestFramework.runAll();

// Configure the framework
TestFramework.configure({
  security: { enabled: true, strict: true },
  coverage: { enabled: true, threshold: 80 },
  performance: { enabled: true, timeout: 30000 }
});

// Add custom tests
TestFramework.addCustomTest('custom-test', async () => {
  // Custom test logic
  return { success: true };
});
```

### SecurityTests

Comprehensive security testing utilities.

```javascript
import { SecurityTests } from 'security-test-framework';

// Run all security tests
const results = await SecurityTests.runAll();

// Run specific security tests
const xssResult = await SecurityTests.testXSSPrevention();
const sqlResult = await SecurityTests.testSQLInjection();
const csrfResult = await SecurityTests.testCSRFProtection();
const authResult = await SecurityTests.testAuthentication();
const authzResult = await SecurityTests.testAuthorization();
const inputResult = await SecurityTests.testInputValidation();
const fileResult = await SecurityTests.testFileUploadSecurity();
const sessionResult = await SecurityTests.testSessionSecurity();
const encryptResult = await SecurityTests.testEncryption();
const depResult = await SecurityTests.testDependencyVulnerabilities();
const envResult = await SecurityTests.testEnvironmentSecurity();
const logResult = await SecurityTests.testLoggingSecurity();
```

### TestUtils (Mock Generator)

Comprehensive mock data generation utilities.

```javascript
import { TestUtils } from 'security-test-framework';

// Generate mock data
const mockUser = TestUtils.createMockUser();
const mockProduct = TestUtils.createMockProduct();
const mockOrder = TestUtils.createMockOrder();
const mockAuth = TestUtils.createMockAuth();
const mockApiResponse = TestUtils.createMockApiResponse();
const mockDatabase = TestUtils.createMockDatabase();
const mockFirebase = TestUtils.createMockFirebase();
const mockRequest = TestUtils.createMockRequest();
const mockResponse = TestUtils.createMockResponse();
const mockError = TestUtils.createMockError();
const mockFormData = TestUtils.createMockFormData();
const mockFileUpload = TestUtils.createMockFileUpload();
const mockValidationError = TestUtils.createMockValidationError();

// Generate data sets
const users = TestUtils.generateDataSet(10, 'users');
const products = TestUtils.generateDataSet(5, 'products');
const orders = TestUtils.generateDataSet(3, 'orders');

// Reset mocks
TestUtils.resetMocks();
```

### AssertionHelpers

Enhanced assertion utilities for comprehensive testing.

```javascript
import { AssertionHelpers } from 'security-test-framework';

// Data validation assertions
AssertionHelpers.expectValidEmail('test@example.com');
AssertionHelpers.expectValidUrl('https://example.com');
AssertionHelpers.expectValidUUID('123e4567-e89b-12d3-a456-426614174000');
AssertionHelpers.expectValidJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
AssertionHelpers.expectValidDate('2024-01-01T00:00:00Z');
AssertionHelpers.expectValidPhoneNumber('+1234567890');
AssertionHelpers.expectValidCreditCard('4532015112830366');
AssertionHelpers.expectValidIPAddress('192.168.1.1');
AssertionHelpers.expectValidHexColor('#ff0000');
AssertionHelpers.expectValidTime('12:00:00');
AssertionHelpers.expectValidISODate('2024-01-01T00:00:00Z');
AssertionHelpers.expectValidSlug('my-test-slug');
AssertionHelpers.expectValidUsername('testuser');
AssertionHelpers.expectValidDomain('example.com');
AssertionHelpers.expectValidPort(8080);
AssertionHelpers.expectValidVersion('1.0.0');
AssertionHelpers.expectValidMACAddress('00:1B:44:11:3A:B7');
AssertionHelpers.expectValidPostalCode('12345');
AssertionHelpers.expectValidSSN('123-45-6789');
AssertionHelpers.expectValidISBN('978-0-7475-3269-9');
AssertionHelpers.expectValidLatitude(40.7128);
AssertionHelpers.expectValidLongitude(-74.0060);
AssertionHelpers.expectValidCoordinates({ lat: 40.7128, lng: -74.0060 });
AssertionHelpers.expectValidCurrency('100.50');
AssertionHelpers.expectValidPercentage(85);
AssertionHelpers.expectValidAge(25);
AssertionHelpers.expectValidYear(2024);
AssertionHelpers.expectValidMonth(12);
AssertionHelpers.expectValidDay(31);
AssertionHelpers.expectValidHour(23);
AssertionHelpers.expectValidMinute(59);
AssertionHelpers.expectValidSecond(59);

// Range and length assertions
AssertionHelpers.expectInRange(50, 0, 100);
AssertionHelpers.expectLength('test', 4);
AssertionHelpers.expectMinLength('test', 3);
AssertionHelpers.expectMaxLength('test', 10);

// Object property assertions
AssertionHelpers.expectRequiredProperties(obj, ['id', 'name', 'email']);
AssertionHelpers.expectOptionalProperties(obj, ['avatar', 'bio']);

// Security assertions
AssertionHelpers.expectStrongPassword('SecurePass123!');
AssertionHelpers.expectNoXSS(userInput);
AssertionHelpers.expectNoSQLInjection(queryInput);

// File validation assertions
AssertionHelpers.expectValidFileSize(fileSize, maxSize);
AssertionHelpers.expectValidFileType(filename, ['jpg', 'png', 'gif']);

// Data format assertions
AssertionHelpers.expectValidJSON(jsonString);
AssertionHelpers.expectValidBase64(base64String);
```

### CoverageAnalyzer

Coverage analysis utilities.

```javascript
import { CoverageAnalyzer } from 'security-test-framework';

// Analyze coverage
const coverage = await CoverageAnalyzer.analyzeCoverage({
  threshold: 80,
  includeSecurity: true,
  includePerformance: true
});

console.log(`Overall coverage: ${coverage.overall}%`);
console.log('Coverage by category:', coverage.byCategory);
console.log('Recommendations:', coverage.recommendations);
```

### PerformanceTester

Performance testing utilities.

```javascript
import { PerformanceTester } from 'security-test-framework';

// Run performance tests
const performance = await PerformanceTester.runLoadTests({
  concurrentUsers: 100,
  duration: 30000,
  securityTests: true
});

console.log('Response time:', performance.responseTime);
console.log('Throughput:', performance.throughput);
console.log('Memory usage:', performance.memoryUsage);
console.log('Recommendations:', performance.recommendations);
```

### IntegrationUtils

Integration testing utilities.

```javascript
import { IntegrationUtils } from 'security-test-framework';

// Test full-stack flow
const result = await IntegrationUtils.testFullStackFlow({
  frontend: 'login-form',
  backend: 'auth-endpoint',
  security: ['csrf', 'rate-limiting', 'input-validation'],
  coverage: ['frontend', 'backend', 'integration']
});

console.log('Success:', result.success);
console.log('Security checks:', result.securityChecks);
console.log('Coverage:', result.coverage);
```

## Frontend Utilities

### ReactUtils

React-specific testing utilities.

```javascript
import { ReactUtils } from 'security-test-framework';

// Create test providers
const providers = ReactUtils.createTestProviders(<MyComponent />);
```

### DOMUtils

DOM testing utilities.

```javascript
import { DOMUtils } from 'security-test-framework';

// Create mock elements
const element = DOMUtils.createMockElement('div', {
  'data-testid': 'test-element',
  className: 'test-class'
});
```

## Backend Utilities

### NestUtils

NestJS testing utilities.

```javascript
import { NestUtils } from 'security-test-framework';

// Create testing module
const module = await NestUtils.createTestingModule({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forRoot(testConfig)]
});

const controller = module.get<UserController>(UserController);
const app = module.createNestApplication();
await app.init();
```

### ControllerUtils

Controller testing utilities.

```javascript
import { ControllerUtils } from 'security-test-framework';

// Create mock request
const request = ControllerUtils.createMockRequest({
  method: 'POST',
  url: '/api/users',
  body: { email: 'test@example.com' },
  headers: { authorization: 'Bearer token' }
});
```

## Configuration

### testConfig

Default configuration object.

```javascript
import { testConfig } from 'security-test-framework';

console.log('Security config:', testConfig.security);
console.log('Coverage config:', testConfig.coverage);
console.log('Performance config:', testConfig.performance);
console.log('Database config:', testConfig.database);
console.log('API config:', testConfig.api);
```

## Error Handling

All API methods return consistent error objects:

```javascript
{
  success: false,
  error: 'Error message',
  details: 'Additional error details',
  timestamp: '2024-01-01T00:00:00Z'
}
```

## TypeScript Support

The framework includes TypeScript definitions for all APIs. Import types as needed:

```typescript
import type { 
  SecurityTestResult, 
  CoverageResult, 
  PerformanceResult,
  MockData 
} from 'security-test-framework';
```
