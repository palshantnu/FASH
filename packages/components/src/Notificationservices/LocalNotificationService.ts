// @ts-nocheck
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

export interface NotifyProps {
    title: string;
    message: string;
    messageId: string;
    data: {
      notification: object | null;
      data: {
        notification_key: string;
      },
      notification_key: string;
    },
    notification: object | null;
  }
  function stripHtmlTags(html: string): string {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
class LocalNotificationService {
    configure = (onOpenNotification: (data: object & string & NotifyProps) => void) => {
        PushNotification.configure({
            onRegister: function (token: string) {
            },
            onNotification: function (notification: (data: object & string & NotifyProps) => void) {
                if (!notification.data) {
                    return;
                }
                notification.userInteraction = true;
                onOpenNotification(notification);
                if (Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },
            // Android only
            senderID: "632996080260",
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
        
        PushNotification.createChannel(
            {
              channelId: "default-channel-id", // (required)
              channelName: "My channel", // (required)
              channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created: string) => {} // (optional) callback returns whether the channel was created, false means it already existed.
          );
    }
    unregister = () => {
        PushNotification.unregister();
    }
    showNotification = (id: number, title: string, message: string, data = {}, options = {}) => {
        const plainTextContent = stripHtmlTags(message); // Remove HTML tags
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* iOS and Android properties */
            ...this.buildIOSNotification(id, title, message, data, options),
            /* iOS and Android Properties */
            channelId: "default-channel-id",
            title: title || '',
            message: plainTextContent || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false // BOOLEAN: If the notification was opened by the user from the notification.
        })
    }
    buildAndroidNotification = (id: number, title: string, message: string, data = {}, options = {}) => {
        const plainTextContent = stripHtmlTags(message); // Remove HTML tags
        return {
            channelId: "default-channel-id",
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || 'ic_launcher',
            smallIcon: options.smallIcon || 'ic_notification',
            bigText: plainTextContent || '',
            vibrate: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high', //(optional) set notification importance, default: high
            data: data,
        }
    }
    buildIOSNotification = (id: number, title: string, message: string, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data,
            }
        }
    }
    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }
}
export default LocalNotificationService;