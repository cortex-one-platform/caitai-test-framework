import { vi } from 'vitest';
import { SecurityTests } from '../security/index.js';
import { CoverageAnalyzer } from '../coverage/codeCoverage.js';
import { PerformanceTester } from '../performance/loadTesting.js';

class TestFramework {
  constructor() {
    this.testResults = {
      unit: [],
      component: [],
      integration: [],
      security: [],
      performance: [],
      coverage: {}
    };
    this.config = {
      security: {
        enabled: true,
        strict: false,
        report: true
      },
      coverage: {
        enabled: true,
        threshold: 80
      },
      performance: {
        enabled: true,
        timeout: 30000
      }
    };
  }

  /**
   * Run all tests with comprehensive reporting
   */
  async runAll(options = {}) {
    const startTime = Date.now();
    
    try {
      console.log('🚀 Starting comprehensive test suite...\n');

      // Run security tests
      if (this.config.security.enabled) {
        console.log('🔒 Running security tests...');
        const securityResults = await this.runSecurityTests(options.security);
        this.testResults.security = securityResults;
      }

      // Run coverage analysis
      if (this.config.coverage.enabled) {
        console.log('📊 Running coverage analysis...');
        const coverageResults = await this.runCoverageAnalysis(options.coverage);
        this.testResults.coverage = coverageResults;
      }

      // Run performance tests
      if (this.config.performance.enabled) {
        console.log('⚡ Running performance tests...');
        const performanceResults = await this.runPerformanceTests(options.performance);
        this.testResults.performance = performanceResults;
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      this.generateReport(duration);
      
      return {
        success: true,
        duration,
        results: this.testResults
      };

    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
      return {
        success: false,
        error: error.message,
        results: this.testResults
      };
    }
  }

  /**
   * Run security tests specifically
   */
  async runSecurityTests(options = {}) {
    const results = {
      passed: 0,
      failed: 0,
      vulnerabilities: [],
      timestamp: new Date().toISOString()
    };

    try {
      // Run XSS tests
      const xssResults = await SecurityTests.testXSSPrevention(options.xss);
      if (xssResults.vulnerable) {
        results.failed++;
        results.vulnerabilities.push({ type: 'XSS', details: xssResults });
      } else {
        results.passed++;
      }

      // Run SQL injection tests
      const sqlResults = await SecurityTests.testSQLInjection(options.sql);
      if (sqlResults.vulnerable) {
        results.failed++;
        results.vulnerabilities.push({ type: 'SQL Injection', details: sqlResults });
      } else {
        results.passed++;
      }

      // Run CSRF tests
      const csrfResults = await SecurityTests.testCSRFProtection(options.csrf);
      if (csrfResults.vulnerable) {
        results.failed++;
        results.vulnerabilities.push({ type: 'CSRF', details: csrfResults });
      } else {
        results.passed++;
      }

      // Run authentication tests
      const authResults = await SecurityTests.testAuthentication(options.auth);
      if (authResults.vulnerable) {
        results.failed++;
        results.vulnerabilities.push({ type: 'Authentication', details: authResults });
      } else {
        results.passed++;
      }

      return results;

    } catch (error) {
      console.error('Security tests failed:', error);
      results.failed++;
      results.vulnerabilities.push({ type: 'Error', details: error.message });
      return results;
    }
  }

  /**
   * Run coverage analysis
   */
  async runCoverageAnalysis(options = {}) {
    try {
      const coverage = await CoverageAnalyzer.analyzeCoverage(options);
      
      return {
        overall: coverage.overall,
        byCategory: coverage.byCategory,
        recommendations: coverage.recommendations,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Coverage analysis failed:', error);
      return {
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Run performance tests
   */
  async runPerformanceTests(options = {}) {
    try {
      const performance = await PerformanceTester.runLoadTests(options);
      
      return {
        responseTime: performance.responseTime,
        throughput: performance.throughput,
        memoryUsage: performance.memoryUsage,
        recommendations: performance.recommendations,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Performance tests failed:', error);
      return {
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Generate comprehensive test report
   */
  generateReport(duration) {
    console.log('\n📋 Test Report');
    console.log('=============');
    console.log(`Duration: ${duration}ms`);
    
    // Security report
    if (this.testResults.security.length > 0) {
      console.log('\n🔒 Security Tests:');
      console.log(`  Passed: ${this.testResults.security.passed}`);
      console.log(`  Failed: ${this.testResults.security.failed}`);
      
      if (this.testResults.security.vulnerabilities.length > 0) {
        console.log('  Vulnerabilities found:');
        this.testResults.security.vulnerabilities.forEach(vuln => {
          console.log(`    - ${vuln.type}: ${vuln.details.message || 'Vulnerability detected'}`);
        });
      }
    }

    // Coverage report
    if (this.testResults.coverage.overall) {
      console.log('\n📊 Coverage Analysis:');
      console.log(`  Overall: ${this.testResults.coverage.overall}%`);
      
      if (this.testResults.coverage.byCategory) {
        Object.entries(this.testResults.coverage.byCategory).forEach(([category, percentage]) => {
          console.log(`  ${category}: ${percentage}%`);
        });
      }
    }

    // Performance report
    if (this.testResults.performance.responseTime) {
      console.log('\n⚡ Performance Tests:');
      console.log(`  Avg Response Time: ${this.testResults.performance.responseTime.avg}ms`);
      console.log(`  Max Response Time: ${this.testResults.performance.responseTime.max}ms`);
      console.log(`  Throughput: ${this.testResults.performance.throughput} req/s`);
    }

    console.log('\n✅ Test suite completed!');
  }

  /**
   * Configure test framework
   */
  configure(config) {
    this.config = { ...this.config, ...config };
    return this;
  }

  /**
   * Add custom test
   */
  addCustomTest(name, testFunction) {
    this.customTests = this.customTests || {};
    this.customTests[name] = testFunction;
    return this;
  }

  /**
   * Run custom tests
   */
  async runCustomTests() {
    if (!this.customTests) return [];

    const results = [];
    for (const [name, testFunction] of Object.entries(this.customTests)) {
      try {
        const result = await testFunction();
        results.push({ name, result, success: true });
      } catch (error) {
        results.push({ name, error: error.message, success: false });
      }
    }
    return results;
  }
}

export default new TestFramework();
