const mockMiniLazyLoad = jest.fn();

jest.mock('minilazyload', () => ({
    __esModule: true,
    default: mockMiniLazyLoad
}));

import { LazyLoad } from '../../src/components/LazyLoad';

describe('LazyLoad Component', () => {
    let lazyLoadInstance: LazyLoad;

    beforeEach(() => {
        mockMiniLazyLoad.mockClear();
    });

    afterEach(() => {
        if (lazyLoadInstance) {
            lazyLoadInstance.destroy();
        }
    });

    test('should initialize with default options', () => {
        lazyLoadInstance = new LazyLoad();

        expect(mockMiniLazyLoad).toHaveBeenCalledWith(
            expect.objectContaining({
                rootMargin: '50px',
                threshold: 0.5,
                placeholder: 'placeholder.png'
            }),
            '.lazyLoad'
        );
    });

    test('should initialize with custom options', () => {
        const customOptions = {
            rootMargin: '100px',
            threshold: 0.8,
            placeholder: 'custom-placeholder.png'
        };

        lazyLoadInstance = new LazyLoad(customOptions);

        expect(mockMiniLazyLoad).toHaveBeenCalledWith(
            expect.objectContaining(customOptions),
            '.lazyLoad'
        );
    });

    test('should reinitialize on custom event', () => {
        lazyLoadInstance = new LazyLoad();

        mockMiniLazyLoad.mockClear();
        document.dispatchEvent(new CustomEvent('pobo:reinit:lazyload'));

        expect(mockMiniLazyLoad).toHaveBeenCalledTimes(1);
    });
});