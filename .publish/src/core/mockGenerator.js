import { vi } from 'vitest';

class MockGenerator {
  constructor() {
    this.mockData = {
      users: [],
      products: [],
      orders: [],
      auth: {},
      api: {},
      database: {}
    };
  }

  /**
   * Generate mock user data
   */
  createMockUser(overrides = {}) {
    const baseUser = {
      id: this.generateId(),
      email: `user${this.generateId()}@example.com`,
      name: `User ${this.generateId()}`,
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.generateId()}`,
        bio: 'Mock user bio',
        location: 'Mock City, MC',
        website: 'https://example.com'
      },
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      }
    };

    return { ...baseUser, ...overrides };
  }

  /**
   * Generate mock product data
   */
  createMockProduct(overrides = {}) {
    const baseProduct = {
      id: this.generateId(),
      name: `Product ${this.generateId()}`,
      description: 'Mock product description',
      price: Math.floor(Math.random() * 1000) + 10,
      category: ['electronics', 'clothing', 'books', 'home'][Math.floor(Math.random() * 4)],
      inStock: Math.random() > 0.3,
      rating: (Math.random() * 5).toFixed(1),
      images: [
        `https://picsum.photos/400/300?random=${this.generateId()}`,
        `https://picsum.photos/400/300?random=${this.generateId() + 1}`
      ],
      tags: ['mock', 'test', 'product'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return { ...baseProduct, ...overrides };
  }

  /**
   * Generate mock order data
   */
  createMockOrder(overrides = {}) {
    const baseOrder = {
      id: this.generateId(),
      userId: this.generateId(),
      items: [
        {
          productId: this.generateId(),
          quantity: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 100) + 10
        }
      ],
      total: Math.floor(Math.random() * 500) + 50,
      status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
      shippingAddress: {
        street: '123 Mock Street',
        city: 'Mock City',
        state: 'MC',
        zipCode: '12345',
        country: 'Mock Country'
      },
      paymentMethod: 'credit_card',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return { ...baseOrder, ...overrides };
  }

  /**
   * Generate mock authentication data
   */
  createMockAuth(overrides = {}) {
    const baseAuth = {
      user: this.createMockUser(),
      token: `mock-jwt-token-${this.generateId()}`,
      refreshToken: `mock-refresh-token-${this.generateId()}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      isAuthenticated: true,
      permissions: ['read', 'write'],
      roles: ['user']
    };

    return { ...baseAuth, ...overrides };
  }

  /**
   * Generate mock API response
   */
  createMockApiResponse(overrides = {}) {
    const baseResponse = {
      success: true,
      data: null,
      message: 'Mock API response',
      timestamp: new Date().toISOString(),
      statusCode: 200
    };

    return { ...baseResponse, ...overrides };
  }

  /**
   * Generate mock database connection
   */
  createMockDatabase(overrides = {}) {
    const baseDatabase = {
      connect: vi.fn().mockResolvedValue({ success: true }),
      disconnect: vi.fn().mockResolvedValue({ success: true }),
      query: vi.fn().mockResolvedValue([]),
      transaction: vi.fn().mockImplementation(async (callback) => {
        return await callback();
      }),
      isConnected: true
    };

    return { ...baseDatabase, ...overrides };
  }

  /**
   * Generate mock Firebase configuration
   */
  createMockFirebase(overrides = {}) {
    const baseFirebase = {
      auth: {
        signInWithEmailAndPassword: vi.fn().mockResolvedValue({
          user: this.createMockUser(),
          credential: { accessToken: 'mock-access-token' }
        }),
        signOut: vi.fn().mockResolvedValue(),
        onAuthStateChanged: vi.fn().mockImplementation((callback) => {
          callback(this.createMockUser());
          return () => {};
        }),
        currentUser: this.createMockUser()
      },
      firestore: {
        collection: vi.fn().mockReturnValue({
          doc: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue({ data: () => this.createMockUser() }),
            set: vi.fn().mockResolvedValue(),
            update: vi.fn().mockResolvedValue(),
            delete: vi.fn().mockResolvedValue()
          }),
          add: vi.fn().mockResolvedValue({ id: this.generateId() }),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({
            docs: [{
              id: this.generateId(),
              data: () => this.createMockUser()
            }]
          })
        })
      },
      storage: {
        ref: vi.fn().mockReturnValue({
          put: vi.fn().mockResolvedValue({ ref: { getDownloadURL: vi.fn().mockResolvedValue('mock-url') } }),
          getDownloadURL: vi.fn().mockResolvedValue('mock-url')
        })
      }
    };

    return { ...baseFirebase, ...overrides };
  }

  /**
   * Generate mock HTTP request
   */
  createMockRequest(overrides = {}) {
    const baseRequest = {
      method: 'GET',
      url: '/api/mock',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer mock-token'
      },
      body: {},
      params: {},
      query: {},
      user: this.createMockUser()
    };

    return { ...baseRequest, ...overrides };
  }

  /**
   * Generate mock HTTP response
   */
  createMockResponse(overrides = {}) {
    const baseResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      setHeader: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      clearCookie: vi.fn().mockReturnThis(),
      redirect: vi.fn().mockReturnThis()
    };

    return { ...baseResponse, ...overrides };
  }

  /**
   * Generate mock error
   */
  createMockError(overrides = {}) {
    const baseError = {
      name: 'MockError',
      message: 'Mock error message',
      statusCode: 500,
      code: 'MOCK_ERROR',
      stack: 'Mock error stack trace'
    };

    return { ...baseError, ...overrides };
  }

  /**
   * Generate mock form data
   */
  createMockFormData(overrides = {}) {
    const baseFormData = {
      email: 'test@example.com',
      password: 'mockPassword123!',
      name: 'Mock User',
      age: 25,
      agreeToTerms: true,
      preferences: ['option1', 'option2']
    };

    return { ...baseFormData, ...overrides };
  }

  /**
   * Generate mock file upload
   */
  createMockFileUpload(overrides = {}) {
    const baseFile = {
      fieldname: 'file',
      originalname: 'mock-file.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1024 * 1024, // 1MB
      buffer: Buffer.from('mock file content'),
      destination: '/tmp/',
      filename: 'mock-file.jpg',
      path: '/tmp/mock-file.jpg'
    };

    return { ...baseFile, ...overrides };
  }

  /**
   * Generate mock validation error
   */
  createMockValidationError(overrides = {}) {
    const baseValidationError = {
      name: 'ValidationError',
      message: 'Validation failed',
      errors: [
        {
          field: 'email',
          message: 'Email is required',
          value: ''
        },
        {
          field: 'password',
          message: 'Password must be at least 8 characters',
          value: '123'
        }
      ]
    };

    return { ...baseValidationError, ...overrides };
  }

  /**
   * Generate unique ID
   */
  generateId() {
    // Generate a proper UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Generate mock data set
   */
  generateDataSet(size = 10, type = 'users') {
    const data = [];
    for (let i = 0; i < size; i++) {
      switch (type) {
        case 'users':
          data.push(this.createMockUser());
          break;
        case 'products':
          data.push(this.createMockProduct());
          break;
        case 'orders':
          data.push(this.createMockOrder());
          break;
        default:
          data.push(this.createMockUser());
      }
    }
    return data;
  }

  /**
   * Reset all mocks
   */
  resetMocks() {
    vi.clearAllMocks();
    this.mockData = {
      users: [],
      products: [],
      orders: [],
      auth: {},
      api: {},
      database: {}
    };
  }
}

export default new MockGenerator();
