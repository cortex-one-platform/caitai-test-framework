import ProjectAnalyzer from './projectAnalyzer.js';
import SecurityTests from '../security/index.js';

class AutoConfig {
  constructor() {
    this.analyzer = ProjectAnalyzer;
    this.config = null;
    this.analysis = null;
  }

  /**
   * Auto-configure the framework based on project analysis
   */
  async autoConfigure() {
    try {
      console.log('🤖 Auto-configuring Security Test Framework...');
      
      // Analyze the project
      this.analysis = await this.analyzer.analyzeProject();
      
      // Generate recommended configuration
      this.config = this.analyzer.getRecommendedTestConfig();
      
      // Customize configuration based on project type
      await this.customizeConfiguration();
      
      // Save configuration
      await this.saveConfiguration();
      
      console.log('✅ Auto-configuration complete!');
      console.log('📁 Configuration saved to: security-test.config.js');
      
      return {
        analysis: this.analysis,
        config: this.config,
        projectType: this.analysis.type || 'unknown'
      };
    } catch (error) {
      console.error('❌ Auto-configuration failed:', error.message);
      throw error;
    }
  }

  /**
   * Customize configuration based on project analysis
   */
  async customizeConfiguration() {
    const { analysis } = this;

    // React-specific customizations
    if (analysis.hasReact) {
      this.config.react = {
        ...this.config.react,
        providers: this.detectReactProviders(),
        uiFramework: this.detectUIFramework(),
        stateManagement: this.detectStateManagement()
      };
    }

    // Backend-specific customizations
    if (analysis.hasNestJS || analysis.hasExpress) {
      this.config.api = {
        ...this.config.api,
        database: analysis.hasDatabase ? this.detectDatabase() : null,
        authentication: this.detectAuthentication(),
        deployment: this.detectDeployment()
      };
    }

    // Testing-specific customizations
    this.config.testing = {
      framework: analysis.hasVitest ? 'vitest' : analysis.hasJest ? 'jest' : 'unknown',
      e2e: analysis.hasCypress ? 'cypress' : analysis.hasPlaywright ? 'playwright' : null,
      component: analysis.hasStorybook ? 'storybook' : null
    };

    // Security-specific customizations
    this.config.security.customRules = this.generateCustomSecurityRules();
  }

  /**
   * Detect React providers based on project structure
   */
  detectReactProviders() {
    const providers = [];
    const { analysis } = this;

    if (analysis.hasContext) providers.push('context');
    if (analysis.hasRedux) providers.push('redux');
    if (analysis.hasZustand) providers.push('zustand');
    if (analysis.hasMaterialUI || analysis.hasAntDesign || analysis.hasChakraUI) {
      providers.push('theme');
    }

    return providers;
  }

  /**
   * Detect UI framework
   */
  detectUIFramework() {
    const { analysis } = this;

    if (analysis.hasMaterialUI) return 'material-ui';
    if (analysis.hasAntDesign) return 'ant-design';
    if (analysis.hasChakraUI) return 'chakra-ui';
    if (analysis.hasTailwind) return 'tailwind';
    if (analysis.hasBootstrap) return 'bootstrap';
    if (analysis.hasStyledComponents) return 'styled-components';
    if (analysis.hasEmotion) return 'emotion';

    return 'none';
  }

  /**
   * Detect state management
   */
  detectStateManagement() {
    const { analysis } = this;

    if (analysis.hasRedux) return 'redux';
    if (analysis.hasZustand) return 'zustand';
    if (analysis.hasContext) return 'context';

    return 'none';
  }

  /**
   * Detect database
   */
  detectDatabase() {
    const { analysis } = this;

    if (analysis.hasPrisma) return 'prisma';
    if (analysis.hasTypeORM) return 'typeorm';
    if (analysis.hasMongoose) return 'mongoose';
    if (analysis.hasSequelize) return 'sequelize';

    return 'unknown';
  }

  /**
   * Detect authentication method
   */
  detectAuthentication() {
    const { analysis } = this;
    const authMethods = [];

    if (analysis.securityFeatures.includes('jsonwebtoken')) authMethods.push('jwt');
    if (analysis.securityFeatures.includes('passport')) authMethods.push('passport');
    if (analysis.securityFeatures.includes('bcrypt') || analysis.securityFeatures.includes('bcryptjs')) {
      authMethods.push('bcrypt');
    }

    return authMethods.length > 0 ? authMethods : ['session'];
  }

  /**
   * Detect deployment platform
   */
  detectDeployment() {
    const { analysis } = this;

    if (analysis.hasVercel) return 'vercel';
    if (analysis.hasNetlify) return 'netlify';
    if (analysis.hasAWS) return 'aws';
    if (analysis.hasGCP) return 'gcp';
    if (analysis.hasAzure) return 'azure';
    if (analysis.hasDocker) return 'docker';
    if (analysis.hasKubernetes) return 'kubernetes';

    return 'unknown';
  }

  /**
   * Generate custom security rules based on project analysis
   */
  generateCustomSecurityRules() {
    const { analysis } = this;
    const rules = {
      allowedFileTypes: ['.jpg', '.png', '.pdf', '.doc'],
      maxFileSize: 5 * 1024 * 1024, // 5MB
      requiredHeaders: ['X-Frame-Options', 'X-Content-Type-Options'],
      forbiddenPatterns: [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi
      ]
    };

    // React-specific rules
    if (analysis.hasReact) {
      rules.forbiddenPatterns.push(
        /dangerouslySetInnerHTML/gi,
        /eval\s*\(/gi,
        /innerHTML\s*=/gi
      );
    }

    // Database-specific rules
    if (analysis.hasDatabase) {
      rules.forbiddenPatterns.push(
        /DROP\s+TABLE/gi,
        /DELETE\s+FROM/gi,
        /UPDATE\s+.*\s+SET/gi
      );
    }

    return rules;
  }

  /**
   * Save configuration to file
   */
  async saveConfiguration() {
    const fs = await import('fs');
    const configContent = `// Auto-generated Security Test Framework configuration
// Generated on: ${new Date().toISOString()}
// Project type: ${this.analysis.type}

export default ${JSON.stringify(this.config, null, 2)};
`;

    fs.writeFileSync('security-test.config.js', configContent);
  }

  /**
   * Run intelligent security audit based on project type
   */
  async runIntelligentAudit() {
    console.log('🔍 Running intelligent security audit...');
    
    const results = {
      projectAnalysis: this.analysis,
      security: {},
      coverage: {},
      performance: {},
      recommendations: []
    };

    // Run security tests based on project type
    if (this.analysis.hasReact) {
      results.security.frontend = await this.runFrontendSecurityTests();
    }

    if (this.analysis.hasNestJS || this.analysis.hasExpress) {
      results.security.backend = await this.runBackendSecurityTests();
    }

    if (this.analysis.hasDatabase) {
      results.security.database = await this.runDatabaseSecurityTests();
    }

    // Run coverage analysis
    results.coverage = await this.runCoverageAnalysis();

    // Run performance tests
    results.performance = await this.runPerformanceTests();

    // Generate project-specific recommendations
    results.recommendations = this.generateProjectSpecificRecommendations();

    return results;
  }

  /**
   * Run frontend-specific security tests
   */
  async runFrontendSecurityTests() {
    const tests = [
      SecurityTests.testXSSPrevention(),
      SecurityTests.testCSRFProtection(),
      SecurityTests.testInputValidation()
    ];

    if (this.analysis.hasAuthentication) {
      tests.push(SecurityTests.testAuthentication());
      tests.push(SecurityTests.testTokenManagement());
    }

    return await Promise.all(tests);
  }

  /**
   * Run backend-specific security tests
   */
  async runBackendSecurityTests() {
    const tests = [
      SecurityTests.testSQLInjection(),
      SecurityTests.testSecurityHeaders(),
      SecurityTests.testRateLimiting(),
      SecurityTests.testErrorHandling()
    ];

    if (this.analysis.hasAuthentication) {
      tests.push(SecurityTests.testAuthentication());
      tests.push(SecurityTests.testAuthorization());
    }

    return await Promise.all(tests);
  }

  /**
   * Run database-specific security tests
   */
  async runDatabaseSecurityTests() {
    return await Promise.all([
      SecurityTests.testSQLInjection(),
      SecurityTests.testInputValidation(),
      SecurityTests.testSessionSecurity()
    ]);
  }

  /**
   * Run coverage analysis
   */
  async runCoverageAnalysis() {
    const analyzer = new CoverageAnalyzer();
    
    return await analyzer.analyzeCoverage({
      threshold: this.config.coverage.threshold,
      includeSecurityCoverage: this.config.coverage.includeSecurityCoverage,
      excludePatterns: this.config.coverage.excludePatterns
    });
  }

  /**
   * Run performance tests
   */
  async runPerformanceTests() {
    const tester = new PerformanceTester();
    
    return await tester.runLoadTests({
      duration: this.config.performance.loadTestDuration,
      concurrentUsers: this.config.performance.concurrentUsers,
      acceptableResponseTime: this.config.performance.acceptableResponseTime
    });
  }

  /**
   * Generate project-specific recommendations
   */
  generateProjectSpecificRecommendations() {
    const recommendations = [];

    // Add analysis recommendations
    recommendations.push(...this.analysis.recommendations);

    // React-specific recommendations
    if (this.analysis.hasReact) {
      if (!this.analysis.hasTestingLibrary) {
        recommendations.push('Install @testing-library/react for better component testing');
      }
      if (!this.analysis.hasStorybook) {
        recommendations.push('Consider adding Storybook for component documentation');
      }
    }

    // Backend-specific recommendations
    if (this.analysis.hasNestJS || this.analysis.hasExpress) {
      if (!this.analysis.securityFeatures.includes('helmet')) {
        recommendations.push('Install helmet for security headers');
      }
      if (!this.analysis.securityFeatures.includes('express-rate-limit')) {
        recommendations.push('Install express-rate-limit for rate limiting');
      }
    }

    // Database-specific recommendations
    if (this.analysis.hasDatabase) {
      if (!this.analysis.securityFeatures.includes('express-validator')) {
        recommendations.push('Install express-validator for input validation');
      }
    }

    return recommendations;
  }

  /**
   * Generate comprehensive report with project context
   */
  async generateComprehensiveReport() {
    const auditResults = await this.runIntelligentAudit();
    
    const report = {
      projectInfo: {
        type: this.analysis.type,
        frameworks: this.analysis.frameworks,
        detectedFeatures: this.analysis.securityFeatures,
        timestamp: new Date().toISOString()
      },
      security: {
        frontend: auditResults.security.frontend || [],
        backend: auditResults.security.backend || [],
        database: auditResults.security.database || [],
        summary: this.generateSecuritySummary(auditResults.security)
      },
      coverage: auditResults.coverage,
      performance: auditResults.performance,
      recommendations: auditResults.recommendations,
      configuration: this.config
    };

    return report;
  }

  /**
   * Generate security summary
   */
  generateSecuritySummary(securityResults) {
    const allTests = [
      ...(securityResults.frontend || []),
      ...(securityResults.backend || []),
      ...(securityResults.database || [])
    ];

    const passed = allTests.filter(test => !test.vulnerable).length;
    const failed = allTests.filter(test => test.vulnerable).length;
    const total = allTests.length;

    return {
      total,
      passed,
      failed,
      score: total > 0 ? Math.round((passed / total) * 100) : 0,
      vulnerabilities: allTests.filter(test => test.vulnerable)
    };
  }
}

export default new AutoConfig();
