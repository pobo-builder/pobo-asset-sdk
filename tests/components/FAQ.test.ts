import { FAQ } from '../../src/components/FAQ';
describe('FAQ Component', () => {
    let faqInstance: FAQ;
    let faqElement: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = '';
        faqElement = document.createElement('div');
        faqElement.className = 'pb-faq__header';
        document.body.appendChild(faqElement);
        faqInstance = new FAQ();
    });

    afterEach(() => {
        faqInstance.destroy();
        document.body.innerHTML = '';
    });

    test('should toggle active class on click', () => {
        expect(faqElement.classList.contains('active')).toBeFalsy();
        faqElement.click();
        expect(faqElement.classList.contains('active')).toBeTruthy();
        faqElement.click();
        expect(faqElement.classList.contains('active')).toBeFalsy();
    });
});