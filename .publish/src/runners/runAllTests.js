import TestFramework from '../core/testRunner.js';

async function main() {
  const command = process.argv[2] || 'run';
  
  try {
    switch (command) {
      case 'run':
        await TestFramework.runAll();
        break;
      case 'security':
        await TestFramework.runSecurityTests();
        break;
      case 'coverage':
        await TestFramework.runCoverageAnalysis();
        break;
      case 'performance':
        await TestFramework.runPerformanceTests();
        break;
      default:
        console.log(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error('Test execution failed:', error.message);
    process.exit(1);
  }
}

main();
