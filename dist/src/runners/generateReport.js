import ReportGenerator from '../reporting/reportGenerator.js';
import { SecurityTests } from '../security/index.js';

async function main() {
  const reportType = process.argv[2] || 'security';
  const format = process.argv[3] || 'html';
  const outputPath = process.argv[4] || './reports';

  try {
    console.log(`📊 Generating ${reportType} report in ${format} format...\n`);

    let reportContent;
    let filepath;

    switch (reportType) {
      case 'security':
        reportContent = await SecurityTests.generateReport({
          format: format,
          outputPath: outputPath,
          includeDetails: true,
          includeRecommendations: true
        });
        break;

      case 'coverage':
        reportContent = await ReportGenerator.generateCoverageReport({
          format: format,
          outputPath: outputPath,
          includeDetails: true,
          threshold: 80
        });
        break;

      case 'performance':
        reportContent = await ReportGenerator.generatePerformanceReport({
          format: format,
          outputPath: outputPath,
          includeDetails: true
        });
        break;

      case 'comprehensive':
        reportContent = await ReportGenerator.generateComprehensiveReport({
          format: format,
          outputPath: outputPath,
          includeSecurity: true,
          includeCoverage: true,
          includePerformance: true
        });
        break;

      default:
        console.error(`❌ Unknown report type: ${reportType}`);
        console.log('Available report types: security, coverage, performance, comprehensive');
        process.exit(1);
    }

    if (format === 'html') {
      console.log('✅ HTML report generated successfully!');
      console.log('📄 Open the generated HTML file in your browser to view the neumorphic-styled report.');
    } else if (format === 'json') {
      console.log('✅ JSON report generated successfully!');
    } else {
      console.log('✅ Text report generated successfully!');
    }

    console.log(`📁 Report saved to: ${outputPath}`);
    console.log('\n🎉 Report generation completed!');

  } catch (error) {
    console.error('❌ Error generating report:', error.message);
    process.exit(1);
  }
}

main();
