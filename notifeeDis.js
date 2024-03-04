import notifee, { AndroidImportance } from '@notifee/react-native';

export const showNotification = async data => {
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default2',
    name: 'Default Channel2',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.notification.title,
    body: data.notification.body,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
};
