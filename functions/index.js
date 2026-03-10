const { onValueCreated } = require("firebase-functions/v2/database");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendMessageNotification = onValueCreated(
  {
    ref: "/messages/{msgId}",
    region: "us-central1",
    instance: "death-note-3ff99-default-rtdb",
  },
  async (event) => {
    const msg = event.data.val();

    const payload = {
      notification: {
        title: msg.name + " says:",
        body: msg.text || msg.fileName || "Sent a file",
        icon: "/icon.png",
      },
    };

    const tokensSnap = await admin.database().ref("pushTokens").once("value");

    const tokens = [];

    tokensSnap.forEach((child) => {
      const data = child.val();

      if (data.name !== msg.name) {
        tokens.push(data.token);
      }
    });
    
    if (tokens.length === 0) return;

    await admin.messaging().sendToDevice(tokens, payload);
  },
);
