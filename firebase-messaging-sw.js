importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyBVOPQzsrPnZBKnuQhKOdOFWxNFJh9Ae-A",
  authDomain: "death-note-3ff99.firebaseapp.com",
  projectId: "death-note-3ff99",
  messagingSenderId: "86048543927",
  appId: "1:86048543927:web:31a7b84984a25809066932",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const title = payload.notification.title;

  const options = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  return self.registration.showNotification(title, options);
});
