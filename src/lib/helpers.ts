/** @internal */
export function tailCallbackToPromise(func: (...args: any[]) => void, args: any[]): Promise<any> {
    return new Promise((resolve, error) => {
        try {
            func(...args, (...results: any) => {
                resolve(results);
            });
        } catch (e) {
            error(e);
        }
    });
}
/** @internal */
export function checkChrome(selectedRuntime: typeof chrome | typeof browser) {
    return !!globalThis.chrome && selectedRuntime === globalThis.chrome;
}

/** @internal */
export function checkBrowser(selectedRuntime: typeof chrome | typeof browser) {
    return !!globalThis.browser && selectedRuntime === globalThis.browser;
}
