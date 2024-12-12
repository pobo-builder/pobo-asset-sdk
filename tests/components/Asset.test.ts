import { Asset } from '../../src/components/Asset';

describe('Asset Component', () => {
    let assetInstance: Asset;

    beforeEach(() => {
        document.head.innerHTML = '';
    });

    afterEach(() => {
        if (assetInstance) {
            assetInstance.destroy();
        }
        document.head.innerHTML = '';
    });

    test('should create and append generic style element with correct attributes', () => {
        assetInstance = new Asset();

        const styleElement = document.querySelector(
            'link[href="https://image.pobo.cz/assets/generic.css"]'
        ) as HTMLLinkElement;

        expect(styleElement).toBeTruthy();
        expect(styleElement.rel).toBe('stylesheet');
        expect(styleElement.href).toBe('https://image.pobo.cz/assets/generic.css');
    });

    test('should append style element to head', () => {
        assetInstance = new Asset();

        const headChildren = document.head.children;

        expect(headChildren.length).toBe(1);
        expect(headChildren[0].tagName.toLowerCase()).toBe('link');
    });

    test('should properly destroy and remove style element', () => {
        assetInstance = new Asset();

        expect(
            document.querySelector('link[href="https://image.pobo.cz/assets/generic.css"]')
        ).toBeTruthy();

        assetInstance.destroy();

        expect(
            document.querySelector('link[href="https://image.pobo.cz/assets/generic.css"]')
        ).toBeNull();
    });

    test('should handle destroy when element is already removed', () => {
        assetInstance = new Asset();

        const styleElement = document.querySelector(
            'link[href="https://image.pobo.cz/assets/generic.css"]'
        );
        styleElement?.remove();

        expect(() => assetInstance.destroy()).not.toThrow();
    });

    test('should handle multiple instances', () => {
        const instance1 = new Asset();
        const instance2 = new Asset();

        const styleElements = document.querySelectorAll(
            'link[href="https://image.pobo.cz/assets/generic.css"]'
        );

        expect(styleElements.length).toBe(2);

        instance1.destroy();
        instance2.destroy();

        expect(
            document.querySelectorAll('link[href="https://image.pobo.cz/assets/generic.css"]')
        ).toHaveLength(0);
    });

    test('should maintain other head elements when destroying', () => {
        // Add unrelated style element
        const unrelatedStyle = document.createElement('link');
        unrelatedStyle.href = 'https://other-domain.com/style.css';
        unrelatedStyle.rel = 'stylesheet';
        document.head.appendChild(unrelatedStyle);

        assetInstance = new Asset();
        assetInstance.destroy();

        expect(document.querySelector('link[href="https://other-domain.com/style.css"]')).toBeTruthy();
    });
});