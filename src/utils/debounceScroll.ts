export function debounceScroll(fn: () => void, delay: number): () => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(), delay);
    };
}
