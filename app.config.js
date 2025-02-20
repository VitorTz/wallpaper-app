export default ({ config }) => {
    return {
      ...config,
      extra: {
        PIXABAY_KEY: process.env.PIXABAY_KEY,
      },
    };
  };
  