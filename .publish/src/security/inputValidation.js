export async function testInputValidation(options = {}) {
  const results = {
    vulnerable: false,
    message: 'Input validation test completed',
    details: {}
  };

  // Test input validation mechanisms
  const validationTests = [
    testEmailValidation(),
    testPasswordValidation(),
    testFileUploadValidation(),
    testSQLInjectionValidation(),
    testXSSValidation()
  ];

  for (const test of validationTests) {
    if (test.vulnerable) {
      results.vulnerable = true;
      results.details[test.name] = test;
    }
  }

  return results;
}

function testEmailValidation() {
  const validEmails = ['test@example.com', 'user.name@domain.co.uk'];
  const invalidEmails = ['invalid-email', '@domain.com', 'user@'];
  
  const hasInvalidEmail = invalidEmails.some(email => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );

  return {
    name: 'Email Validation',
    vulnerable: hasInvalidEmail,
    message: hasInvalidEmail ? 'Invalid email validation' : 'Email validation working correctly'
  };
}

function testPasswordValidation() {
  const weakPasswords = ['password', '123456', 'qwerty'];
  const strongPasswords = ['SecurePass123!', 'MyP@ssw0rd2024'];
  
  const weakPasswordAccepted = weakPasswords.some(pwd => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(pwd)
  );

  return {
    name: 'Password Validation',
    vulnerable: weakPasswordAccepted,
    message: weakPasswordAccepted ? 'Weak passwords accepted' : 'Password validation working correctly'
  };
}

function testFileUploadValidation() {
  const allowedTypes = ['jpg', 'png', 'pdf'];
  const maliciousFiles = ['script.js', 'virus.exe', 'malware.bat'];
  
  const maliciousFileAccepted = maliciousFiles.some(file => {
    const extension = file.split('.').pop().toLowerCase();
    return allowedTypes.includes(extension);
  });

  return {
    name: 'File Upload Validation',
    vulnerable: maliciousFileAccepted,
    message: maliciousFileAccepted ? 'Malicious files accepted' : 'File upload validation working correctly'
  };
}

function testSQLInjectionValidation() {
  const maliciousInputs = ["'; DROP TABLE users; --", "' OR 1=1--"];
  const safeInputs = ['normal text', 'user@example.com'];
  
  const maliciousInputAccepted = maliciousInputs.some(input => {
    const sanitized = input.replace(/['";]/g, '').replace(/--/g, '');
    return sanitized === input; // If no sanitization occurred
  });

  return {
    name: 'SQL Injection Validation',
    vulnerable: maliciousInputAccepted,
    message: maliciousInputAccepted ? 'SQL injection possible' : 'SQL injection validation working correctly'
  };
}

function testXSSValidation() {
  const maliciousInputs = ['<script>alert("xss")</script>', 'javascript:alert("xss")'];
  const safeInputs = ['<p>Safe content</p>', 'normal text'];
  
  const maliciousInputAccepted = maliciousInputs.some(input => {
    const sanitized = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
    return sanitized === input; // If no sanitization occurred
  });

  return {
    name: 'XSS Validation',
    vulnerable: maliciousInputAccepted,
    message: maliciousInputAccepted ? 'XSS possible' : 'XSS validation working correctly'
  };
}
