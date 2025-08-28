// Auto-generated Security Test Framework configuration
// Generated on: 2025-08-28T21:13:40.996Z
// Project type: nestjs-backend

export default {
  "security": {
    "enabled": {
      "xss": true,
      "sqlInjection": true,
      "csrf": true,
      "authentication": true,
      "authorization": true,
      "inputValidation": true,
      "fileUpload": true,
      "sessionSecurity": true,
      "encryption": true,
      "dependencyVulnerabilities": true,
      "environmentSecurity": true,
      "loggingSecurity": true,
      "securityHeaders": true,
      "rateLimiting": true,
      "tokenManagement": true,
      "errorHandling": true
    },
    "thresholds": {
      "maxVulnerabilities": 0,
      "minSecurityScore": 90
    },
    "customRules": {
      "allowedFileTypes": [
        ".jpg",
        ".png",
        ".pdf",
        ".doc"
      ],
      "maxFileSize": 5242880,
      "requiredHeaders": [
        "X-Frame-Options",
        "X-Content-Type-Options"
      ],
      "forbiddenPatterns": [
        {},
        {},
        {}
      ]
    }
  },
  "coverage": {
    "threshold": 80,
    "includeSecurityCoverage": true
  },
  "performance": {
    "enabled": true
  },
  "reporting": {
    "enabled": true,
    "formats": [
      "html",
      "json"
    ]
  },
  "api": {
    "testEndpoints": true,
    "validateResponses": true,
    "testAuthentication": true,
    "testAuthorization": true,
    "database": null,
    "authentication": [
      "session"
    ],
    "deployment": "unknown"
  },
  "testing": {
    "framework": "vitest",
    "e2e": null,
    "component": null
  }
};
