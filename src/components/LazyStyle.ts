import { getEshopUrl, getCDNUrl } from '../utils/platform';

export class LazyStyle {
    private styleElement: HTMLLinkElement | null = null;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        const styleTemplate = document.createElement('link') as HTMLLinkElement;
        const version = Math.floor(Math.random() * 99999999) as number;
        const urlWithoutProtocol = getEshopUrl().replace(/(^\w+:|^)\/\//, '') as string;

        styleTemplate.href = `${getCDNUrl()}/templates/${urlWithoutProtocol}.css?v=${version}` as string;
        (styleTemplate as any).fetchPriority = 'high' as string;
        styleTemplate.id = 'pobo-template-core' as string;
        styleTemplate.rel = 'stylesheet' as string;

        this.styleElement = styleTemplate as HTMLLinkElement;
        document.head.appendChild(styleTemplate);
    }

    public destroy(): void {
        if (this.styleElement && document.head.contains(this.styleElement)) {
            document.head.removeChild(this.styleElement);
        }
    }
}
