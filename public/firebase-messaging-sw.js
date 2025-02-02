importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
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

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
