import React from 'react';

export class ReactUtils {
  static createTestProviders(children) {
    return React.createElement('div', { 'data-testid': 'test-providers' }, children);
  }
}

export default ReactUtils;
