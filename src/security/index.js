import { testXSSPrevention } from './xssTests.js';
import { testSQLInjection } from './sqlInjection.js';
import { testCSRFProtection } from './csrfTests.js';
import { testAuthentication } from './authTests.js';
import { testAuthorization } from './authorizationTests.js';
import { testInputValidation } from './inputValidation.js';
import { testFileUploadSecurity } from './fileUploadTests.js';
import { testSessionSecurity } from './sessionSecurity.js';
import { testEncryption } from './encryptionTests.js';
import { testDependencyVulnerabilities } from './dependencyVulnerability.js';
import { testEnvironmentSecurity } from './environmentSecurity.js';
import { testLoggingSecurity } from './loggingSecurity.js';
import { testSecurityHeaders } from './securityHeaders.js';
import { testRateLimiting } from './rateLimiter.js';
import { testTokenManagement } from './tokenManager.js';
import { testErrorHandling } from './errorHandler.js';
import ReportGenerator from '../reporting/reportGenerator.js';

export const SecurityTests = {
  testXSSPrevention,
  testSQLInjection,
  testCSRFProtection,
  testAuthentication,
  testAuthorization,
  testInputValidation,
  testFileUploadSecurity,
  testSessionSecurity,
  testEncryption,
  testDependencyVulnerabilities,
  testEnvironmentSecurity,
  testLoggingSecurity,
  testSecurityHeaders,
  testRateLimiting,
  testTokenManagement,
  testErrorHandling,

  // Run all security tests
  async runAll(options = {}) {
    const results = {
      passed: 0,
      failed: 0,
      vulnerabilities: [],
      timestamp: new Date().toISOString()
    };

    const tests = [
      { name: 'XSS Prevention', test: testXSSPrevention },
      { name: 'SQL Injection', test: testSQLInjection },
      { name: 'CSRF Protection', test: testCSRFProtection },
      { name: 'Authentication', test: testAuthentication },
      { name: 'Authorization', test: testAuthorization },
      { name: 'Input Validation', test: testInputValidation },
      { name: 'File Upload Security', test: testFileUploadSecurity },
      { name: 'Session Security', test: testSessionSecurity },
      { name: 'Encryption', test: testEncryption },
      { name: 'Dependency Vulnerabilities', test: testDependencyVulnerabilities },
      { name: 'Environment Security', test: testEnvironmentSecurity },
      { name: 'Logging Security', test: testLoggingSecurity },
      { name: 'Security Headers', test: testSecurityHeaders },
      { name: 'Rate Limiting', test: testRateLimiting },
      { name: 'Token Management', test: testTokenManagement },
      { name: 'Error Handling', test: testErrorHandling }
    ];

    for (const { name, test } of tests) {
      try {
        const result = await test(options);
        if (result.vulnerable) {
          results.failed++;
          results.vulnerabilities.push({ type: name, details: result });
        } else {
          results.passed++;
        }
      } catch (error) {
        results.failed++;
        results.vulnerabilities.push({ type: name, error: error.message });
      }
    }

    return results;
  },

  // Generate security report
  async generateReport(options = {}) {
    const {
      format = 'html',
      outputPath = './reports',
      includeDetails = true,
      includeRecommendations = true
    } = options;

    // Run security tests to get data
    const testResults = await this.runAll();
    
    const report = {
      type: 'security',
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: testResults.passed + testResults.failed,
        passed: testResults.passed,
        failed: testResults.failed,
        vulnerabilities: testResults.vulnerabilities.length
      },
      details: includeDetails ? testResults.vulnerabilities.map(v => `${v.type}: ${v.error || v.details?.message || 'Vulnerability detected'}`) : [],
      recommendations: includeRecommendations ? [
        'Implement input validation for all user inputs',
        'Use parameterized queries to prevent SQL injection',
        'Enable CSRF protection on all forms',
        'Implement proper authentication and authorization',
        'Use HTTPS for all communications',
        'Regularly update dependencies',
        'Implement proper error handling',
        'Use security headers',
        'Implement rate limiting',
        'Use secure session management'
      ] : [],
      metadata: {
        framework: 'security-test-framework',
        version: '1.0.0'
      }
    };

    return await ReportGenerator.generateSecurityReport({
      ...options,
      data: report
    });
  }
};

export default SecurityTests;
