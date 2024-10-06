import {
  getApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from "firebase-admin/app";

// Warning: though getRestConfig is only run server side, its return value may be sent to the client
export const getRestConfig = (): {
  apiKey: string;
  domain: string;
} => {
  if (process.env.NODE_ENV === "development" && !process.env.API_KEY) {
    return {
      apiKey: "fake-api-key",
      domain: "http://localhost:9099/identitytoolkit.googleapis.com",
    };
  } else if (!process.env.API_KEY) {
    throw new Error("Missing API_KEY environment variable");
  } else {
    return {
      apiKey: process.env.API_KEY,
      domain: "https://identitytoolkit.googleapis.com",
    };
  }
};

export const initFirebase = () => {
  const service_account = process.env.SERVICE_ACCOUNT ?? "no-id";
  let config;

  // sets the appropriate config for the environment
  try {
    const serviceAccount = JSON.parse(service_account);
    config = {
      credential: serverCert(serviceAccount),
    };
  } catch {
    throw Error("Invalid SERVICE_ACCOUNT environment variable");
  }

  if (getApps().length > 0) {
    return getApps()[0];
  }
  return initializeServerApp(config);
};
