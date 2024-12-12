// tests/components/Gallery.test.ts
import { Gallery } from '../../src/components/Gallery';
import lightGallery from 'lightgallery';

// Mock lightgallery modulu
jest.mock('lightgallery', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({
            destroy: jest.fn()
        }))
    };
});

// Mock thumbnail plugin
jest.mock('lightgallery/plugins/thumbnail/lg-thumbnail.es5', () => {
    return {
        __esModule: true,
        default: {}
    };
});

describe('Gallery Component', () => {
    let galleryInstance: Gallery;
    const mockLightGallery = lightGallery as jest.MockedFunction<typeof lightGallery>;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <div id="pobo-all-content">
                <a href="image1.jpg" class="pb-gallery-trigger">Image 1</a>
                <a href="image2.jpg" class="pb-gallery-trigger">Image 2</a>
            </div>
        `;

        // Clear mocks before each test
        mockLightGallery.mockClear();
    });

    afterEach(() => {
        if (galleryInstance) {
            galleryInstance.destroy();
        }
        document.body.innerHTML = '';
    });

    test('should initialize with default options', () => {
        galleryInstance = new Gallery();

        expect(mockLightGallery).toHaveBeenCalledTimes(1);
        expect(mockLightGallery).toHaveBeenCalledWith(
            document.getElementById('pobo-all-content'),
            expect.objectContaining({
                selector: '.pb-gallery-trigger',
                download: false,
                thumbnail: true,
                licenseKey: 'C78FC8E5-D47D-4FA4-955A-CD5617B873C8'
            })
        );
    });

    test('should initialize with custom options', () => {
        const customOptions = {
            selector: '.custom-trigger',
            download: true,
            thumbnail: false
        };

        galleryInstance = new Gallery(customOptions);

        expect(mockLightGallery).toHaveBeenCalledWith(
            document.getElementById('pobo-all-content'),
            expect.objectContaining({
                ...customOptions,
                licenseKey: 'C78FC8E5-D47D-4FA4-955A-CD5617B873C8'
            })
        );
    });

    test('should not initialize if content element is not found', () => {
        document.body.innerHTML = ''; // Remove content element
        galleryInstance = new Gallery();

        expect(mockLightGallery).not.toHaveBeenCalled();
    });

    test('should properly destroy instance', () => {
        galleryInstance = new Gallery();
        const mockDestroy = (galleryInstance as any).instance.destroy;

        galleryInstance.destroy();

        expect(mockDestroy).toHaveBeenCalledTimes(1);
    });

    test('should handle destroy when instance is not initialized', () => {
        document.body.innerHTML = ''; // Remove content element
        galleryInstance = new Gallery(); // Instance won't be initialized

        // Should not throw error
        expect(() => galleryInstance.destroy()).not.toThrow();
    });
});