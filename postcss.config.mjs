import px2viewport from "postcss-px-to-viewport-8-plugin";

const config = {
  plugins: [
    "@tailwindcss/postcss",
    px2viewport({
      viewportWidth: 750,
      unitPrecision: 6,
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      mediaQuery: true,
      minPixelValue: 1,
      selectorBlackList: [".ignore-px"],
    }),
  ],
};

export default config;
