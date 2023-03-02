export const waitSecond = (second: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res("OK");
    }, 1000 * second)
  );
