export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
