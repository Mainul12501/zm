import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD0vLDbL4OXixX9E2Wt6VQebAADJ_-dF2U",
  authDomain: "secret-lambda-403915.firebaseapp.com",
  databaseURL: "https://secret-lambda-403915-default-rtdb.firebaseio.com",
  projectId: "secret-lambda-403915",
  storageBucket: "secret-lambda-403915.firebasestorage.app",
  messagingSenderId: "215254213048",
  appId: "1:215254213048:web:763048a0bec17aab556f4d",
  measurementId: "G-P3PVPSEPYJ",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BNOeRP8qpGtcEByu3TTemTNaasLz3WCHtXBaxklUt2lIO-q7HjNxyVWwJVKCCp0-Nuuin2CgNFqiUoHe4ilAYZE",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
