// Export all public APIs
export { default as TestFramework } from './core/testRunner.js';
export { default as TestUtils } from './core/mockGenerator.js';
export { default as TestProviders } from './frontend/reactUtils.js';
export { default as SecurityTests } from './security/index.js';
export { default as CoverageAnalyzer } from './coverage/codeCoverage.js';
export { default as PerformanceTester } from './performance/loadTesting.js';
export { default as IntegrationUtils } from './integration/e2eUtils.js';
export { default as ReportGenerator } from './reporting/reportGenerator.js';
export { default as ProjectAnalyzer } from './core/projectAnalyzer.js';
export { default as AutoConfig } from './core/autoConfig.js';

// Export individual utilities
export * from './core/testRunner.js';
export * from './core/mockGenerator.js';
export * from './core/assertionHelpers.js';
export * from './frontend/reactUtils.js';
export * from './frontend/domUtils.js';
export * from './backend/nestUtils.js';
export * from './backend/controllerUtils.js';
export * from './utils/testProviders.jsx';
export * from './utils/testRender.jsx';
export * from './utils/mockContexts.js';
export * from './security/index.js';
export * from './coverage/codeCoverage.js';
export * from './performance/loadTesting.js';
export * from './integration/e2eUtils.js';

// Export configuration
export * from './config/testConfig.js';

// Export setup utilities
export { default as setup } from './core/setup.js';
