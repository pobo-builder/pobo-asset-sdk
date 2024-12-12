import { debounceScroll } from '../utils/debounceScroll';
import { passiveListener } from '../utils/passiveListener';
import { CarouselOptions } from '../types';

export class Carousel {
    private readonly defaultOptions: CarouselOptions = {
        containerClass: 'pb-carousel-container',
        innerClass: 'pb-carousel-inner',
        triggerLeftClass: 'pb-carousel-inner__trigger-left',
        triggerRightClass: 'pb-carousel-inner__trigger-right'
    };

    constructor(options?: Partial<CarouselOptions>) {
        const opts = { ...this.defaultOptions, ...options };
        this.initialize(opts);
    }

    private initialize(options: CarouselOptions): void {
        const poboContent = document.getElementById('pobo-all-content');
        if (!poboContent) return;

        const carousels = document.getElementsByClassName(options.containerClass!);

        Array.from(carousels).forEach((carousel: Element) => {
            this.setupCarousel(carousel as HTMLElement, options);
        });
    }

    private setupCarousel(carousel: HTMLElement, options: CarouselOptions): void {
        const container = carousel.getElementsByClassName(options.innerClass!)[0] as HTMLElement;
        if (!container) return;

        this.createTriggers(carousel, container, options);
    }

    private createTriggers(carousel: HTMLElement, container: HTMLElement, options: CarouselOptions) {
        const left = document.createElement('div');
        left.innerHTML = `<a class="${options.triggerLeftClass}" href="#" id="left"></a>`;
        left.addEventListener('click', e => {
            e.preventDefault();
            container.scrollLeft -= carousel.offsetWidth;
        });

        const right = document.createElement('div');
        right.innerHTML = `<a class="${options.triggerRightClass}" href="#" id="right"></a>`;
        right.addEventListener('click', e => {
            e.preventDefault();
            container.scrollLeft += carousel.offsetWidth;
        });

        carousel.appendChild(left);
        carousel.appendChild(right);

        const onScroll = debounceScroll(() => {
            this.updateTriggerVisibility(container, left, right);
        }, 10);

        container.addEventListener('scroll', () => onScroll(), passiveListener);
    }

    private updateTriggerVisibility(container: HTMLElement, left: HTMLElement, right: HTMLElement): void {
        const { scrollLeft, scrollWidth, clientWidth } = container;

        left.style.visibility = scrollLeft < 20 ? 'hidden' : 'visible';
        left.style.opacity = scrollLeft < 20 ? '0' : '1';

        right.style.visibility = scrollWidth - clientWidth - 20 < scrollLeft ? 'hidden' : 'visible';
        right.style.opacity = scrollWidth - clientWidth - 20 < scrollLeft ? '0' : '1';
    }

    public destroy(): void {
        // TODO: Implement destroy method
    }
}
