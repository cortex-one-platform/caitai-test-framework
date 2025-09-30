export async function testCSRFProtection(options = {}) {
  const results = {
    vulnerable: false,
    message: 'CSRF protection test completed'
  };

  // Test for CSRF token presence
  const hasCSRFToken = await checkCSRFToken(options);
  if (!hasCSRFToken) {
    results.vulnerable = true;
    results.message = 'CSRF token not found';
  }

  return results;
}

async function checkCSRFToken(options) {
  // Check if form has CSRF token
  if (options.form) {
    const hasToken = options.form.hasAttribute('data-csrf-token') || 
                    options.form.querySelector('input[name="csrf_token"]') ||
                    options.form.querySelector('input[name="_token"]');
    return !!hasToken;
  }
  
  // Default to false (vulnerable) if no form provided
  return false;
}
