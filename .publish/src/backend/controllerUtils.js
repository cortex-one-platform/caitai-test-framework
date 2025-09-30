export class ControllerUtils {
  static createMockRequest(overrides = {}) {
    return {
      method: 'GET',
      url: '/api/test',
      headers: {},
      body: {},
      params: {},
      query: {},
      user: null,
      ...overrides
    };
  }
}

export default ControllerUtils;
