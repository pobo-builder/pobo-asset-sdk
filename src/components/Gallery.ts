import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.es5';
import { GalleryOptions } from '../types';

export class Gallery {
    private readonly defaultOptions: GalleryOptions = {
        selector: '.pb-gallery-trigger',
        plugins: [lgThumbnail],
        download: false,
        thumbnail: true,
        licenseKey: 'C78FC8E5-D47D-4FA4-955A-CD5617B873C8'
    };
    private instance: any;

    constructor(options?: Partial<GalleryOptions>) {
        this.initialize(options);
    }

    private initialize(options?: Partial<GalleryOptions>): void {
        const content = document.getElementById('pobo-all-content');
        if (!content) return;

        this.instance = lightGallery(content, {
            ...this.defaultOptions,
            ...options
        });
    }

    public destroy(): void {
        if (this.instance) {
            this.instance.destroy();
        }
    }
}
