/** @internal */
export async function promiseToCallback(promise: Promise<any>, callback: (...args: any) => void) {
    const result = await promise;
    return callback(result);
}

/** @internal */
export function callbackToPromise(func: (...args: any[]) => void, args: any[]): Promise<any> {
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
export function checkChrome() {
    return !!globalThis.chrome;
}

/** @internal */
export function checkBrowser() {
    return !!globalThis.browser;
}
