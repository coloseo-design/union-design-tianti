export const cacheFunc = <F extends (...args: any[]) => any>(fn: F): F => {
    const cache = Object.create(null);

    return ((...args) => {
        const arg = JSON.stringify(args);
        const result = cache[arg] ??= fn(...args);

        return result;
    }) as F;
};