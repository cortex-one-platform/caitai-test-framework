import { SecurityTests } from '../security/index.js';

async function main() {
  try {
    console.log('🔒 Running security tests...\n');
    
    const results = await SecurityTests.runAll();
    
    console.log('Security Test Results:');
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    
    if (results.vulnerabilities.length > 0) {
      console.log('\n🚨 Vulnerabilities Found:');
      results.vulnerabilities.forEach(vuln => {
        console.log(`  - ${vuln.type}: ${vuln.details?.message || vuln.error}`);
      });
    } else {
      console.log('\n✅ No vulnerabilities detected!');
    }
    
    process.exit(results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Security tests failed:', error.message);
    process.exit(1);
  }
}

main();
