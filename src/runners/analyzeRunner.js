import ProjectAnalyzer from '../core/projectAnalyzer.js';

async function main() {
  try {
    console.log('🔍 Analyzing project structure...\n');
    
    const analysis = await ProjectAnalyzer.analyzeProject();
    
    console.log('📊 Project Analysis Results:\n');
    console.log(`Project Type: ${analysis.type || 'Unknown'}`);
    console.log(`Frameworks: ${analysis.frameworks.join(', ')}`);
    console.log(`Has React: ${analysis.hasReact ? 'Yes' : 'No'}`);
    console.log(`Has NestJS: ${analysis.hasNestJS ? 'Yes' : 'No'}`);
    console.log(`Has Express: ${analysis.hasExpress ? 'Yes' : 'No'}`);
    console.log(`Has TypeScript: ${analysis.hasTypeScript ? 'Yes' : 'No'}`);
    console.log(`Has Vitest: ${analysis.hasVitest ? 'Yes' : 'No'}`);
    console.log(`Has Testing Library: ${analysis.hasTestingLibrary ? 'Yes' : 'No'}`);
    
    if (analysis.uiLibraries && analysis.uiLibraries.length > 0) {
      console.log(`UI Libraries: ${analysis.uiLibraries.join(', ')}`);
    }
    
    if (analysis.stateManagement && analysis.stateManagement.length > 0) {
      console.log(`State Management: ${analysis.stateManagement.join(', ')}`);
    }
    
    if (analysis.databases && analysis.databases.length > 0) {
      console.log(`Databases: ${analysis.databases.join(', ')}`);
    }
    
    if (analysis.ciCd && analysis.ciCd.length > 0) {
      console.log(`CI/CD: ${analysis.ciCd.join(', ')}`);
    }
    
    if (analysis.cloudProviders && analysis.cloudProviders.length > 0) {
      console.log(`Cloud Providers: ${analysis.cloudProviders.join(', ')}`);
    }
    
    console.log('\n💡 Recommendations:');
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      analysis.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
      });
    } else {
      console.log('  No specific recommendations at this time.');
    }
    
    console.log('\n✅ Analysis completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

main();
