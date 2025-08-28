export class DOMUtils {
  static createMockElement(tagName = 'div', attributes = {}) {
    const element = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
  }
}

export default DOMUtils;
