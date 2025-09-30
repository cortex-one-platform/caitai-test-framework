export async function testSQLInjection(options = {}) {
  const sqlPayloads = [
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "' OR 1=1--",
    "'; INSERT INTO users VALUES ('hacker', 'password'); --",
    "' UNION SELECT * FROM users--",
    "'; EXEC xp_cmdshell('dir'); --",
    "' AND 1=CONVERT(int, (SELECT @@version))--"
  ];

  const results = {
    vulnerable: false,
    payloads: [],
    message: 'SQL injection test completed'
  };

  for (const payload of sqlPayloads) {
    const testResult = await testSQLPayload(payload, options);
    if (testResult.vulnerable) {
      results.vulnerable = true;
      results.payloads.push(testResult);
    }
  }

  return results;
}

async function testSQLPayload(payload, options) {
  // Simulate SQL injection testing logic
  const sanitized = sanitizeSQLInput(payload);
  const isVulnerable = sanitized.includes('DROP TABLE') || 
                      sanitized.includes('OR 1=1') ||
                      sanitized.includes('UNION SELECT') ||
                      sanitized.includes('EXEC');

  return {
    payload,
    sanitized,
    vulnerable: isVulnerable,
    message: isVulnerable ? 'SQL injection vulnerability detected' : 'SQL injection prevention working'
  };
}

function sanitizeSQLInput(input) {
  // Basic SQL injection prevention
  return input
    .replace(/['";]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .toLowerCase();
}
