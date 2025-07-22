// @ts-nocheck
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import StorageProvider from '../../../framework/src/StorageProvider';
type NotificationData = object & string & NotifyProps;
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
class FCMService {
    register = (onRegister: (data: string) => {}, onNotification: (data: NotificationData) => void, onOpenNotification: (data: object & string & NotifyProps) => void) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }
    
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister: (data: string) => {}) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken(onRegister);
                } else {
                    // User doesn't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {

            })
    }

    getToken = (onRegister: (data: string) => {}) => {
        messaging().getToken()
            .then(async fcmToken => {
                if (fcmToken) {
                    await StorageProvider.set('USER_FCM_TOKEN', fcmToken);
                    onRegister(fcmToken);
                }
            }).catch(error => {

            })
    }

    requestPermission = (onRegister: (data: string) => {}) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister);
            }).catch(error => {

            })
    }
    
    deleteToken = () => {
        messaging().deleteToken()
        .then(() => {
        }).catch((error: string) => {
            })
    }

    createNotificationListeners = (onRegister: (data: string) => {}, onNotification: (data: NotificationData) => void, onOpenNotification: (data: object & string & NotifyProps) => void) => {
        
        // When the application is running, but in the background
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                if (remoteMessage) {
                    const notification = remoteMessage?.notification
                    if (!remoteMessage.data) {
                        onOpenNotification(notification);
                        return;
                    }
                    notification.userInteraction = true;
                    let notificationData;
                        notificationData = remoteMessage.data;
                    onOpenNotification(notificationData);
                }
            });
        // When the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    if (!remoteMessage.data) {
                        onOpenNotification(notification);
                        return;
                    }
                    notification.userInteraction = true;
                    let notificationData;
                        notificationData = remoteMessage.data;
                    onOpenNotification(notificationData);
                }
            });
        // Foreground state messages
        messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            if (remoteMessage) {
                if(remoteMessage.notification){
                let notification = null;
                notification = remoteMessage;
                notification['title'] = remoteMessage.notification.title;
                notification['message'] = remoteMessage.notification.body;
                onNotification(notification);
                }
                else if (remoteMessage.data) {
                    let notification = null;
                    notification = remoteMessage;
                    let chatTitle = remoteMessage.data.message.split(":");
                    notification['title'] = chatTitle[0];
                    notification['message'] = chatTitle[1];
                    onNotification(notification);
                }
            }
        });
        // Triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            onRegister(fcmToken);
        });
    }
}
export default FCMService;