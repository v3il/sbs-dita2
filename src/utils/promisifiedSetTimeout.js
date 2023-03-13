export const promisifiedSetTimeout = (delay) => new Promise((resolve) => {
    setTimeout(resolve, delay);
});
