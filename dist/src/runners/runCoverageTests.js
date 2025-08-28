import { CoverageAnalyzer } from '../coverage/codeCoverage.js';

async function main() {
  try {
    console.log('📊 Running coverage analysis...\n');
    
    const coverage = await CoverageAnalyzer.analyzeCoverage();
    
    console.log('Coverage Analysis Results:');
    console.log(`📈 Overall Coverage: ${coverage.overall}%`);
    
    if (coverage.byCategory) {
      console.log('\n📋 Coverage by Category:');
      Object.entries(coverage.byCategory).forEach(([category, percentage]) => {
        console.log(`  - ${category}: ${percentage}%`);
      });
    }
    
    if (coverage.recommendations && coverage.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      coverage.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
    }
    
    // Check if coverage meets threshold
    const threshold = 80;
    if (coverage.overall < threshold) {
      console.log(`\n⚠️  Coverage below threshold (${threshold}%)`);
      process.exit(1);
    } else {
      console.log(`\n✅ Coverage meets threshold (${threshold}%)`);
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Coverage analysis failed:', error.message);
    process.exit(1);
  }
}

main();
