export function createMockElement(className: string): HTMLElement {
    const element = document.createElement('div');
    element.className = className;
    return element;
}