// security-test.config.js
// Simple configuration file for Security Test Framework

export default {
  // Security test configuration
  security: {
    // Enable/disable specific security tests
    enabled: {
      xss: true,
      sqlInjection: true,
      csrf: true,
      authentication: true,
      authorization: true,
      inputValidation: true,
      fileUpload: true,
      sessionSecurity: true,
      encryption: true,
      dependencyVulnerabilities: true,
      environmentSecurity: true,
      loggingSecurity: true,
      securityHeaders: true,
      rateLimiting: true,
      tokenManagement: true,
      errorHandling: true
    },
    
    // Security thresholds
    thresholds: {
      maxVulnerabilities: 0,
      minSecurityScore: 90,
      requireCSRFTokens: true,
      requireHTTPS: true,
      requireInputSanitization: true
    },
    
    // Custom security rules
    customRules: {
      allowedFileTypes: ['.jpg', '.png', '.pdf', '.doc'],
      maxFileSize: 5 * 1024 * 1024, // 5MB
      requiredHeaders: ['X-Frame-Options', 'X-Content-Type-Options'],
      forbiddenPatterns: [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi
      ]
    }
  },
  
  // Coverage configuration
  coverage: {
    enabled: true,
    threshold: 80,
    includeSecurityCoverage: true,
    includePerformanceCoverage: true,
    excludePatterns: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '**/*.test.js',
      '**/*.spec.js'
    ]
  },
  
  // Performance configuration
  performance: {
    enabled: true,
    loadTestDuration: 60, // seconds
    concurrentUsers: 10,
    acceptableResponseTime: 2000, // ms
    memoryThreshold: 100 * 1024 * 1024 // 100MB
  },
  
  // Reporting configuration
  reporting: {
    enabled: true,
    formats: ['html', 'json', 'text'],
    outputPath: './reports',
    includeDetails: true,
    includeRecommendations: true,
    autoGenerate: true
  },
  
  // React testing configuration
  react: {
    providers: ['auth', 'theme', 'store'],
    mockContexts: true,
    testUserInteractions: true,
    validateProps: true
  },
  
  // API testing configuration
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 5000,
    retries: 3,
    validateResponses: true,
    testEndpoints: true
  },
  
  // Database testing configuration
  database: {
    testConnections: true,
    validateQueries: true,
    testTransactions: true,
    mockData: true
  }
};
