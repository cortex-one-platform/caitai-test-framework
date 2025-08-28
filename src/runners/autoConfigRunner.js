import AutoConfig from '../core/autoConfig.js';

async function main() {
  try {
    console.log('⚙️  Auto-configuring framework for current project...\n');
    
    const result = await AutoConfig.autoConfigure();
    
    console.log('✅ Auto-configuration completed!');
    console.log(`📁 Configuration saved to: security-test.config.js`);
    console.log(`🔧 Project type detected: ${result.projectType}`);
    console.log(`🛡️  Security tests configured: ${Object.keys(result.config.security.enabled).length}`);
    console.log(`📊 Coverage threshold set to: ${result.config.coverage.threshold}%`);
    
    console.log('\n🚀 Next steps:');
    console.log('  1. Review the generated security-test.config.js file');
    console.log('  2. Run: npx security-test run');
    console.log('  3. Generate reports: npx security-test report:security');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Auto-configuration failed:', error.message);
    process.exit(1);
  }
}

main();
