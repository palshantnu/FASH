import React, {ReactNode } from 'react';
import FCMService from './FCMService';
import LocalNotificationService from './LocalNotificationService';
import { Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import { getStorageData, setStorageData } from '../../../framework/src/Utilities';
import { Props } from '../../../blocks/landingpage/src/LandingPageController';

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
  export interface IosNotification {
    data:
    {
      data:
      { 
        payload: string
      }
    },
    action_name: string;
  }
  export interface AndroidNotification {
    data:
    {
      data:
      { 
        payload:string
      }
    },
    action_name: string;
  }
  interface ParsedPayload {
    data: {
      account_id: number;
      action: string;
      order_id: string
    };
  }
  export interface NotificationType {
    messageId: string;
    title: string;
    message: string;
  }
  let notificationMessageId:string =''
  const requestNotificationPermission = async () => {
    try {
      const deviceAPiLevel = Platform.Version;
      if (Platform.OS === "android" && Number(deviceAPiLevel) >= 33) {
        await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  export const setupNotification = async (navigation: Readonly<Props> & Readonly<{ children?: React.ReactNode; }>) => {
    notificationMessageId=''
    requestNotificationPermission();
    let fcmObj = new FCMService();
    let localNotificationService = new LocalNotificationService();
    localNotificationService.configure((notify: NotifyProps) => {
      onOpenNotification(notify as unknown as AndroidNotification & IosNotification,navigation);
    });
    fcmObj.register(
      (token: string) => onRegister(token),
      (notify: NotifyProps) => onNotification(notify),
      (notify: NotifyProps) => onOpenNotification(notify as unknown as AndroidNotification & IosNotification,navigation)
    );
  }
  export const androidNotofication = async (notify: AndroidNotification, navigation: Readonly<Props> & Readonly<{ children?: React.ReactNode; }>) => {
    const parsedPayload: ParsedPayload = JSON.parse(notify.data.data.payload)
    const action = parsedPayload.data.action;
    await setStorageData("orderId", parsedPayload.data.order_id)
    switch (action) {
      case 'sign_up':
       return navigation.navigation.navigate('LandingPage');
     case 'order_confirm':
       return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'order_dispatched':
       return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'order_placed':
       return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'order_delivered':
        return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'payment_done':
      return navigation.navigation.navigate('OrderManagementBuyerSummary')
      case 'seller_new_order':
        return navigation.navigation.navigate('OrderSummary')
      case 'seller_cancel_order':
        return navigation.navigation.navigate('OrderSummary')
      case 'seller_payment_confirm':
        return navigation.navigation.navigate('OrderSummary')
      case 'seller_product_price':
        return navigation.navigation.navigate('CatalogueSeller')
      case 'seller_store_approved':
        return navigation.navigation.navigate('Stores')
      case 'seller_terms_updates':
        return navigation.navigation.navigate('SellerProfile')
      case 'seller_low_stock':
        return navigation.navigation.navigate('CatalogueSeller')
      case 'stylist_terms_updates':
        return navigation.navigation.navigate('StylistProfile')
      case 'driver_terms_updates':
      return navigation.navigation.navigate('DriverProfile')
      case 'earning_status_updates':
        return navigation.navigation.navigate('LandingPageDriver')
      case 'monthly_deliveries_updates':
        return navigation.navigation.navigate('stylistDashboard')
      case 'product_sourcing_request_by_stylist':
        return navigation.navigation.navigate('StylistCatalogue')
      case 'monthly_orders_report':
        return navigation.navigation.navigate('LandingPage')
      case 'stylist_monthly_orders_report':
        return navigation.navigation.navigate('stylistDashboard')
      case 'buyer_catalogue_price_drop':
        return navigation.navigation.navigate('Catalogue')
      case 'weekly_update_loyalty_points':
        return navigation.navigation.navigate('LandingPage')
      case 'account_password_changed':
        return onNavigateLandingScreen(navigation)
      case 'buyer_requested_stylists':
        return navigation.navigation.navigate('StylistProfile')
      case 'buyer_quoted_for_stylist_items':
        return navigation.navigation.navigate('StylistProfile')
    default: return '';
  }
}
const onNavigateLandingScreen = async (navigation: Readonly<Props> & Readonly<{ children?: React.ReactNode; }>) => {
  const role = await getStorageData("FA_LOGIN_ROLE", false);
  if (role === 1) {
    return navigation.navigation.navigate('LandingPage');
  } else if (role === 2) {
    return navigation.navigation.navigate('SellerDashboard');
  } else if (role === 3) {
    return navigation.navigation.navigate('stylistDashboard');
  } else {
    return navigation.navigation.navigate('LandingPageDriver');
  }

}

  const iosNotofication = async (notify: IosNotification, navigation: Readonly<Props> & Readonly<{ children?: React.ReactNode; }>) => {
    const parsedPayload: ParsedPayload = JSON.parse(notify.data.data.payload)
    const action = parsedPayload.data.action;
    await setStorageData("orderId", parsedPayload.data.order_id)
    switch (action) {
      case 'sign_up':
       return navigation.navigation.navigate('LandingPage');
     case 'order_confirm':
       return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'order_dispatched':
       return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'order_placed':
       return navigation.navigation.navigate('OrderManagementBuyerSummary')
     case 'order_delivered':
        return navigation.navigation.navigate('OrderManagementBuyerSummary') 
     case 'payment_done':
          return navigation.navigation.navigate('OrderManagementBuyerSummary')
      case 'seller_new_order':
        return navigation.navigation.navigate('OrderSummary')
      case 'seller_cancel_order':
        return navigation.navigation.navigate('OrderSummary')
      case 'seller_payment_confirm':
        return navigation.navigation.navigate('OrderSummary')
      case 'seller_product_price':
        return navigation.navigation.navigate('CatalogueSeller')
      case 'seller_store_approved':
        return navigation.navigation.navigate('Stores')
      case 'seller_terms_updates':
        return navigation.navigation.navigate('SellerProfile')
      case 'seller_low_stock':
        return navigation.navigation.navigate('CatalogueSeller')
      case 'stylist_terms_updates':
        return navigation.navigation.navigate('StylistProfile')
      case 'driver_terms_updates':
        return navigation.navigation.navigate('DriverProfile')
      case 'earning_status_updates':
        return navigation.navigation.navigate('LandingPageDriver')
      case 'monthly_deliveries_updates':
        return navigation.navigation.navigate('stylistDashboard')
      case 'product_sourcing_request_by_stylist':
        return navigation.navigation.navigate('StylistCatalogue')
      case 'monthly_orders_report':
        return navigation.navigation.navigate('LandingPage')
      case 'stylist_monthly_orders_report':
        return navigation.navigation.navigate('stylistDashboard')
      case 'buyer_catalogue_price_drop':
        return navigation.navigation.navigate('Catalogue')
      case 'weekly_update_loyalty_points':
        return navigation.navigation.navigate('LandingPage')
      case 'account_password_changed':
        return onNavigateLandingScreen(navigation)
      case 'buyer_requested_stylists':
        return navigation.navigation.navigate('StylistProfile')
      case 'buyer_quoted_for_stylist_items':
        return navigation.navigation.navigate('StylistProfile')
    default: return '';
  }
}

  const onOpenNotification = async (notify: AndroidNotification & IosNotification, navigation: Readonly<Props> & Readonly<{ children?: React.ReactNode; }>) => {
    Platform.OS == "android" ? androidNotofication(notify, navigation) : iosNotofication(notify, navigation)
  }

  const onNotification = (notify: NotificationType) => {
    let localNotificationService = new LocalNotificationService();
    const options = {
      soundName: "default",
      playSound: true,
    };
    let numericStr = notify.messageId.replace(/\D/g, '');
    let seed = parseInt(numericStr, 10);
    const firstDigit = 1664525;
    const secondDigit = 1013904223;
    const powerOfDigit = Math.pow(2, 32);
    let randomSeed = seed;
    function seededRandom() {
      randomSeed = (firstDigit * randomSeed + secondDigit) % powerOfDigit;
      return randomSeed / powerOfDigit;
    }
    let randomNumber = seededRandom();
    if (notify.title) {
      if (notificationMessageId !== notify.messageId) {
        localNotificationService.showNotification(
          randomNumber,
          notify.title,
          notify.message,
          notify,
          options
        );
        notificationMessageId = notify.messageId;
      }
    }
  }
  const onRegister = async (token: string) => {
    await setStorageData("fcm_push_token", token);
  }