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
  'frontend:component': 'Run frontend component tests',
  'frontend:integration': 'Run frontend integration tests',
  'frontend:security': 'Run frontend security tests',
  'backend:controller': 'Run backend controller tests',
  'backend:service': 'Run backend service tests',
  'backend:database': 'Run backend database tests',
  'backend:auth': 'Run backend authentication tests',
  'backend:security': 'Run backend security tests',
  'fullstack:e2e': 'Run full-stack end-to-end tests',
  'fullstack:integration': 'Run full-stack integration tests',
  'fullstack:security': 'Run full-stack security tests',
  'security:xss': 'Run XSS vulnerability tests',
  'security:sql-injection': 'Run SQL injection tests',
  'security:csrf': 'Run CSRF protection tests',
  'performance:load': 'Run performance load tests',
  'report:security': 'Generate security report',
  'report:coverage': 'Generate coverage report',
  'report:performance': 'Generate performance report',
  'report:comprehensive': 'Generate comprehensive report',
  'auto': 'Auto-configure framework for current project',
  'analyze': 'Analyze project structure and generate recommendations',
  'auto': 'Auto-detect and run appropriate tests',
  'help': 'Show this help message'
};

function showHelp() {
  console.log('Security Test Framework CLI\n');
  console.log('Usage: security-test <command> [options]\n');
  console.log('Commands:');
  Object.entries(commands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(20)} ${desc}`);
  });
  console.log('\nExamples:');
  console.log('  security-test run                    # Run all tests');
  console.log('  security-test security               # Run security tests only');
  console.log('  security-test coverage               # Run with coverage');
  console.log('  security-test frontend:component     # Run frontend component tests');
  console.log('  security-test backend:controller     # Run backend controller tests');
  console.log('  security-test fullstack:e2e          # Run full-stack tests');
  console.log('  security-test auto                   # Auto-detect and run tests');
}

function runCommand(command) {
  try {
    // Handle report commands specially
    if (command.startsWith('report:')) {
      const reportType = command.split(':')[1];
      const reportRunnerPath = join(__dirname, '../src/runners/generateReport.js');
      execSync(`node ${reportRunnerPath} ${reportType}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } else if (command === 'security') {
      // Run security tests directly
      const securityRunnerPath = join(__dirname, '../src/runners/runSecurityTests.js');
      execSync(`node ${securityRunnerPath}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } else if (command === 'coverage') {
      // Run coverage tests directly
      const coverageRunnerPath = join(__dirname, '../src/runners/runCoverageTests.js');
      execSync(`node ${coverageRunnerPath}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } else if (command === 'auto') {
      // Auto-configure the framework
      const autoConfigPath = join(__dirname, '../src/runners/autoConfigRunner.js');
      execSync(`node ${autoConfigPath}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } else if (command === 'analyze') {
      // Analyze project structure
      const analyzePath = join(__dirname, '../src/runners/analyzeRunner.js');
      execSync(`node ${analyzePath}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } else {
      // For other commands, use vitest
      execSync(`npx vitest run src/examples/${command}.test.js`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    }
  } catch (error) {
    console.error('Error running command:', error.message);
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
