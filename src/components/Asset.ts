export class Asset {
    constructor() {
        this.loadGenericStyles();
    }

    private loadGenericStyles(): void {
        const styleGeneric = document.createElement('link');
        styleGeneric.href = 'https://image.pobo.cz/assets/generic.css';
        styleGeneric.rel = 'stylesheet';
        document.head.appendChild(styleGeneric);
    }

    public destroy(): void {
        const style = document.querySelector('link[href="https://image.pobo.cz/assets/generic.css"]');
        if (style) {
            style.remove();
        }
    }
}
