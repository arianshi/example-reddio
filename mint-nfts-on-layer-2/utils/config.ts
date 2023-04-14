const isVercel = process.env.IS_VERCEL !== "1";
let reddio;
const initReddio = (client: any) => {
  try {
    // ref: https://github.com/vercel/next.js/discussions/13417
    import("@reddio.com/js").then((module) => {
      reddio = module.Reddio;
      new reddio({
        env: isVercel ? "main" : "test",
        wagmiClient: client,
      });
    });
  } catch (e) {
    console.log("@reddio.com/js loaded error");
  }
};

export { initReddio, reddio, isVercel };
