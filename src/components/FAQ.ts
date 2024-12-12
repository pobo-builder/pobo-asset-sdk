export class FAQ {
    private readonly headerClass: string = 'pb-faq__header';

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        Array.from(document.getElementsByClassName(this.headerClass)).forEach((faq: Element) => {
            faq.addEventListener('click', this.handleClick);
        });
    }

    private handleClick = (e: Event): void => {
        e.preventDefault();
        const target = e.currentTarget as Element;
        target.classList.toggle('active');
    };

    public destroy(): void {
        Array.from(document.getElementsByClassName(this.headerClass)).forEach((faq: Element) => {
            faq.removeEventListener('click', this.handleClick);
        });
    }
}
