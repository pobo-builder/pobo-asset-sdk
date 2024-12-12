import '@testing-library/jest-dom';

jest.mock('minilazyload', () => {
    return {
        __esModule: true,
        default: class MiniLazyLoad {
            constructor(options: any, selector: string) {}
        }
    };
});

jest.mock('lightgallery', () => {
    return {
        __esModule: true,
        default: (element: HTMLElement, options: any) => ({
            destroy: jest.fn()
        })
    };
});

jest.mock('lightgallery/plugins/thumbnail/lg-thumbnail.es5', () => {
    return {
        __esModule: true,
        default: {}
    };
});