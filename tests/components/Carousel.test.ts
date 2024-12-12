import { Carousel } from '../../src/components/Carousel';

describe('Carousel Component', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    let carouselInstance: Carousel;
    let container: HTMLElement;
    let inner: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="pobo-all-content">
        <div class="pb-carousel-container">
          <div class="pb-carousel-inner"></div>
        </div>
      </div>
    `;

        container = document.querySelector('.pb-carousel-container') as HTMLElement;
        inner = document.querySelector('.pb-carousel-inner') as HTMLElement;

        Object.defineProperties(inner, {
            'scrollWidth': { value: 1000, configurable: true },
            'clientWidth': { value: 500, configurable: true },
            'scrollLeft': {
                writable: true,
                value: 0
            }
        });

        Object.defineProperty(container, 'offsetWidth', {
            value: 500,
            configurable: true
        });

        carouselInstance = new Carousel();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should create navigation triggers', () => {
        const leftTriggerDiv = container.querySelector('div:has(#left)') as HTMLElement;
        const rightTriggerDiv = container.querySelector('div:has(#right)') as HTMLElement;

        expect(leftTriggerDiv).toBeTruthy();
        expect(rightTriggerDiv).toBeTruthy();
    });

    test('should scroll on trigger click', () => {
        const rightTriggerLink = container.querySelector('#right') as HTMLElement;
        inner.scrollLeft = 0;

        rightTriggerLink.click();

        expect(inner.scrollLeft).toBe(500);
    });

    test('should handle visibility of triggers based on scroll position', () => {
        const leftTriggerDiv = container.querySelector('div:has(#left)') as HTMLElement;
        const rightTriggerDiv = container.querySelector('div:has(#right)') as HTMLElement;

        inner.scrollLeft = 0;
        inner.dispatchEvent(new Event('scroll'));

        jest.advanceTimersByTime(20);

        expect(leftTriggerDiv.style.visibility).toBe('hidden');
        expect(rightTriggerDiv.style.visibility).toBe('visible');

        inner.scrollLeft = 250;
        inner.dispatchEvent(new Event('scroll'));

        jest.advanceTimersByTime(20);

        expect(leftTriggerDiv.style.visibility).toBe('visible');
        expect(rightTriggerDiv.style.visibility).toBe('visible');
    });
});