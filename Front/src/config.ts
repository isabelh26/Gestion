interface RuntimeEnv {
  VITE_API_URL: string;
}

function getRuntimeEnv(): RuntimeEnv {
  if (!window.__ENV__) {
    throw new Error("Runtime environment variables not found.");
  }

  if (!window.__ENV__.VITE_API_URL) {
    throw new Error("VITE_API_URL is not defined.");
  }

  return window.__ENV__;
}

const env = getRuntimeEnv();

export const API_URL: string = env.VITE_API_URL;