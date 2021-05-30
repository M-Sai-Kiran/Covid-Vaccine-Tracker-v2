import { useState, useEffect } from "react";

export function useNotification() {
  const [notificationPermisssion, setNotificationPermission] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) =>
        setNotificationPermission(permission === "granted")
      );
    }
  });

  const showNotification = (message) => {
    const notification = new Notification(message);
    notification.onclick = (e) =>
      window.open("https://selfregistration.cowin.gov.in/");
  };

  return { notificationPermisssion, showNotification };
}
