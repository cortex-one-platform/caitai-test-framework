export const testConfig = {
  security: {
    enabled: true,
    strict: false,
    report: true,
    timeout: 30000
  },
  coverage: {
    enabled: true,
    threshold: 80,
    reporters: ['text', 'json', 'html']
  },
  performance: {
    enabled: true,
    timeout: 30000,
    concurrentUsers: 100
  },
  database: {
    type: 'sqlite',
    name: ':memory:'
  },
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 5000
  }
};

export default testConfig;
