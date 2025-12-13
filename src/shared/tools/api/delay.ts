const setDelay = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

export { setDelay };
