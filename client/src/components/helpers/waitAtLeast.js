// avoiding loading flickering
// https://blog.bitsrc.io/a-brief-history-of-flickering-spinners-c9eecd6053

// todo dry up this and fetching funcs
export default function waitAtLeast(promise, time = 400) {
  const promiseTimeout = new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  const promiseCombined = Promise.all([promise, promiseTimeout]);
  return promiseCombined.then((values) => values[0]);
};
