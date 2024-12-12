import MiniLazyLoad from 'minilazyload';
import { LazyLoadOptions } from '../types';

export class LazyLoad {
    private readonly defaultOptions: LazyLoadOptions = {
        rootMargin: '50px',
        threshold: 0.5,
        placeholder: 'placeholder.png'
    };
    private instance: any;
    private readonly boundInitialize: () => void;

    constructor(options?: Partial<LazyLoadOptions>) {
        this.boundInitialize = () => this.initialize(options);
        this.initialize(options);
        this.setupEventListeners();
    }

    private initialize(options?: Partial<LazyLoadOptions>): void {
        this.instance = new MiniLazyLoad({ ...this.defaultOptions, ...options }, '.lazyLoad');
    }

    private setupEventListeners(): void {
        document.addEventListener('pobo:reinit:lazyload', this.boundInitialize);
    }

    public destroy(): void {
        document.removeEventListener('pobo:reinit:lazyload', this.boundInitialize);
    }
}
