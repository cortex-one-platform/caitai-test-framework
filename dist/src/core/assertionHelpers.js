import { expect } from 'vitest';

/**
 * Enhanced assertion helpers for comprehensive testing
 */
export class AssertionHelpers {
  /**
   * Assert that a value is a valid email
   */
  static expectValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(email).toMatch(emailRegex);
  }

  /**
   * Assert that a value is a valid URL
   */
  static expectValidUrl(url) {
    try {
      new URL(url);
      expect(true).toBe(true); // URL is valid
    } catch {
      expect.fail(`Expected ${url} to be a valid URL`);
    }
  }

  /**
   * Assert that a value is a valid UUID
   */
  static expectValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  }

  /**
   * Assert that a value is a valid JWT token
   */
  static expectValidJWT(token) {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    expect(token).toMatch(jwtRegex);
  }

  /**
   * Assert that a value is a valid date string
   */
  static expectValidDate(dateString) {
    const date = new Date(dateString);
    expect(date.getTime()).not.toBeNaN();
  }

  /**
   * Assert that a value is within a specified range
   */
  static expectInRange(value, min, max) {
    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThanOrEqual(max);
  }

  /**
   * Assert that a value has a specific length
   */
  static expectLength(value, length) {
    expect(value).toHaveLength(length);
  }

  /**
   * Assert that a value has a minimum length
   */
  static expectMinLength(value, minLength) {
    expect(value.length).toBeGreaterThanOrEqual(minLength);
  }

  /**
   * Assert that a value has a maximum length
   */
  static expectMaxLength(value, maxLength) {
    expect(value.length).toBeLessThanOrEqual(maxLength);
  }

  /**
   * Assert that an object has required properties
   */
  static expectRequiredProperties(obj, requiredProps) {
    requiredProps.forEach(prop => {
      expect(obj).toHaveProperty(prop);
    });
  }

  /**
   * Assert that an object has optional properties (at least one)
   */
  static expectOptionalProperties(obj, optionalProps) {
    const hasAtLeastOne = optionalProps.some(prop => obj.hasOwnProperty(prop));
    expect(hasAtLeastOne).toBe(true);
  }

  /**
   * Assert that a value is a valid password (strong)
   */
  static expectStrongPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    // Updated to include more special characters including @ and #
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    expect(password).toMatch(strongPasswordRegex);
  }

  /**
   * Assert that a value contains no XSS payloads
   */
  static expectNoXSS(value) {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi
    ];

    xssPatterns.forEach(pattern => {
      expect(value).not.toMatch(pattern);
    });
  }

  /**
   * Assert that a value contains no SQL injection payloads
   */
  static expectNoSQLInjection(value) {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/gi,
      /(\b(OR|AND)\b\s+['"]\w+['"]\s*=\s*['"]\w+['"])/gi,
      /(--|\/\*|\*\/)/g
    ];

    sqlPatterns.forEach(pattern => {
      expect(value).not.toMatch(pattern);
    });
  }

  /**
   * Assert that a value is a valid phone number
   */
  static expectValidPhoneNumber(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    expect(phone).toMatch(phoneRegex);
  }

  /**
   * Assert that a value is a valid credit card number
   */
  static expectValidCreditCard(cardNumber) {
    // Luhn algorithm check
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    expect(sum % 10).toBe(0);
  }

  /**
   * Assert that a value is a valid IP address
   */
  static expectValidIPAddress(ip) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    expect(ip).toMatch(ipv4Regex) || expect(ip).toMatch(ipv6Regex);
  }

  /**
   * Assert that a value is a valid file size (in bytes)
   */
  static expectValidFileSize(size, maxSize) {
    expect(size).toBeGreaterThan(0);
    expect(size).toBeLessThanOrEqual(maxSize);
  }

  /**
   * Assert that a value is a valid file type
   */
  static expectValidFileType(filename, allowedTypes) {
    const extension = filename.split('.').pop().toLowerCase();
    expect(allowedTypes).toContain(extension);
  }

  /**
   * Assert that a value is a valid JSON string
   */
  static expectValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      expect(true).toBe(true); // JSON is valid
    } catch {
      expect.fail(`Expected ${jsonString} to be valid JSON`);
    }
  }

  /**
   * Assert that a value is a valid base64 string
   */
  static expectValidBase64(base64String) {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    expect(base64String).toMatch(base64Regex);
  }

  /**
   * Assert that a value is a valid hex color
   */
  static expectValidHexColor(color) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    expect(color).toMatch(hexColorRegex);
  }

  /**
   * Assert that a value is a valid time string (HH:MM:SS)
   */
  static expectValidTime(time) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    expect(time).toMatch(timeRegex);
  }

  /**
   * Assert that a value is a valid date in ISO format
   */
  static expectValidISODate(dateString) {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    expect(dateString).toMatch(isoDateRegex);
  }

  /**
   * Assert that a value is a valid slug
   */
  static expectValidSlug(slug) {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    expect(slug).toMatch(slugRegex);
  }

  /**
   * Assert that a value is a valid username
   */
  static expectValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    expect(username).toMatch(usernameRegex);
  }

  /**
   * Assert that a value is a valid domain name
   */
  static expectValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    expect(domain).toMatch(domainRegex);
  }

  /**
   * Assert that a value is a valid port number
   */
  static expectValidPort(port) {
    expect(port).toBeGreaterThan(0);
    expect(port).toBeLessThanOrEqual(65535);
  }

  /**
   * Assert that a value is a valid version string
   */
  static expectValidVersion(version) {
    const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;
    expect(version).toMatch(versionRegex);
  }

  /**
   * Assert that a value is a valid MAC address
   */
  static expectValidMACAddress(mac) {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    expect(mac).toMatch(macRegex);
  }

  /**
   * Assert that a value is a valid postal code (US format)
   */
  static expectValidPostalCode(postalCode) {
    const postalRegex = /^\d{5}(-\d{4})?$/;
    expect(postalCode).toMatch(postalRegex);
  }

  /**
   * Assert that a value is a valid SSN (US format)
   */
  static expectValidSSN(ssn) {
    const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
    expect(ssn).toMatch(ssnRegex);
  }

  /**
   * Assert that a value is a valid ISBN
   */
  static expectValidISBN(isbn) {
    // Remove hyphens and spaces for validation
    const cleanIsbn = isbn.replace(/[-\s]/g, '');
    const isbnRegex = /^(?:[0-9]{9}X|[0-9]{10}|[0-9]{13})$/;
    expect(cleanIsbn).toMatch(isbnRegex);
  }

  /**
   * Assert that a value is a valid latitude
   */
  static expectValidLatitude(lat) {
    expect(lat).toBeGreaterThanOrEqual(-90);
    expect(lat).toBeLessThanOrEqual(90);
  }

  /**
   * Assert that a value is a valid longitude
   */
  static expectValidLongitude(lng) {
    expect(lng).toBeGreaterThanOrEqual(-180);
    expect(lng).toBeLessThanOrEqual(180);
  }

  /**
   * Assert that a value is a valid coordinate pair
   */
  static expectValidCoordinates(coords) {
    expect(coords).toHaveProperty('lat');
    expect(coords).toHaveProperty('lng');
    this.expectValidLatitude(coords.lat);
    this.expectValidLongitude(coords.lng);
  }

  /**
   * Assert that a value is a valid currency amount
   */
  static expectValidCurrency(amount) {
    const currencyRegex = /^\d+(\.\d{1,2})?$/;
    expect(amount).toMatch(currencyRegex);
    expect(parseFloat(amount)).toBeGreaterThan(0);
  }

  /**
   * Assert that a value is a valid percentage
   */
  static expectValidPercentage(percentage) {
    expect(percentage).toBeGreaterThanOrEqual(0);
    expect(percentage).toBeLessThanOrEqual(100);
  }

  /**
   * Assert that a value is a valid age
   */
  static expectValidAge(age) {
    expect(age).toBeGreaterThan(0);
    expect(age).toBeLessThanOrEqual(150);
  }

  /**
   * Assert that a value is a valid year
   */
  static expectValidYear(year) {
    const currentYear = new Date().getFullYear();
    expect(year).toBeGreaterThan(1900);
    expect(year).toBeLessThanOrEqual(currentYear + 10);
  }

  /**
   * Assert that a value is a valid month
   */
  static expectValidMonth(month) {
    expect(month).toBeGreaterThanOrEqual(1);
    expect(month).toBeLessThanOrEqual(12);
  }

  /**
   * Assert that a value is a valid day
   */
  static expectValidDay(day) {
    expect(day).toBeGreaterThanOrEqual(1);
    expect(day).toBeLessThanOrEqual(31);
  }

  /**
   * Assert that a value is a valid hour
   */
  static expectValidHour(hour) {
    expect(hour).toBeGreaterThanOrEqual(0);
    expect(hour).toBeLessThanOrEqual(23);
  }

  /**
   * Assert that a value is a valid minute
   */
  static expectValidMinute(minute) {
    expect(minute).toBeGreaterThanOrEqual(0);
    expect(minute).toBeLessThanOrEqual(59);
  }

  /**
   * Assert that a value is a valid second
   */
  static expectValidSecond(second) {
    expect(second).toBeGreaterThanOrEqual(0);
    expect(second).toBeLessThanOrEqual(59);
  }
}

export default AssertionHelpers;
