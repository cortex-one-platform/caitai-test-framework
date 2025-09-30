// TypeScript definitions for Security Test Framework

declare module 'security-test-framework' {
  // Core exports
  export const TestFramework: any;
  export const TestUtils: any;
  export const TestProviders: any;
  export const SecurityTests: any;
  export const CoverageAnalyzer: any;
  export const PerformanceTester: any;
  export const IntegrationUtils: any;
  export const ReportGenerator: any;
  export const ProjectAnalyzer: any;
  export const AutoConfig: any;

  // Assertion helpers
  export class AssertionHelpers {
    static expectValidEmail(email: string): void;
    static expectValidUrl(url: string): void;
    static expectValidPhoneNumber(phone: string): void;
    static expectValidCreditCard(card: string): void;
    static expectValidIPAddress(ip: string): void;
    static expectValidHexColor(color: string): void;
    static expectValidTime(time: string): void;
    static expectValidISODate(date: string): void;
    static expectValidSlug(slug: string): void;
    static expectValidUsername(username: string): void;
    static expectValidDomain(domain: string): void;
    static expectValidPort(port: number): void;
    static expectValidVersion(version: string): void;
    static expectValidMACAddress(mac: string): void;
    static expectValidPostalCode(postalCode: string): void;
    static expectValidSSN(ssn: string): void;
    static expectValidISBN(isbn: string): void;
    static expectValidLatitude(lat: number): void;
    static expectValidLongitude(lng: number): void;
    static expectValidCoordinates(coords: { lat: number; lng: number }): void;
    static expectValidCurrency(currency: string): void;
    static expectValidPercentage(percentage: number): void;
    static expectValidAge(age: number): void;
    static expectValidYear(year: number): void;
    static expectValidMonth(month: number): void;
    static expectValidDay(day: number): void;
    static expectValidHour(hour: number): void;
    static expectValidMinute(minute: number): void;
    static expectValidSecond(second: number): void;
    static expectStrongPassword(password: string): void;
    static expectNoXSS(input: string): void;
    static expectNoSQLInjection(input: string): void;
    static expectValidFileType(filename: string, allowedTypes: string[]): void;
    static expectValidFileSize(size: number, maxSize: number): void;
    static expectValidImageDimensions(width: number, height: number, maxWidth: number, maxHeight: number): void;
    static expectValidJSON(json: string): void;
    static expectValidBase64(base64: string): void;
    static expectValidUUID(uuid: string): void;
    static expectValidJWT(jwt: string): void;
    static expectValidAPIKey(key: string): void;
    static expectValidSessionToken(token: string): void;
    static expectValidCSRFToken(token: string): void;
    static expectValidRateLimit(requests: number, limit: number): void;
    static expectValidCacheControl(header: string): void;
    static expectValidContentType(contentType: string): void;
    static expectValidUserAgent(userAgent: string): void;
    static expectValidReferer(referer: string): void;
    static expectValidOrigin(origin: string): void;
    static expectValidCORS(origin: string, allowedOrigins: string[]): void;
    static expectValidCSP(policy: string): void;
    static expectValidHSTS(header: string): void;
    static expectValidXFrameOptions(header: string): void;
    static expectValidXContentTypeOptions(header: string): void;
    static expectValidXSSProtection(header: string): void;
    static expectValidReferrerPolicy(header: string): void;
    static expectValidPermissionsPolicy(header: string): void;
    static expectValidStrictTransportSecurity(header: string): void;
    static expectValidPublicKeyPins(header: string): void;
    static expectValidExpectCT(header: string): void;
    static expectValidFeaturePolicy(header: string): void;
    static expectValidCrossOriginEmbedderPolicy(header: string): void;
    static expectValidCrossOriginOpenerPolicy(header: string): void;
    static expectValidCrossOriginResourcePolicy(header: string): void;
    static expectValidOriginAgentCluster(header: string): void;
    static expectValidPermissionsPolicy(header: string): void;
    static expectValidReportTo(header: string): void;
    static expectValidReportingEndpoints(header: string): void;
    static expectValidStrictTransportSecurity(header: string): void;
    static expectValidPublicKeyPins(header: string): void;
    static expectValidExpectCT(header: string): void;
    static expectValidFeaturePolicy(header: string): void;
    static expectValidCrossOriginEmbedderPolicy(header: string): void;
    static expectValidCrossOriginOpenerPolicy(header: string): void;
    static expectValidCrossOriginResourcePolicy(header: string): void;
    static expectValidOriginAgentCluster(header: string): void;
    static expectValidPermissionsPolicy(header: string): void;
    static expectValidReportTo(header: string): void;
    static expectValidReportingEndpoints(header: string): void;
    static expectInRange(value: number, min: number, max: number): void;
    static expectLength(value: string | any[], length: number): void;
    static expectMinLength(value: string | any[], minLength: number): void;
    static expectMaxLength(value: string | any[], maxLength: number): void;
    static expectRequiredProperties(obj: any, properties: string[]): void;
    static expectOptionalProperties(obj: any, properties: string[]): void;
    static expectNoProperties(obj: any, properties: string[]): void;
    static expectValidEnum(value: any, enumValues: any[]): void;
    static expectValidRegex(pattern: string): void;
    static expectValidDate(date: Date): void;
    static expectValidArray(arr: any[]): void;
    static expectValidObject(obj: object): void;
    static expectValidFunction(fn: Function): void;
    static expectValidPromise(promise: Promise<any>): void;
    static expectValidAsyncFunction(fn: Function): void;
    static expectValidGeneratorFunction(fn: Function): void;
    static expectValidClass(cls: Function): void;
    static expectValidInstance(instance: any, constructor: Function): void;
    static expectValidPrototype(obj: any, constructor: Function): void;
    static expectValidInheritance(child: Function, parent: Function): void;
    static expectValidComposition(obj: any, components: string[]): void;
    static expectValidAggregation(obj: any, parts: string[]): void;
    static expectValidAssociation(obj: any, related: string[]): void;
    static expectValidDependency(obj: any, dependencies: string[]): void;
    static expectValidCoupling(obj: any, coupled: string[]): void;
    static expectValidCohesion(obj: any, cohesive: string[]): void;
    static expectValidAbstraction(obj: any, abstract: string[]): void;
    static expectValidEncapsulation(obj: any, private: string[]): void;
    static expectValidPolymorphism(obj: any, polymorphic: string[]): void;
    static expectValidInterface(obj: any, interface: string[]): void;
    static expectValidImplementation(obj: any, implementation: string[]): void;
    static expectValidContract(obj: any, contract: string[]): void;
    static expectValidSpecification(obj: any, specification: string[]): void;
    static expectValidDesignPattern(obj: any, pattern: string): void;
    static expectValidArchitecture(obj: any, architecture: string): void;
    static expectValidFramework(obj: any, framework: string): void;
    static expectValidLibrary(obj: any, library: string): void;
    static expectValidTool(obj: any, tool: string): void;
    static expectValidPlatform(obj: any, platform: string): void;
    static expectValidRuntime(obj: any, runtime: string): void;
    static expectValidEnvironment(obj: any, environment: string): void;
    static expectValidConfiguration(obj: any, config: string): void;
    static expectValidSettings(obj: any, settings: string): void;
    static expectValidPreferences(obj: any, preferences: string): void;
    static expectValidOptions(obj: any, options: string): void;
    static expectValidParameters(obj: any, parameters: string): void;
    static expectValidArguments(obj: any, arguments: string): void;
    static expectValidReturnValue(obj: any, returnValue: string): void;
    static expectValidSideEffect(obj: any, sideEffect: string): void;
    static expectValidState(obj: any, state: string): void;
    static expectValidBehavior(obj: any, behavior: string): void;
    static expectValidLogic(obj: any, logic: string): void;
    static expectValidAlgorithm(obj: any, algorithm: string): void;
    static expectValidDataStructure(obj: any, dataStructure: string): void;
    static expectValidDataType(obj: any, dataType: string): void;
    static expectValidValue(obj: any, value: string): void;
    static expectValidFormat(obj: any, format: string): void;
    static expectValidEncoding(obj: any, encoding: string): void;
    static expectValidCompression(obj: any, compression: string): void;
    static expectValidEncryption(obj: any, encryption: string): void;
    static expectValidHashing(obj: any, hashing: string): void;
    static expectValidSigning(obj: any, signing: string): void;
    static expectValidVerification(obj: any, verification: string): void;
    static expectValidAuthentication(obj: any, authentication: string): void;
    static expectValidAuthorization(obj: any, authorization: string): void;
    static expectValidSession(obj: any, session: string): void;
    static expectValidToken(obj: any, token: string): void;
    static expectValidCookie(obj: any, cookie: string): void;
    static expectValidHeader(obj: any, header: string): void;
    static expectValidBody(obj: any, body: string): void;
    static expectValidQuery(obj: any, query: string): void;
    static expectValidPath(obj: any, path: string): void;
    static expectValidMethod(obj: any, method: string): void;
    static expectValidProtocol(obj: any, protocol: string): void;
    static expectValidHost(obj: any, host: string): void;
    static expectValidPort(obj: any, port: string): void;
    static expectValidURL(obj: any, url: string): void;
    static expectValidURI(obj: any, uri: string): void;
    static expectValidURN(obj: any, urn: string): void;
    static expectValidURN(obj: any, urn: string): void;
  }

  // React utilities
  export function renderWithProviders(component: React.ReactElement): any;
  export function renderWithAuth(component: React.ReactElement, user?: any): any;
  export function renderWithTheme(component: React.ReactElement, theme?: any): any;
  export function renderWithStore(component: React.ReactElement, store?: any): any;

  // Security test results
  export interface SecurityTestResult {
    vulnerable: boolean;
    message: string;
    details?: any;
  }

  export interface SecurityTestResults {
    passed: number;
    failed: number;
    vulnerabilities: SecurityTestResult[];
  }

  // Coverage results
  export interface CoverageResult {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
    overall: number;
    meetsThreshold: boolean;
  }

  // Performance results
  export interface PerformanceResult {
    responseTime: number;
    throughput: number;
    errorRate: number;
    memoryUsage: number;
  }

  // Report options
  export interface ReportOptions {
    format?: 'html' | 'json' | 'text';
    outputPath?: string;
    includeDetails?: boolean;
    includeRecommendations?: boolean;
    threshold?: number;
  }
}
