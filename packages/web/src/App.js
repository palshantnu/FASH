// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import Customisableuserprofiles2 from "../../blocks/customisableuserprofiles2/src/Customisableuserprofiles2";
import Creditdebitcardpayments from "../../blocks/creditdebitcardpayments/src/Creditdebitcardpayments";
import Tasks from "../../blocks/tasks/src/Tasks";
import TaskList from "../../blocks/tasks/src/TaskList";
import Task from "../../blocks/tasks/src/Task";
import Productdescription3 from "../../blocks/productdescription3/src/Productdescription3";
import Splashscreen from "../../blocks/splashscreen/src/Splashscreen";
import OrderManagement from "../../blocks/ordermanagement/src/OrderManagement";
import ShoppingCartOrders from "../../blocks/shoppingcart/src/ShoppingCartOrders";
import AddShoppingCartOrderItem from "../../blocks/shoppingcart/src/AddShoppingCartOrderItem";
import Notificationsettings from "../../blocks/notificationsettings/src/Notificationsettings";
import NavigationMenu from "../../blocks/navigationmenu/src/NavigationMenu";
import PhoneNumberInput from "../../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../../blocks/mobile-account-registration/src/AdditionalDetailForm";
import Customform from "../../blocks/customform/src/Customform";
import AdvancedSearch from "../../blocks/advancedsearch/src/AdvancedSearch";
import Emailnotifications2 from "../../blocks/emailnotifications2/src/Emailnotifications2";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import Applepayintegration2 from "../../blocks/applepayintegration2/src/Applepayintegration2";
import Collecttransactionfees from "../../blocks/collecttransactionfees/src/Collecttransactionfees";
import Contentmanagement3 from "../../blocks/contentmanagement3/src/Contentmanagement3";
import Admanager from "../../blocks/admanager/src/Admanager";
import Googleadsenseintegration from "../../blocks/googleadsenseintegration/src/Googleadsenseintegration";
import VisualAnalytics from "../../blocks/visualanalytics/src/VisualAnalytics";
import Savedcards from "../../blocks/savedcards/src/Savedcards";
import Adminconsole2 from "../../blocks/adminconsole2/src/Adminconsole2";
import Notifications from "../../blocks/notifications/src/Notifications";
import Cfchatbot2 from "../../blocks/cfchatbot2/src/Cfchatbot2";
import Storecredits2 from "../../blocks/storecredits2/src/Storecredits2";
import Refundmanagement from "../../blocks/refundmanagement/src/Refundmanagement";
import Inapppurchasing from "../../blocks/inapppurchasing/src/Inapppurchasing";
import ApiIntegration from "../../blocks/apiintegration/src/ApiIntegration";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import Catalogue from "../../blocks/catalogue/src/Catalogue";
import Shippingaddressvalidation2 from "../../blocks/shippingaddressvalidation2/src/Shippingaddressvalidation2";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import AccountGroups from "../../blocks/accountgroups/src/AccountGroups";
import Scheduling from "../../blocks/scheduling/src/Scheduling";
import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import Settings2 from "../../blocks/settings2/src/Settings2";
import Rolesandpermissions from "../../blocks/rolesandpermissions/src/Rolesandpermissions";
import Applelogin2 from "../../blocks/applelogin2/src/Applelogin2";
import Linkshare from "../../blocks/linkshare/src/Linkshare";
import Addresses from "../../blocks/addressmanagement/src/Addresses";
import AddAddress from "../../blocks/addressmanagement/src/AddAddress";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Deliveryestimator from "../../blocks/deliveryestimator/src/Deliveryestimator";
import Wishlist2 from "../../blocks/wishlist2/src/Wishlist2";
import Reviews from "../../blocks/reviews/src/Reviews";
import AddReview from "../../blocks/reviews/src/AddReview";
import SocialMediaAccountRegistrationScreen from "../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import EmailAccountLoginBlock from "../../blocks/email-account-login/src/EmailAccountLoginBlock";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import Dashboard from "../../blocks/dashboard/src/Dashboard";
import Chat from "../../blocks/chat/src/Chat";
import ChatView from "../../blocks/chat/src/ChatView";
import StripePayments from "../../blocks/stripepayments/src/StripePayments";
import Expressdelivery from "../../blocks/expressdelivery/src/Expressdelivery";
import TermsConditions from "../../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../../blocks/termsconditions/src/TermsConditionsUsers";
import Inventorymanagement2 from "../../blocks/inventorymanagement2/src/Inventorymanagement2";
import BulkUploading from "../../blocks/bulkuploading/src/BulkUploading";
import Trending2 from "../../blocks/trending2/src/Trending2";
import MobileAccountLoginBlock from "../../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import Uploadmedia3 from "../../blocks/uploadmedia3/src/Uploadmedia3";
import Upvotedownvote from "../../blocks/upvotedownvote/src/Upvotedownvote";
import LandingPage from "../../blocks/landingpage/src/LandingPage";
import EmailAccountRegistration from "../../blocks/email-account-registration/src/EmailAccountRegistration";
import Analytics from "../../blocks/analytics/src/Analytics";
import PhotoLibrary from "../../blocks/photolibrary/src/PhotoLibrary";
import Loyaltysystem from "../../blocks/loyaltysystem/src/Loyaltysystem";
import Categoriessubcategories from "../../blocks/categoriessubcategories/src/Categoriessubcategories";



const routeMap = {
Customisableuserprofiles2:{
 component:Customisableuserprofiles2,
path:"/Customisableuserprofiles2"},
Creditdebitcardpayments:{
 component:Creditdebitcardpayments,
path:"/Creditdebitcardpayments"},
Tasks:{
 component:Tasks,
path:"/Tasks"},
TaskList:{
 component:TaskList,
path:"/TaskList"},
Task:{
 component:Task,
path:"/Task"},
Productdescription3:{
 component:Productdescription3,
path:"/Productdescription3"},
Splashscreen:{
 component:Splashscreen,
path:"/Splashscreen"},
OrderManagement:{
 component:OrderManagement,
path:"/OrderManagement"},
ShoppingCartOrders:{
 component:ShoppingCartOrders,
path:"/ShoppingCartOrders"},
AddShoppingCartOrderItem:{
 component:AddShoppingCartOrderItem,
path:"/AddShoppingCartOrderItem"},
Notificationsettings:{
 component:Notificationsettings,
path:"/Notificationsettings"},
NavigationMenu:{
 component:NavigationMenu,
path:"/NavigationMenu"},
PhoneNumberInput:{
 component:PhoneNumberInput,
path:"/PhoneNumberInput"},
AdditionalDetailForm:{
 component:AdditionalDetailForm,
path:"/AdditionalDetailForm"},
Customform:{
 component:Customform,
path:"/Customform"},
AdvancedSearch:{
 component:AdvancedSearch,
path:"/AdvancedSearch"},
Emailnotifications2:{
 component:Emailnotifications2,
path:"/Emailnotifications2"},
OTPInputAuth:{
 component:OTPInputAuth,
path:"/OTPInputAuth"},
Applepayintegration2:{
 component:Applepayintegration2,
path:"/Applepayintegration2"},
Collecttransactionfees:{
 component:Collecttransactionfees,
path:"/Collecttransactionfees"},
Contentmanagement3:{
 component:Contentmanagement3,
path:"/Contentmanagement3"},
Admanager:{
 component:Admanager,
path:"/Admanager"},
Googleadsenseintegration:{
 component:Googleadsenseintegration,
path:"/Googleadsenseintegration"},
VisualAnalytics:{
 component:VisualAnalytics,
path:"/VisualAnalytics"},
Savedcards:{
 component:Savedcards,
path:"/Savedcards"},
Adminconsole2:{
 component:Adminconsole2,
path:"/Adminconsole2"},
Notifications:{
 component:Notifications,
path:"/Notifications"},
Cfchatbot2:{
 component:Cfchatbot2,
path:"/Cfchatbot2"},
Storecredits2:{
 component:Storecredits2,
path:"/Storecredits2"},
Refundmanagement:{
 component:Refundmanagement,
path:"/Refundmanagement"},
Inapppurchasing:{
 component:Inapppurchasing,
path:"/Inapppurchasing"},
ApiIntegration:{
 component:ApiIntegration,
path:"/ApiIntegration"},
CountryCodeSelector:{
 component:CountryCodeSelector,
path:"/CountryCodeSelector"},
Catalogue:{
 component:Catalogue,
path:"/Catalogue"},
Shippingaddressvalidation2:{
 component:Shippingaddressvalidation2,
path:"/Shippingaddressvalidation2"},
Pushnotifications:{
 component:Pushnotifications,
path:"/Pushnotifications"},
AccountGroups:{
 component:AccountGroups,
path:"/AccountGroups"},
Scheduling:{
 component:Scheduling,
path:"/Scheduling"},
Contactus:{
 component:Contactus,
path:"/Contactus"},
AddContactus:{
 component:AddContactus,
path:"/AddContactus"},
Settings2:{
 component:Settings2,
path:"/Settings2"},
Rolesandpermissions:{
 component:Rolesandpermissions,
path:"/Rolesandpermissions"},
Applelogin2:{
 component:Applelogin2,
path:"/Applelogin2"},
Linkshare:{
 component:Linkshare,
path:"/Linkshare"},
Addresses:{
 component:Addresses,
path:"/Addresses"},
AddAddress:{
 component:AddAddress,
path:"/AddAddress"},
SocialMediaAccountLoginScreen:{
 component:SocialMediaAccountLoginScreen,
path:"/SocialMediaAccountLoginScreen"},
Deliveryestimator:{
 component:Deliveryestimator,
path:"/Deliveryestimator"},
Wishlist2:{
 component:Wishlist2,
path:"/Wishlist2"},
Reviews:{
 component:Reviews,
path:"/Reviews"},
AddReview:{
 component:AddReview,
path:"/AddReview"},
SocialMediaAccountRegistrationScreen:{
 component:SocialMediaAccountRegistrationScreen,
path:"/SocialMediaAccountRegistrationScreen"},
EmailAccountLoginBlock:{
 component:EmailAccountLoginBlock,
path:"/EmailAccountLoginBlock"},
ForgotPassword:{
 component:ForgotPassword,
path:"/ForgotPassword"},
ForgotPasswordOTP:{
 component:ForgotPasswordOTP,
path:"/ForgotPasswordOTP"},
NewPassword:{
 component:NewPassword,
path:"/NewPassword"},
Dashboard:{
 component:Dashboard,
path:"/Dashboard"},
Chat:{
 component:Chat,
path:"/Chat"},
ChatView:{
 component:ChatView,
path:"/ChatView"},
StripePayments:{
 component:StripePayments,
path:"/StripePayments"},
Expressdelivery:{
 component:Expressdelivery,
path:"/Expressdelivery"},
TermsConditions:{
 component:TermsConditions,
path:"/TermsConditions"},
TermsConditionsDetail:{
 component:TermsConditionsDetail,
path:"/TermsConditionsDetail"},
TermsConditionsUsers:{
 component:TermsConditionsUsers,
path:"/TermsConditionsUsers"},
Inventorymanagement2:{
 component:Inventorymanagement2,
path:"/Inventorymanagement2"},
BulkUploading:{
 component:BulkUploading,
path:"/BulkUploading"},
Trending2:{
 component:Trending2,
path:"/Trending2"},
MobileAccountLoginBlock:{
 component:MobileAccountLoginBlock,
path:"/MobileAccountLoginBlock"},
Uploadmedia3:{
 component:Uploadmedia3,
path:"/Uploadmedia3"},
Upvotedownvote:{
 component:Upvotedownvote,
path:"/Upvotedownvote"},
LandingPage:{
 component:LandingPage,
path:"/LandingPage"},
EmailAccountRegistration:{
 component:EmailAccountRegistration,
path:"/EmailAccountRegistration"},
Analytics:{
 component:Analytics,
path:"/Analytics"},
PhotoLibrary:{
 component:PhotoLibrary,
path:"/PhotoLibrary"},
Loyaltysystem:{
 component:Loyaltysystem,
path:"/Loyaltysystem"},
Categoriessubcategories:{
 component:Categoriessubcategories,
path:"/Categoriessubcategories"},

  Home: {
component:TermsConditions,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  }

};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {
   
  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
    
    return (
      <View style={{ height: '100vh', width: '100vw' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
