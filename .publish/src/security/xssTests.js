export async function testXSSPrevention(options = {}) {
  const xssPayloads = [
    '<script>alert("xss")</script>',
    'javascript:alert("xss")',
    '<img src="x" onerror="alert(\'xss\')">',
    '<iframe src="javascript:alert(\'xss\')"></iframe>',
    '<svg onload="alert(\'xss\')"></svg>',
    '"><script>alert("xss")</script>',
    '\'><script>alert("xss")</script>',
    '"><img src=x onerror=alert("xss")>',
    '\'><img src=x onerror=alert("xss")>'
  ];

  const results = {
    vulnerable: false,
    payloads: [],
    message: 'XSS prevention test completed'
  };

  for (const payload of xssPayloads) {
    const testResult = await testXSSPayload(payload, options);
    if (testResult.vulnerable) {
      results.vulnerable = true;
      results.payloads.push(testResult);
    }
  }

  return results;
}

async function testXSSPayload(payload, options) {
  // Simulate XSS testing logic
  const sanitized = sanitizeInput(payload);
  const isVulnerable = sanitized.includes('<script>') || 
                      sanitized.includes('javascript:') ||
                      sanitized.includes('onerror=') ||
                      sanitized.includes('onload=');

  return {
    payload,
    sanitized,
    vulnerable: isVulnerable,
    message: isVulnerable ? 'XSS vulnerability detected' : 'XSS prevention working'
  };
}

function sanitizeInput(input) {
  // Basic HTML entity encoding
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
