import fs from 'fs';
import path from 'path';

class ProjectAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.analysis = {
      type: 'unknown',
      frameworks: [],
      hasReact: false,
      hasNestJS: false,
      hasExpress: false,
      hasVue: false,
      hasAngular: false,
      hasTypeScript: false,
      hasTestingLibrary: false,
      hasVitest: false,
      hasJest: false,
      hasCypress: false,
      hasPlaywright: false,
      hasStorybook: false,
      hasTailwind: false,
      hasBootstrap: false,
      hasMaterialUI: false,
      hasAntDesign: false,
      hasChakraUI: false,
      hasStyledComponents: false,
      hasEmotion: false,
      hasRedux: false,
      hasZustand: false,
      hasContext: false,
      hasGraphQL: false,
      hasREST: true, // Assume REST by default
      hasDatabase: false,
      hasPrisma: false,
      hasTypeORM: false,
      hasMongoose: false,
      hasSequelize: false,
      hasDocker: false,
      hasKubernetes: false,
      hasCI: false,
      hasGitHubActions: false,
      hasGitLabCI: false,
      hasJenkins: false,
      hasVercel: false,
      hasNetlify: false,
      hasAWS: false,
      hasGCP: false,
      hasAzure: false,
      securityFeatures: [],
      vulnerabilities: [],
      recommendations: []
    };
  }

  /**
   * Analyze the project structure and detect frameworks
   */
  async analyzeProject() {
    try {
      console.log('🔍 Analyzing project structure...');
      
      // Read package.json
      await this.analyzePackageJson();
      
      // Analyze project structure
      await this.analyzeProjectStructure();
      
      // Detect testing setup
      await this.analyzeTestingSetup();
      
      // Detect security features
      await this.analyzeSecurityFeatures();
      
      // Generate recommendations
      this.generateRecommendations();
      
      console.log('✅ Project analysis complete!');
      console.log(`📋 Detected project type: ${this.analysis.type}`);
      console.log(`🔧 Frameworks: ${this.analysis.frameworks.join(', ')}`);
      
      return this.analysis;
    } catch (error) {
      console.error('❌ Error analyzing project:', error.message);
      return this.analysis;
    }
  }

  /**
   * Analyze package.json for dependencies and project type
   */
  async analyzePackageJson() {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found');
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Detect React
    if (dependencies.react || dependencies['react-dom']) {
      this.analysis.hasReact = true;
      this.analysis.frameworks.push('React');
    }

    // Detect NestJS
    if (dependencies['@nestjs/core'] || dependencies['@nestjs/common']) {
      this.analysis.hasNestJS = true;
      this.analysis.frameworks.push('NestJS');
    }

    // Detect Express
    if (dependencies.express) {
      this.analysis.hasExpress = true;
      this.analysis.frameworks.push('Express');
    }

    // Detect Vue
    if (dependencies.vue) {
      this.analysis.hasVue = true;
      this.analysis.frameworks.push('Vue');
    }

    // Detect Angular
    if (dependencies['@angular/core']) {
      this.analysis.hasAngular = true;
      this.analysis.frameworks.push('Angular');
    }

    // Detect TypeScript
    if (dependencies.typescript || dependencies['@types/node']) {
      this.analysis.hasTypeScript = true;
    }

    // Detect testing frameworks
    if (dependencies.vitest) {
      this.analysis.hasVitest = true;
    }
    if (dependencies.jest) {
      this.analysis.hasJest = true;
    }
    if (dependencies['@testing-library/react'] || dependencies['@testing-library/dom']) {
      this.analysis.hasTestingLibrary = true;
    }
    if (dependencies.cypress) {
      this.analysis.hasCypress = true;
    }
    if (dependencies['@playwright/test']) {
      this.analysis.hasPlaywright = true;
    }

    // Detect UI frameworks
    if (dependencies.tailwindcss) {
      this.analysis.hasTailwind = true;
    }
    if (dependencies.bootstrap) {
      this.analysis.hasBootstrap = true;
    }
    if (dependencies['@mui/material'] || dependencies['@material-ui/core']) {
      this.analysis.hasMaterialUI = true;
    }
    if (dependencies.antd) {
      this.analysis.hasAntDesign = true;
    }
    if (dependencies['@chakra-ui/react']) {
      this.analysis.hasChakraUI = true;
    }
    if (dependencies['styled-components']) {
      this.analysis.hasStyledComponents = true;
    }
    if (dependencies['@emotion/react'] || dependencies['@emotion/styled']) {
      this.analysis.hasEmotion = true;
    }

    // Detect state management
    if (dependencies['@reduxjs/toolkit'] || dependencies.redux) {
      this.analysis.hasRedux = true;
    }
    if (dependencies.zustand) {
      this.analysis.hasZustand = true;
    }

    // Detect GraphQL
    if (dependencies.graphql || dependencies['@apollo/client'] || dependencies['apollo-server']) {
      this.analysis.hasGraphQL = true;
      this.analysis.hasREST = false;
    }

    // Detect databases
    if (dependencies.prisma) {
      this.analysis.hasPrisma = true;
      this.analysis.hasDatabase = true;
    }
    if (dependencies.typeorm) {
      this.analysis.hasTypeORM = true;
      this.analysis.hasDatabase = true;
    }
    if (dependencies.mongoose) {
      this.analysis.hasMongoose = true;
      this.analysis.hasDatabase = true;
    }
    if (dependencies.sequelize) {
      this.analysis.hasSequelize = true;
      this.analysis.hasDatabase = true;
    }

    // Detect deployment platforms
    if (dependencies.vercel) {
      this.analysis.hasVercel = true;
    }
    if (dependencies.netlify) {
      this.analysis.hasNetlify = true;
    }

    // Determine project type
    this.determineProjectType();
  }

  /**
   * Analyze project structure for additional insights
   */
  async analyzeProjectStructure() {
    const files = fs.readdirSync(this.projectRoot);
    
    // Check for common directories
    const hasSrc = files.includes('src');
    const hasComponents = hasSrc && fs.existsSync(path.join(this.projectRoot, 'src', 'components'));
    const hasPages = hasSrc && fs.existsSync(path.join(this.projectRoot, 'src', 'pages'));
    const hasControllers = hasSrc && fs.existsSync(path.join(this.projectRoot, 'src', 'controllers'));
    const hasServices = hasSrc && fs.existsSync(path.join(this.projectRoot, 'src', 'services'));
    const hasModels = hasSrc && fs.existsSync(path.join(this.projectRoot, 'src', 'models'));
    const hasPublic = files.includes('public');
    const hasBuild = files.includes('build') || files.includes('dist');
    const hasDocker = files.includes('Dockerfile') || files.includes('docker-compose.yml');
    const hasK8s = files.includes('k8s') || files.some(f => f.includes('kubernetes'));

    if (hasDocker) this.analysis.hasDocker = true;
    if (hasK8s) this.analysis.hasKubernetes = true;

    // Check for CI/CD
    const hasGitHubActions = fs.existsSync(path.join(this.projectRoot, '.github', 'workflows'));
    const hasGitLabCI = files.includes('.gitlab-ci.yml');
    const hasJenkins = files.includes('Jenkinsfile');

    if (hasGitHubActions) this.analysis.hasGitHubActions = true;
    if (hasGitLabCI) this.analysis.hasGitLabCI = true;
    if (hasJenkins) this.analysis.hasJenkins = true;

    // Check for cloud providers
    const hasAWS = files.some(f => f.includes('aws') || f.includes('serverless'));
    const hasGCP = files.some(f => f.includes('gcp') || f.includes('google'));
    const hasAzure = files.some(f => f.includes('azure'));

    if (hasAWS) this.analysis.hasAWS = true;
    if (hasGCP) this.analysis.hasGCP = true;
    if (hasAzure) this.analysis.hasAzure = true;

    // Check for context usage in React
    if (this.analysis.hasReact && hasSrc) {
      const srcFiles = this.getAllFiles(path.join(this.projectRoot, 'src'));
      const hasContextFiles = srcFiles.some(file => 
        file.includes('Context') || file.includes('Provider') || 
        fs.readFileSync(file, 'utf8').includes('createContext')
      );
      if (hasContextFiles) this.analysis.hasContext = true;
    }
  }

  /**
   * Analyze testing setup
   */
  async analyzeTestingSetup() {
    const files = fs.readdirSync(this.projectRoot);
    
    // Check for test directories
    const hasTests = files.includes('tests') || files.includes('__tests__');
    const hasSpecs = files.some(f => f.includes('.spec.') || f.includes('.test.'));
    const hasStorybook = files.includes('.storybook') || fs.existsSync(path.join(this.projectRoot, 'src', 'stories'));

    if (hasStorybook) this.analysis.hasStorybook = true;

    // Check for test configuration files
    const hasVitestConfig = files.some(f => f.includes('vitest.config'));
    const hasJestConfig = files.some(f => f.includes('jest.config'));
    const hasCypressConfig = files.includes('cypress.config');
    const hasPlaywrightConfig = files.includes('playwright.config');

    if (hasVitestConfig) this.analysis.hasVitest = true;
    if (hasJestConfig) this.analysis.hasJest = true;
    if (hasCypressConfig) this.analysis.hasCypress = true;
    if (hasPlaywrightConfig) this.analysis.hasPlaywright = true;
  }

  /**
   * Analyze security features
   */
  async analyzeSecurityFeatures() {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Security-related packages
    const securityPackages = [
      'helmet', 'cors', 'express-rate-limit', 'express-slow-down',
      'bcrypt', 'bcryptjs', 'argon2', 'scrypt',
      'jsonwebtoken', 'passport', 'passport-jwt', 'passport-local',
      'express-validator', 'joi', 'yup', 'zod',
      'sanitize-html', 'xss', 'sql-injection',
      'helmet', 'hpp', 'express-mongo-sanitize',
      'rate-limiter-flexible', 'express-brute',
      'csurf', 'csrf', 'express-csrf',
      'express-session', 'connect-redis', 'connect-mongo',
      'crypto', 'node-forge', 'tweetnacl',
      'dotenv', 'dotenv-safe', 'dotenv-expand'
    ];

    securityPackages.forEach(pkg => {
      if (dependencies[pkg]) {
        this.analysis.securityFeatures.push(pkg);
      }
    });

    // Check for environment files
    const files = fs.readdirSync(this.projectRoot);
    const hasEnvFiles = files.some(f => f.includes('.env'));
    if (hasEnvFiles) {
      this.analysis.securityFeatures.push('environment-variables');
    }

    // Check for security headers
    if (this.analysis.hasExpress || this.analysis.hasNestJS) {
      this.analysis.securityFeatures.push('http-headers');
    }
  }

  /**
   * Determine the overall project type
   */
  determineProjectType() {
    if (this.analysis.hasReact && this.analysis.hasNestJS) {
      this.analysis.type = 'fullstack-react-nestjs';
    } else if (this.analysis.hasReact && this.analysis.hasExpress) {
      this.analysis.type = 'fullstack-react-express';
    } else if (this.analysis.hasReact) {
      this.analysis.type = 'react-frontend';
    } else if (this.analysis.hasNestJS) {
      this.analysis.type = 'nestjs-backend';
    } else if (this.analysis.hasExpress) {
      this.analysis.type = 'express-backend';
    } else if (this.analysis.hasVue) {
      this.analysis.type = 'vue-frontend';
    } else if (this.analysis.hasAngular) {
      this.analysis.type = 'angular-frontend';
    } else {
      this.analysis.type = 'node-backend';
    }
  }

  /**
   * Generate security recommendations based on project type
   */
  generateRecommendations() {
    const recommendations = [];

    // React-specific recommendations
    if (this.analysis.hasReact) {
      recommendations.push(
        'Implement Content Security Policy (CSP) headers',
        'Use React.memo and useMemo for performance optimization',
        'Implement proper error boundaries',
        'Use React.StrictMode for development',
        'Validate props with PropTypes or TypeScript'
      );

      if (!this.analysis.hasTestingLibrary) {
        recommendations.push('Add @testing-library/react for component testing');
      }
    }

    // NestJS-specific recommendations
    if (this.analysis.hasNestJS) {
      recommendations.push(
        'Use NestJS built-in validation pipes',
        'Implement proper exception filters',
        'Use Guards for authentication',
        'Use Interceptors for request/response transformation',
        'Implement proper logging with Winston'
      );
    }

    // Express-specific recommendations
    if (this.analysis.hasExpress) {
      recommendations.push(
        'Use helmet for security headers',
        'Implement rate limiting',
        'Use express-validator for input validation',
        'Implement proper error handling middleware',
        'Use cors for cross-origin requests'
      );
    }

    // Database recommendations
    if (this.analysis.hasDatabase) {
      recommendations.push(
        'Use parameterized queries to prevent SQL injection',
        'Implement proper database connection pooling',
        'Use database migrations for schema changes',
        'Implement proper backup strategies'
      );
    }

    // General security recommendations
    recommendations.push(
      'Use HTTPS in production',
      'Implement proper authentication and authorization',
      'Use environment variables for sensitive data',
      'Regularly update dependencies',
      'Implement proper logging and monitoring',
      'Use security headers (HSTS, CSP, etc.)',
      'Implement rate limiting and request throttling',
      'Use secure session management',
      'Implement proper CORS policies',
      'Use input validation and sanitization'
    );

    this.analysis.recommendations = recommendations;
  }

  /**
   * Get all files in a directory recursively
   */
  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  }

  /**
   * Get recommended test configuration based on project type
   */
  getRecommendedTestConfig() {
    const config = {
      security: {
        enabled: {},
        thresholds: {
          maxVulnerabilities: 0,
          minSecurityScore: 90
        }
      },
      coverage: {
        threshold: 80,
        includeSecurityCoverage: true
      },
      performance: {
        enabled: true
      },
      reporting: {
        enabled: true,
        formats: ['html', 'json']
      }
    };

    // Enable all security tests by default
    const securityTests = [
      'xss', 'sqlInjection', 'csrf', 'authentication', 'authorization',
      'inputValidation', 'fileUpload', 'sessionSecurity', 'encryption',
      'dependencyVulnerabilities', 'environmentSecurity', 'loggingSecurity',
      'securityHeaders', 'rateLimiting', 'tokenManagement', 'errorHandling'
    ];

    securityTests.forEach(test => {
      config.security.enabled[test] = true;
    });

    // React-specific configuration
    if (this.analysis.hasReact) {
      config.react = {
        providers: ['auth', 'theme', 'store'],
        mockContexts: true,
        testUserInteractions: true,
        validateProps: true
      };
    }

    // Backend-specific configuration
    if (this.analysis.hasNestJS || this.analysis.hasExpress) {
      config.api = {
        testEndpoints: true,
        validateResponses: true,
        testAuthentication: true,
        testAuthorization: true
      };
    }

    // Database-specific configuration
    if (this.analysis.hasDatabase) {
      config.database = {
        testConnections: true,
        validateQueries: true,
        testTransactions: true
      };
    }

    return config;
  }
}

export default new ProjectAnalyzer();
