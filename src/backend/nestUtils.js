export class NestUtils {
  static async createTestingModule(config) {
    // Simulate NestJS testing module creation
    return {
      get: (token) => ({ token }),
      createNestApplication: () => ({
        init: async () => {},
        close: async () => {}
      })
    };
  }
}

export default NestUtils;
