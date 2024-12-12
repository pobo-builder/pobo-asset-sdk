export interface LazyLoadOptions {
    rootMargin: string;
    threshold: number;
    placeholder: string;
}

export interface CarouselOptions {
    containerClass?: string;
    innerClass?: string;
    triggerLeftClass?: string;
    triggerRightClass?: string;
}

export interface GalleryOptions {
    selector?: string;
    plugins?: any[];
    download?: boolean;
    thumbnail?: boolean;
    licenseKey?: string;
}
