export function promiseHandler(fn) {
  return new Promise(async (resolve, reject) => {
    try {
      await fn();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
