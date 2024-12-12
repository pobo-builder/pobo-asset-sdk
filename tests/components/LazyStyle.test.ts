import { LazyStyle } from '../../src/components/LazyStyle';

jest.mock('../../src/utils/platform', () => ({
    getEshopUrl: jest.fn(() => 'https://example.com'),
    getCDNUrl: jest.fn(() => 'https://cdn.example.com')
}));

describe('LazyStyle Component', () => {
    let lazyStyleInstance: LazyStyle;
    const originalRandom = Math.random;
    let mockRandom: jest.Mock;

    beforeEach(() => {
        mockRandom = jest.fn(() => 0.123456789);
        Math.random = mockRandom;
        document.head.innerHTML = '';
    });

    afterEach(() => {
        if (lazyStyleInstance) {
            lazyStyleInstance.destroy();
        }
        Math.random = originalRandom;
        document.head.innerHTML = '';
    });

    test('should create and append style element with correct attributes', () => {
        lazyStyleInstance = new LazyStyle();

        const styleElement = document.head.querySelector('link') as HTMLLinkElement;

        expect(styleElement).toBeTruthy();
        expect(styleElement.id).toBe('pobo-template-core');
        expect(styleElement.rel).toBe('stylesheet');
        expect(styleElement.fetchPriority).toBe('high');
        expect(styleElement.href).toBe(
            'https://cdn.example.com/templates/example.com.css?v=12345678'
        );
    });

    test('should use correct URL format', () => {
        lazyStyleInstance = new LazyStyle();

        const styleElement = document.head.querySelector('link') as HTMLLinkElement;
        const url = new URL(styleElement.href);

        expect(url.hostname).toBe('cdn.example.com');
        expect(url.pathname).toBe('/templates/example.com.css');
        expect(url.searchParams.get('v')).toBe('12345678');
    });

    test('should properly destroy and remove style element', () => {
        lazyStyleInstance = new LazyStyle();

        expect(document.head.querySelector('#pobo-template-core')).toBeTruthy();

        lazyStyleInstance.destroy();

        expect(document.head.querySelector('#pobo-template-core')).toBeNull();
    });

    test('should handle destroy when element is already removed', () => {
        lazyStyleInstance = new LazyStyle();

        const styleElement = document.head.querySelector('#pobo-template-core');
        styleElement?.remove();

        expect(() => lazyStyleInstance.destroy()).not.toThrow();
    });

    test('should handle multiple instances', () => {
        const instance1 = new LazyStyle();
        const instance2 = new LazyStyle();

        const styleElements = document.head.querySelectorAll('link');
        expect(styleElements.length).toBe(2);

        styleElements.forEach(element => {
            expect(element.id).toBe('pobo-template-core');
            expect(element.rel).toBe('stylesheet');
            expect(element.fetchPriority).toBe('high');
        });

        instance1.destroy();
        expect(document.head.querySelectorAll('link').length).toBe(1);

        instance2.destroy();
        expect(document.head.querySelectorAll('link').length).toBe(0);
    });

    test('should strip protocol from eshop URL', () => {
        const mockGetEshopUrl = jest.requireMock('../../src/utils/platform').getEshopUrl;
        mockGetEshopUrl.mockReturnValueOnce('http://test.example.com');

        lazyStyleInstance = new LazyStyle();

        const styleElement = document.head.querySelector('link') as HTMLLinkElement;
        expect(styleElement.href).toBe(
            'https://cdn.example.com/templates/test.example.com.css?v=12345678'
        );
    });

    test('should maintain unique version numbers', () => {
        mockRandom
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.2);

        const instance1 = new LazyStyle();
        const instance2 = new LazyStyle();

        const elements = document.head.querySelectorAll('link');
        const versions = Array.from(elements).map(el => {
            const url = new URL(el.href);
            return url.searchParams.get('v');
        });

        expect(versions[0]).not.toBe(versions[1]);

        instance1.destroy();
        instance2.destroy();
    });

    test('should preserve other head elements', () => {
        const unrelatedStyle = document.createElement('link');
        unrelatedStyle.href = 'https://other.css';
        unrelatedStyle.rel = 'stylesheet';
        document.head.appendChild(unrelatedStyle);

        lazyStyleInstance = new LazyStyle();
        lazyStyleInstance.destroy();

        expect(document.head.querySelector('link[href="https://other.css"]')).toBeTruthy();
    });

    test('should handle malformed URLs gracefully', () => {
        const mockGetEshopUrl = jest.requireMock('../../src/utils/platform').getEshopUrl;
        mockGetEshopUrl.mockReturnValueOnce('invalid://test.com:xyz');

        expect(() => new LazyStyle()).not.toThrow();

        const styleElement = document.head.querySelector('link') as HTMLLinkElement;
        expect(styleElement).toBeTruthy();
    });
});