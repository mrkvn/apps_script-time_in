/**
 * Runs a Google Apps Script function.
 * @param {string} functionName - The name of the Apps Script function to run.
 * @param {any[]} [args=[]] - The arguments to pass to the Apps Script function.
 * @returns {Promise<any>} A promise that resolves with the result of the function.
 */
export default async function runGas(functionName, args = []) {
    return new Promise((resolve, reject) => {
        // @ts-expect-error
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            [functionName](...args);
    });
}
