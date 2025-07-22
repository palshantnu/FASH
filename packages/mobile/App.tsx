import React, { useEffect, useRef, useState } from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation';

import {
  Image,
  Text,
  View,
  Dimensions,
  StatusBar,
  Platform,
  StyleSheet,
  Linking,
  AppState,
  Alert,
} from 'react-native';
import {
  homeActive,
  homeInactive,
  stylishInactive,
  stylistActive,
  wishlistActive,
  wishlistInactive,
  profileActive,
  profileInactive,
  categoryActive,
  categoryInactive,
} from '../blocks/categoriessubcategories/src/assets';
import {
  dashboardActive,
  dashboardInactive,
  storesActive,
  storesInactive,
  ordersActive,
  ordersInactive,
  clientActive,
  clientInactive,
} from '../blocks/dashboard/src/assets';

import {
  dollarCircleInactive,
  dollarCircleActive,
  contactInactive,
  contactActive,
} from '../blocks/landingpage/src/assets';

import CustomAlert, { showAlert } from '../components/src/CustomAlert';
import { getStorageData, setStorageData } from 'framework/src/Utilities';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FlashMessage from 'react-native-flash-message';
import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';
import Customisableuserprofiles2 from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2';
import Customisableuserprofiles2Faq from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2Faq';
import Customisableuserprofiles2sellerprofile from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2sellerprofile';
import Customisableuserprofiles2sellerprofilenotification from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2sellerprofilenotification';
import Customisableuserprofiles2selleradminrequest from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2selleradminrequest';
import Customisableuserprofiles2driverprofile from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2driverprofile';
import Customisableuserprofiles2styl from '../blocks/customisableuserprofiles2/src/Customisableuserprofiles2styl';
import Creditdebitcardpayments from '../blocks/creditdebitcardpayments/src/Creditdebitcardpayments';
import Tasks from '../blocks/tasks/src/Tasks';
import TaskList from '../blocks/tasks/src/TaskList';
import Task from '../blocks/tasks/src/Task';
import Productdescription3 from '../blocks/productdescription3/src/Productdescription3';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import OrderManagement from '../blocks/ordermanagement/src/OrderManagement';
import OrderManagementBuyerOrderView from '../blocks/ordermanagement/src/OrderManagementBuyerOrderView';
import OrderManagementBuyerAllOrder from '../blocks/ordermanagement/src/OrderManagementBuyerAllOrder';
import OrderManagementBuyerSummary from '../blocks/ordermanagement/src/OrderManagementBuyerSummary';
import OrderManagementBuyerOrderStatus from '../blocks/ordermanagement/src/OrderManagementBuyerOrderStatus';
import OrderManagementBuyerConfirmation from '../blocks/ordermanagement/src/OrderManagementBuyerConfirmation';
import ShoppingCartOrders from '../blocks/shoppingcart/src/ShoppingCartOrders';
import AddShoppingCartOrderItem from '../blocks/shoppingcart/src/AddShoppingCartOrderItem';
import Notificationsettings from '../blocks/notificationsettings/src/Notificationsettings';
import NotificationsettingsStylist from '../blocks/notificationsettings/src/NotificationsettingsStylist';
import NavigationMenu from '../blocks/navigationmenu/src/NavigationMenu';
import PhoneNumberInput from '../blocks/mobile-account-registration/src/PhoneNumberInput';
import AdditionalDetailForm from '../blocks/mobile-account-registration/src/AdditionalDetailForm';
import Customform from '../blocks/customform/src/Customform';
import CustomformCreateStoreUpload from '../blocks/customform/src/CustomformCreateStoreUpload';
import CustomformCreateStoreAddress from '../blocks/customform/src/CustomformCreateStoreAddress';
import CustomformCreateStoreTiming from '../blocks/customform/src/CustomformCreateStoreTiming';
import CustomformMap from '../blocks/customform/src/CustomformMap';
import CustomformStoreShow from '../blocks/customform/src/CustomformStoreShow';
import CustomformCreateUploadDocument from '../blocks/customform/src/CustomformCreateUploadDocument';
import CustomformConfirmation from '../blocks/customform/src/CustomformConfirmation';
import CustomformCreateManageTiming from '../blocks/customform/src/CustomformCreateManageTiming';
import CustomformEditStoreDetails from '../blocks/customform/src/CustomformEditStoreDetails';
import CustomformDriverProfilePhoto from '../blocks/customform/src/CustomformDriverProfilePhoto';
import CustomformDriverDocument from '../blocks/customform/src/CustomformDriverDocument';
import CustomformDriverDocumentUpload from '../blocks/customform/src/CustomformDriverDocumentUpload';
import CustomformBuyerfavStylist from '../blocks/customform/src/CustomformBuyerfavStylist';
import AdvancedSearch from '../blocks/advancedsearch/src/AdvancedSearch';
import AdvancesSearchFilterBuyer from '../blocks/advancedsearch/src/AdvancesSearchFilterBuyer';
import Emailnotifications2 from '../blocks/emailnotifications2/src/Emailnotifications2';
import Promocodes from '../blocks/promocodes/src/Promocodes';
import CreateOffer from '../blocks/promocodes/src/CreateOffer';
import CreateNewOffer from '../blocks/promocodes/src/CreateNewOffer';
import VerifyAccount from '../blocks/promocodes/src/VerifyAccount';
import PromocodeDetails from '../blocks/promocodes/src/PromocodeDetails';
import OTPInputAuth from '../blocks/otp-input-confirmation/src/OTPInputAuth';
import PhoneVerification from '../blocks/otp-input-confirmation/src/PhoneVerification';
import Applepayintegration2 from '../blocks/applepayintegration2/src/Applepayintegration2';
import Collecttransactionfees from '../blocks/collecttransactionfees/src/Collecttransactionfees';
import Contentmanagement3 from '../blocks/contentmanagement3/src/Contentmanagement3';
import Admanager from '../blocks/admanager/src/Admanager';
import Googleadsenseintegration from '../blocks/googleadsenseintegration/src/Googleadsenseintegration';
import VisualAnalytics from '../blocks/visualanalytics/src/VisualAnalytics';
import Savedcards from '../blocks/savedcards/src/Savedcards';
import Adminconsole2 from '../blocks/adminconsole2/src/Adminconsole2';
import Notifications from '../blocks/notifications/src/Notifications';
import NotificationsBuyer from '../blocks/notifications/src/NotificationsBuyer';
import Cfchatbot2 from '../blocks/cfchatbot2/src/Cfchatbot2';
import Storecredits2 from '../blocks/storecredits2/src/Storecredits2';
import Refundmanagement from '../blocks/refundmanagement/src/Refundmanagement';
import Inapppurchasing from '../blocks/inapppurchasing/src/Inapppurchasing';
import ApiIntegration from '../blocks/apiintegration/src/ApiIntegration';
import CountryCodeSelector from '../blocks/country-code-selector/src/CountryCodeSelector';
import CountryCodeSelectorTable from '../blocks/country-code-selector/src/CountryCodeSelectorTable';
import Catalogue from '../blocks/catalogue/src/Catalogue';
import Shippingaddressvalidation2 from '../blocks/shippingaddressvalidation2/src/Shippingaddressvalidation2';
import Pushnotifications from '../blocks/pushnotifications/src/Pushnotifications';
import AccountGroups from '../blocks/accountgroups/src/AccountGroups';
import Scheduling from '../blocks/scheduling/src/Scheduling';
import Contactus from '../blocks/contactus/src/Contactus';
import ContactUsSupport from '../blocks/contactus/src/ContactUsSupport';
import ContactUsAddContact from '../blocks/contactus/src/ContactUsAddContact';
import AddContactus from '../blocks/contactus/src/AddContactus';
import ContactusDriver from '../blocks/contactus/src/ContactusDriver';
import ContactUsSupportDriver from '../blocks/contactus/src/ContactUsSupportDriver';
import ContactUsAddContactDriver from '../blocks/contactus/src/ContactUsAddContactDriver';
import Settings2 from '../blocks/settings2/src/Settings2';
import Settings2Language from '../blocks/settings2/src/Settings2Language';
import Rolesandpermissions from '../blocks/rolesandpermissions/src/Rolesandpermissions';
import Applelogin2 from '../blocks/applelogin2/src/Applelogin2';
import Linkshare from '../blocks/linkshare/src/Linkshare';
import Addresses from '../blocks/addressmanagement/src/Addresses';
import AddAddress from '../blocks/addressmanagement/src/AddAddress';
import AddressEditDriver from '../blocks/addressmanagement/src/AddressEditDriver';
// import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Deliveryestimator from '../blocks/deliveryestimator/src/Deliveryestimator';
import Wishlist2 from '../blocks/wishlist2/src/Wishlist2';
import ExploreWishlist from '../blocks/wishlist2/src/ExploreWishlist';
import Reviews from '../blocks/reviews/src/Reviews';
import AddReview from '../blocks/reviews/src/AddReview';
// import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import SocialMediaAccountPhoneScreen from '../blocks/social-media-account-registration/src/SocialMediaAccountPhoneScreen';
import SocialMediaAccountOtpVerification from '../blocks/social-media-account-registration/src/SocialMediaAccountOtpVerification';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../blocks/forgot-password/src/NewPassword';
import Dashboard from '../blocks/dashboard/src/Dashboard';
import DashboardSelectStore from '../blocks/dashboard/src/DashboardSelectStore';
import DashboardSpecificStore from '../blocks/dashboard/src/DashboardSpecificStore';
import Chat from '../blocks/chat/src/Chat';
import ChatView from '../blocks/chat/src/ChatView';
import PaymentRequest from '../blocks/chat/src/PaymentRequest'
import StripePayments from '../blocks/stripepayments/src/StripePayments';
import Expressdelivery from '../blocks/expressdelivery/src/Expressdelivery';
import TermsConditions from '../blocks/termsconditions/src/TermsConditions';
import TermsConditionsDetail from '../blocks/termsconditions/src/TermsConditionsDetail';
import TermsConditionsUsers from '../blocks/termsconditions/src/TermsConditionsUsers';
import TermsAndConditionsPrivacy from '../blocks/termsconditions/src/TermsAndConditionsPrivacy';
import Inventorymanagement2 from '../blocks/inventorymanagement2/src/Inventorymanagement2';
import BulkUploading from '../blocks/bulkuploading/src/BulkUploading';
import Trending2 from '../blocks/trending2/src/Trending2';
import MobileAccountLoginBlock from '../blocks/mobile-account-login/src/MobileAccountLoginBlock';
import Uploadmedia3 from '../blocks/uploadmedia3/src/Uploadmedia3';
import Upvotedownvote from '../blocks/upvotedownvote/src/Upvotedownvote';
import LandingPage from '../blocks/landingpage/src/LandingPage';
import LandingPageDriver from '../blocks/landingpage/src/LandingPageDriver';
import EmailAccountRegistration from '../blocks/email-account-registration/src/EmailAccountRegistration';
import Analytics from '../blocks/analytics/src/Analytics';
import AnalyticsDriverEarning from '../blocks/analytics/src/AnalyticsDriverEarning';
import AnalyticsInsightsSeller from '../blocks/analytics/src/AnalyticsInsightsSeller';
import AnalyticsSalesRevenueSeller from '../blocks/analytics/src/AnalyticsSalesRevenueSeller';
import AnalyticsSalesGrowthReportSeller from '../blocks/analytics/src/AnalyticsSalesGrowthReportSeller';
import AnalyticsSalesVolume from '../blocks/analytics/src/AnalyticsSalesVolume';
import AnalyticsSelectStore from '../blocks/analytics/src/AnalyticsSelectStore';
import AnalyticsSelectProduct from '../blocks/analytics/src/AnalyticsSelectProduct';
import PhotoLibrary from '../blocks/photolibrary/src/PhotoLibrary';
import PhotoLibraryEditPortfolioDetails from '../blocks/photolibrary/src/PhotoLibraryEditPortfolioDetails'
import Loyaltysystem from '../blocks/loyaltysystem/src/Loyaltysystem';
import RedeemScreen from '../blocks/loyaltysystem/src/RedeemScreen';
import LoyaltyConfirmation from '../blocks/loyaltysystem/src/LoyaltyConfirmation';
import LoyaltyPoint from '../blocks/loyaltysystem/src/LoyaltyPoint';
import LoyaltyRedeem from '../blocks/loyaltysystem/src/LoyaltyRedeem';
import Categoriessubcategories from '../blocks/categoriessubcategories/src/Categoriessubcategories';
import Categories from '../blocks/categoriessubcategories/src/Categories';
import ProductSourcingOrders from '../blocks/ordermanagement/src/ProductSourcingOrders';
import CategoriesCatalogue from '../blocks/categoriessubcategories/src/CategoriesCatalogue';
import CategoriesSubCate from '../blocks/categoriessubcategories/src/CategoriesSubCate';
import DetailedProductSourcingOrder from '../blocks/ordermanagement/src/DetailedProductSourcingOrder';
import ProductSourcingOrderDetails from '../blocks/customform/src/ProductSourcingOrderDetails';

console.disableYellowBox = true;

//==================New code==========================
import Splashscreen2 from '../blocks/splashscreen/src//SplashScreen2';
import LoginOptionsScreen from '../blocks/splashscreen/src/LoginOptionsScreen';
import OnBoardingScreen from '../blocks/splashscreen/src/OnBoardingScreen';
import SignupScreen from '../blocks/email-account-registration/src/SignupScreen';
import VeriftAccount from '../blocks/email-account-registration/src/VerifyAccount';
import ResetPassword from '../blocks/forgot-password/src/ResetPassword';
import ResetPasswordOTP from '../blocks/forgot-password/src/ResetPasswordOTP';
import ResetNewPasswoord from '../blocks/forgot-password/src/ResetNewPassword';
import ProfileScreen from '../blocks/settings2/src/ProfileScreen';
import ReturnPolicy from '../blocks/termsconditions/src/ReturnPolicy';
import ShippingPolicy from '../blocks/termsconditions/src/shippingPolicy';
import TermsConditionsDriverPolicy from '../blocks/termsconditions/src/TermsConditionsDriverPolicy';
import StoreProfile from '../blocks/productdescription3/src/StoreProfile';
import StoreDetailsScreen from '../blocks/productdescription3/src/StoreDetailsScreen';
import VariantImages from '../blocks/catalogue/src/VariantImages';
import Varients from '../blocks/catalogue/src/Varients';
import YetToBeDeveloped from '../blocks/email-account-login/src/YetToBeDeveloped';
import AddProduct from '../blocks/catalogue/src/AddProduct';
import CatalogueSeller from '../blocks/catalogue/src/CatalogueSeller';
import PairedProducts from '../blocks/productdescription3/src/PairedProductsScreen';
import SellerDashboard from '../blocks/dashboard/src/SellerDashboard';
import ProductdescriptionSeller from '../blocks/productdescription3/src/ProductdescriptionSeller';
import MyStoresList from '../blocks/customform/src/MyStoresList';
import MyStoreDetails from '../blocks/productdescription3/src/MyStoreDetailsScreen';
import AssignStore from '../blocks/productdescription3/src/AssignStore';
import EditProduct from '../blocks/catalogue/src/EditProduct';
import SelectStoreProducts from '../blocks/inventorymanagement2/src/SelectStoreProducts';
import UploadCSV from '../blocks/inventorymanagement2/src/UploadCSV';
import AssignStores from '../blocks/inventorymanagement2/src/AssignStores';
import UpdateInventory from '../blocks/inventorymanagement2/src/UpdateInventoryScreen';
import UpdateInventoryFilter from '../blocks/inventorymanagement2/src/UpdateInventoryFilter';
import DownloadTemplates from '../blocks/inventorymanagement2/src/DownloadTemplates';
import SetPricesScreen from '../blocks/inventorymanagement2/src/SetPricesScreen';
import PairItWith from '../blocks/inventorymanagement2/src/PairItWith';
import PairItWithDescription from '../blocks/inventorymanagement2/src/PairItWithDescription';
import OrderSummary from '../blocks/ordermanagement/src/OrderSummary';
import Checkout from '../blocks/shoppingcart/src/Checkout';
import AddCard from '../blocks/savedcards/src/AddCard';
import PaymentMethods from '../blocks/savedcards/src/PaymentMethods';
import PaymentSuccess from '../blocks/shoppingcart/src/PaymentSuccess';
import RejectOrder from '../blocks/ordermanagement/src/RejectOrder';
import AcceptOrder from '../blocks/ordermanagement/src/AcceptOrder';
import TapPaymentsIntegration from '../blocks/tappaymentsintegration/src/Tappaymentsintegration';
import OrderDetailsSeller from '../blocks/ordermanagement/src/OrderDetailsSeller';
import TapPaymentsWebview from '../blocks/tappaymentsintegration/src/TapPaymentsWebview';
import TappaymentsBuyerHistory from '../blocks/tappaymentsintegration/src/TappaymentsBuyerHistory';
import TappaymentsPaymentDetail from '../blocks/tappaymentsintegration/src/TappaymentsPaymentDetail';
import TappaymentsAddBank from '../blocks/tappaymentsintegration/src/TappaymentsAddBank';
import TappaymentsDriverBankDetail from '../blocks/tappaymentsintegration/src/TappaymentsDriverBankDetail';
import TappaymentDriverEarning from '../blocks/tappaymentsintegration/src/TappaymentDriverEarning';
import TappaymentDEarningActivity from '../blocks/tappaymentsintegration/src/TappaymentDEarningActivity';
import TappaymentSellerEarning from '../blocks/tappaymentsintegration/src/TappaymentSellerEarning';
import DriverRegistrationType from '../blocks/customform/src/DriverRegistrationType';
import SelectVehicle from '../blocks/customform/src/SelectVehicle';
import SearchCity from '../blocks/customform/src/SearchCity';
import DriverPersonalDetails from '../blocks/customform/src/DriverPersonalDetails';
import LandingPageDriverOrder from '../blocks/landingpage/src/LandingPageDriverOrder';
import CustomformAddVehicle from '../blocks/customform/src/CustomformAddVehicle';
import CustomformDriverAgencyDocument from '../blocks/customform/src/CustomformDriverAgencyDocument';
import CatalogueFilter from '../blocks/catalogue/src/CatalogueFilter';
import CustomformDriverShowVehicle from '../blocks/customform/src/CustomformDriverShowVehicle';
import CustomformDriverAgencyInfo from '../blocks/customform/src/CustomformDriverAgencyInfo';
import AccountActivation from '../blocks/email-account-registration/src/AccountActivation';
import StylistDashboard from '../blocks/dashboard/src/StylistDashboard';
import CustomformDriverCivilPassport from '../blocks/customform/src/CustomformDriverCivilPassport';
import StylistCreateProfile from '../blocks/customform/src/StylistCreateProfile';
import StylistVerification from '../blocks/customform/src/StylistVerification';
import StylistConfirmation from '../blocks/customform/src/StylistConfirmation';
import StylistEditProfile from '../blocks/customform/src/StylistEditProfile';
import CatalogueHomeSearch from '../blocks/catalogue/src/CatalogueHomeSearch';
import StylishProfileDashboard from '../blocks/customisableuserprofiles2/src/StylishProfileDashboard';
import StylishProfileDetails from '../blocks/customisableuserprofiles2/src/StylishProfileDetails';
import CustomformProductSourceListing from '../blocks/customform/src/CustomformProductSourceListing';
import CustomformSourceProduct from '../blocks/customform/src/CustomformSourceProduct';
import CsvFileUpload from "../blocks/catalogue/src/CsvFileUpload";
import StylistCatalogue from '../blocks/catalogue/src/StylistCatalogue';
import StylistWeeklyPlan from '../blocks/catalogue/src/StylistWeeklyPlan';
import InitiateRefund from "../blocks/refundmanagement/src/InitiateRefund";
import RejectRefund from "../blocks/refundmanagement/src/RejectRefund";
import ProductSourcingTabComp from "../blocks/customform/src/ProductSourcingTabComp";
import ClientsAndChatTab from '../blocks/customform/src/ClientsAndChatTab';
import SeeAllProductSourcing from "../blocks/customform/src/SeeAllProductSourcing";
import StylistViewProductSourcingPage from "../blocks/customform/src/StylistViewProductSourcingPage";
import BuyerProductSourcingDetailed from "../blocks/customform/src/BuyerProductSourcingDetailed";
import MyClients from "../blocks/customform/src/MyClients"
import ProductAnalytics from '../blocks/analytics/src/ProductAnalytics';
import AnalyticsFilter from '../blocks/analytics/src/AnalyticsFilter';
import BidYourQuote from '../blocks/customform/src/BidYourQuote';
import StylistList from "../blocks/customform/src/StylistList";
import MyBids from '../blocks/customform/src/MyBids';
import MyClientsDetails from '../blocks/customform/src/MyClientsDetails';
import StylingRequestList from '../blocks/customform/src/StylingRequestsList';
import StlyingRequestDetails from "../blocks/customform/src/StlyingRequestDetails"
import StylistDetailedProfile from '../blocks/customisableuserprofiles2/src/StylistDetailedProfile';
import StylistProfile from '../blocks/customform/src/StylistProfile';
import RequestCall from '../blocks/customisableuserprofiles2/src/RequestCall';
import SeeAllStylistPortfolioImage from '../blocks/customisableuserprofiles2/src/SeeAllStylistPortfolioImage';
import StylistPortfolioSingleImage from '../blocks/customisableuserprofiles2/src/StylistPortfolioSingleImage';
import ProductByStylist from '../blocks/catalogue/src/ProductByStylist';
import FiltersOrders from '../blocks/ordermanagement/src/FiltersOrders';
import Pricing from '../blocks/customisableuserprofiles2/src/Pricing';
import TermsAndConditionStylistPricing from '../blocks/termsconditions/src/TermsAndConditionStylistPricing';
import OrderReturnMode from '../blocks/ordermanagement/src/OrderReturnMode';
import OrderReturnModeConfirm from '../blocks/ordermanagement/src/OrderReturnModeConfirm';
import OrderReturnConfirm from '../blocks/ordermanagement/src/OrderReturnConfirm';
import RejectOrderStatus from '../blocks/ordermanagement/src/ReturnOrderStatus';
import TrackReturn from '../blocks/ordermanagement/src/TrackReturn';
import CallRequestList from '../blocks/customform/src/CallRequestList';
import InventoryFilter from '../blocks/advancedsearch/src/InventoryFilter';
import TapWebViewForStylistPlan from '../blocks/tappaymentsintegration/src/TapWebViewForStylistPlan';
import StylistPlanSuccess from '../blocks/customisableuserprofiles2/src/StylistPlanSuccess';
import RequirementForm from '../blocks/customisableuserprofiles2/src/RequirementForm';
import Confirmation from '../blocks/customisableuserprofiles2/src/Confirmation';
import MyRequest from '../blocks/customisableuserprofiles2/src/MyRequests';
import DashboardAsBuyer from '../blocks/dashboard/src/DashboardAsBuyer';
import useTranslation, { Translation } from 'react-i18next';
import '../components/src/i18n/i18n.config';
import i18next from 'i18next';
import i18n from '../components/src/i18n/i18n.config';
import SendNewOrder from '../blocks/chat/src/SendNewOrder';
import ReportPerson from '../blocks/chat/src/ReportPerson';
import Cfvirtualmannequin3 from "../blocks/cfvirtualmannequin3/src/Cfvirtualmannequin3"
import BasicdetailsScreen from "../blocks/cfvirtualmannequin3/src/BasicdetailsScreen"
import Measurements from "../blocks/cfvirtualmannequin3/src/Measurements"
import LowerMesurements from "../blocks/cfvirtualmannequin3/src/LowerMesurements"
import Tryonit from "../blocks/cfvirtualmannequin3/src/Tryonit"
import ThreeDeeView from '../blocks/cfvirtualmannequin3/src/ThreeDeeView'
import { Message } from 'framework/src/Message';
import MessageEnum, { getName } from 'framework/src/Messages/MessageEnum';
import { useRunEngine } from '../blocks/utilities/src/hooks/useRunEngine';
import InternetStatus from '../components/src/NoNetwork/NoNetwork'
import NetInfo from '@react-native-community/netinfo';
import ChatCart from '../blocks/chat/src/ChatCart';
import ChatCartWeb from '../blocks/chat/src/ChatCart.web';
import ChatCheckoutWeb from '../blocks/chat/src/ChatCheckout.web';
import ChatCheckout from '../blocks/chat/src/ChatCheckout';
import TapPaymentView from '../blocks/chat/src/TapPaymentView';

const iphoneCondition = ()=>{
  let heightCss = 0
  let isIphone11 = DeviceInfo.getModel().includes('iPhone 11');
  if(isIphone11)
  {
    heightCss =  -40
  }else{
    heightCss =  0
  }
  return heightCss
}

const landingPageDriverNavigation = createStackNavigator({
  LandingPageDriver: {
    screen: LandingPageDriver,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
});

const landingPageNavigation = createStackNavigator({
  LandingPage: {
    screen: LandingPage,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  
  OrderManagementBuyerSummary: {
    screen: OrderManagementBuyerSummary,
    navigationOptions: { header: null, title: '' },
  },
});

const categoriesNavigation = createStackNavigator({
  CategoriesCatalogue: {
    screen: CategoriesCatalogue,
    navigationOptions: { header: null, title: '' },
  },
  Categories: {
    screen: Categories,
    navigationOptions: { header: null, title: '' },
  },
  
  CategoriesSubCate: {
    screen: CategoriesSubCate,
    navigationOptions: { header: null, title: '' },
  },
  
  Catalogue: { screen: Catalogue, navigationOptions: { header: null, title: '' } },
  StoreProfile: {
    screen: StoreProfile,
    navigationOptions: { header: null, title: '' },
  },
  StoreDetailsScreen: {
    screen: StoreDetailsScreen,
    navigationOptions: { header: null, title: '' },
  },
  ProductDetails: {
    screen: Productdescription3,
    navigationOptions: { header: null, title: '' },
  },
});


const categoriesNavigation1 = createStackNavigator({
  CategoriesCatalogue: {
    screen: StylistCatalogue,
    navigationOptions: { header: null, title: '' },
  },
  StylistWeeklyPlan: {
    screen: StylistWeeklyPlan,
    navigationOptions: { header: null, title: '' },
  },
});

const clientAndChatsNavigation = createStackNavigator({
  ClientsAndChatTab: {
    screen: ClientsAndChatTab,
    navigationOptions: { header: null, title: '' },
    screenOptions: {
      unmountOnBlur: true,
    },
  },
  MyClients: {
    screen: MyClients,
    navigationOptions: { header: null, title: '' },
  },
  MyClientsDetails: {
    screen: MyClientsDetails,
    navigationOptions: { header: null, title: '' },
  },
  StylingRequestList: {
    screen: StylingRequestList,
    navigationOptions: { header: null, title: '' },
  },
  StlyingRequestDetails: {
    screen: StlyingRequestDetails,
    navigationOptions: { header: null, title: '' },
  },
  CallRequestList: {
    screen: CallRequestList,
    navigationOptions: { header: null, title: '' },
  },
  WishListClient: {
    screen: Wishlist2,
    navigationOptions: { header: null, title: '' }
  },
  CategoryNavigation: {
    screen: categoriesNavigation,
    navigationOptions: { header: null, title: '' }
  }
});

const cataloguesNavigationForSeller = createStackNavigator({
  CatalogueSeller: {
    screen: CatalogueSeller,
    navigationOptions: { header: null, title: '' },
  },
});

const orderNavigationForSeller = createStackNavigator({
  OrderSummary: {
    screen: OrderSummary,
    navigationOptions: { header: null, title: '' },
  },
  OrderDetailsSeller: {
    screen: OrderDetailsSeller,
    navigationOptions: { header: null, title: '' },
  },
  MyStoresList: {
    screen: MyStoresList,
    navigationOptions: { header: null, title: '' },
  },
  InventoryManagement: {
    screen: Inventorymanagement2,
    navigationOptions: { header: null, title: '' },
  },
  UpdateInventory: {
    screen: UpdateInventory,
    navigationOptions: { header: null, title: '' },
  },
  UpdateInventoryFilter: {
    screen: UpdateInventoryFilter,
    navigationOptions: { header: null, title: '' },
  },
  SetPrices: {
    screen: SetPricesScreen,
    navigationOptions: { header: null, title: '' },
  },
  PairItWith: {
    screen: PairItWith,
    navigationOptions: { header: null, title: '' },
  },
  PairItWithDescription: {
    screen: PairItWithDescription,
    navigationOptions: { header: null, title: '' },
  },
  Promocodes: {
    screen: Promocodes,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  SelectStoreProducts: {
    screen: SelectStoreProducts,
    navigationOptions: { header: null, title: '' },
  },
});

const orderNavigationForStylist = createStackNavigator({
  OrderSummary: {
    screen: OrderSummary,
    navigationOptions: { header: null, title: '' },
  },
  OrderDetailsSeller: {
    screen: OrderDetailsSeller,
    navigationOptions: { header: null, title: '' },
  },
  InventoryManagement: {
    screen: Inventorymanagement2,
    navigationOptions: { header: null, title: '' },
  },
  UpdateInventory: {
    screen: UpdateInventory,
    navigationOptions: { header: null, title: '' },
  },
  UpdateInventoryFilter: {
    screen: UpdateInventoryFilter,
    navigationOptions: { header: null, title: '' },
  },
  SetPrices: {
    screen: SetPricesScreen,
    navigationOptions: { header: null, title: '' },
  },
  PairItWith: {
    screen: PairItWith,
    navigationOptions: { header: null, title: '' },
  },
  PairItWithDescription: {
    screen: PairItWithDescription,
    navigationOptions: { header: null, title: '' },
  },
  Promocodes: {
    screen: Promocodes,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  SelectStoreProducts: {
    screen: SelectStoreProducts,
    navigationOptions: { header: null, title: '' },
  },
});

const sellerDashboardNavigation = createStackNavigator({
  SellerDashboard: {
    screen: SellerDashboard,
    navigationOptions: { header: null, title: '' },
  },
  DashboardSpecificStore: {
    screen: DashboardSpecificStore,
    navigationOptions: { header: null, title: '' },
  },
});


const buyerProfileNavigation = createStackNavigator({
  Settings2: {
    screen: Settings2,
    navigationOptions: { header: null, title: 'Settings2' },
  },
  TermsConditionsDetail: {
    screen: TermsConditionsDetail,
    navigationOptions: { header: null, title: 'TermsConditionsDetail' },
  },
  TermsConditionsUsers: {
    screen: TermsConditionsUsers,
    navigationOptions: { header: null, title: 'TermsConditionsUsers' },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: { header: null, title: 'ProfileScreen' },
  },
  ReturnPolicy: {
    screen: ReturnPolicy,
    navigationOptions: { header: null, title: 'ReturnPolicy' },
  },
  ShippingPolicy: {
    screen: ShippingPolicy,
    navigationOptions: { header: null, title: 'ShippingPolicy' },
  },
  Customisableuserprofiles2Faq: {
    screen: Customisableuserprofiles2Faq,
    navigationOptions: { header: null, title: '' },
  },
  Contactus: {
    screen: Contactus,
    navigationOptions: { header: null, title: 'Contactus' },
  },
  ContactUsSupport: {
    screen: ContactUsSupport,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsAddContact: {
    screen: ContactUsAddContact,
    navigationOptions: { header: null, title: '' },
  },
  OrderManagementBuyerOrderView: {
    screen: OrderManagementBuyerOrderView,
    navigationOptions: { header: null, title: '' },
  },
  OrderManagementBuyerAllOrder: {
    screen: OrderManagementBuyerAllOrder,
    navigationOptions: { header: null, title: '' },
  },
  Refundmanagement: {
    screen: Refundmanagement,
    navigationOptions: { header: null, title: '' },
  },
  OrderManagementBuyerSummary: {
    screen: OrderManagementBuyerSummary,
    navigationOptions: { header: null, title: '' },
  },
  OrderReturnMode: {
    screen: OrderReturnMode,
    navigationOptions: { header: null, title: '' },
  },
  OrderReturnModeConfirm: {
    screen: OrderReturnModeConfirm,
    navigationOptions: { header: null, title: '' },
  },
  OrderReturnConfirm: {
    screen: OrderReturnConfirm,
    navigationOptions: { header: null, title: '' },
  },
});

const sellerProfileNavigation = createStackNavigator({
  Customisableuserprofiles2sellerprofile: {
    screen: Customisableuserprofiles2sellerprofile,
    navigationOptions: { header: null, title: '' },
  },
  TermsConditionsDetail: {
    screen: TermsConditionsDetail,
    navigationOptions: { header: null, title: 'TermsConditionsDetail' },
  },
  TermsConditionsUsers: {
    screen: TermsConditionsUsers,
    navigationOptions: { header: null, title: 'TermsConditionsUsers' },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: { header: null, title: 'ProfileScreen' },
  },
  ReturnPolicy: {
    screen: ReturnPolicy,
    navigationOptions: { header: null, title: 'ReturnPolicy' },
  },
  ShippingPolicy: {
    screen: ShippingPolicy,
    navigationOptions: { header: null, title: 'ShippingPolicy' },
  },
  Customisableuserprofiles2Faq: {
    screen: Customisableuserprofiles2Faq,
    navigationOptions: { header: null, title: '' },
  },
  Contactus: {
    screen: Contactus,
    navigationOptions: { header: null, title: 'Contactus' },
  },
  ContactUsSupport: {
    screen: ContactUsSupport,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsAddContact: {
    screen: ContactUsAddContact,
    navigationOptions: { header: null, title: '' },
  },
  Customisableuserprofiles2selleradminrequest: {
    screen: Customisableuserprofiles2selleradminrequest,
    navigationOptions: { header: null, title: '' },
  },
  Customisableuserprofiles2sellerprofilenotification: {
    screen: Customisableuserprofiles2sellerprofilenotification,
    navigationOptions: { header: null, title: '' },
  },
});

const sellerStoresNavigation = createStackNavigator({
  MyStoresList: {
    screen: MyStoresList,
    navigationOptions: { header: null, title: '' },
  },
  MyStoreDetails: {
    screen: MyStoreDetails,
    navigationOptions: { header: null, title: '' },
  },
  SelectStoreProducts: {
    screen: SelectStoreProducts,
    navigationOptions: { header: null, title: '' },
  },
  Categories: {
    screen: Categories,
    navigationOptions: { header: null, title: '' },
  },
  CategoriesSubCate: {
    screen: CategoriesSubCate,
    navigationOptions: { header: null, title: '' },
  },
  Catalogue: {
    screen: Catalogue,
    navigationOptions: { header: null, title: '' },
  },
  InventoryManagement: {
    screen: Inventorymanagement2,
    navigationOptions: { header: null, title: '' },
  },
  UpdateInventory: {
    screen: UpdateInventory,
    navigationOptions: { header: null, title: '' },
  },
  UpdateInventoryFilter: {
    screen: UpdateInventoryFilter,
    navigationOptions: { header: null, title: '' },
  },
  SetPrices: {
    screen: SetPricesScreen,
    navigationOptions: { header: null, title: '' },
  },
  PairItWith: {
    screen: PairItWith,
    navigationOptions: { header: null, title: '' },
  },
  PairItWithDescription: {
    screen: PairItWithDescription,
    navigationOptions: { header: null, title: '' },
  },
  Promocodes: {
    screen: Promocodes,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CreateNewOffer: {
    screen: CreateNewOffer,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CreateOffer: {
    screen: CreateOffer,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
});

const driverProfileNavigation = createStackNavigator({
  Customisableuserprofiles2driverprofile: {
    screen: Customisableuserprofiles2driverprofile,
    navigationOptions: { header: null, title: '' },
  },
  ContactusDriver: {
    screen: ContactusDriver,
    navigationOptions: { header: null, title: 'ContactusDriver' },
  },
  CustomformDriverShowVehicle: {
    screen: CustomformDriverShowVehicle,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  TermsConditionsDriverPolicy: {
    screen: TermsConditionsDriverPolicy,
    navigationOptions: { header: null, title: 'TermsConditionsDriverPolicy' },
  },
  TermsConditionsDetail: {
    screen: TermsConditionsDetail,
    navigationOptions: { header: null, title: 'TermsConditionsDetail' },
  },
  TermsConditionsUsers: {
    screen: TermsConditionsUsers,
    navigationOptions: { header: null, title: 'TermsConditionsUsers' },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: { header: null, title: 'ProfileScreen' },
  },
  Customisableuserprofiles2Faq: {
    screen: Customisableuserprofiles2Faq,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsSupportDriver: {
    screen: ContactUsSupportDriver,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsAddContactDriver: {
    screen: ContactUsAddContactDriver,
    navigationOptions: { header: null, title: '' },
  },
});

const stylistOnboardingStack = createStackNavigator({
  StylistCreateProfile: {
    screen: YetToBeDeveloped,
    navigationOptions: { header: null, title: '' },
  },
});

const stylistProfileNavigation = createStackNavigator({
  Customisableuserprofiles2styl: {
    screen: Customisableuserprofiles2styl,
    navigationOptions: { header: null, title: '' },
  },
  Contactus: {
    screen: Contactus,
    navigationOptions: { header: null, title: 'Contactus' },
  },
  TermsConditionsDetail: {
    screen: TermsConditionsDetail,
    navigationOptions: { header: null, title: 'TermsConditionsDetail' },
  },
  TermsConditionsUsers: {
    screen: TermsConditionsUsers,
    navigationOptions: { header: null, title: 'TermsConditionsUsers' },
  },
  Customisableuserprofiles2Faq: {
    screen: Customisableuserprofiles2Faq,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsSupport: {
    screen: ContactUsSupport,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsAddContact: {
    screen: ContactUsAddContact,
    navigationOptions: { header: null, title: '' },
  },
  StylistEditProfile: {
    screen: StylistEditProfile,
    navigationOptions: { header: null, title: '' },
  },
  NotificationsettingsStylist: {
    screen: NotificationsettingsStylist,
    navigationOptions: { header: null, title: '' },
  },
  ReturnPolicy: {
    screen: ReturnPolicy,
    navigationOptions: { header: null, title: 'ReturnPolicy' },
  },
  ShippingPolicy: {
    screen: ShippingPolicy,
    navigationOptions: { header: null, title: 'ShippingPolicy' },
  },
});

const driverEarningNavigation = createStackNavigator({
  TappaymentDriverEarning: {
    screen: TappaymentDriverEarning,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AnalyticsDriverEarning: {
    screen: AnalyticsDriverEarning,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  ContactusDriver: {
    screen: ContactusDriver,
    navigationOptions: { header: null, title: 'ContactusDriver' },
  },
  ContactUsSupportDriver: {
    screen: ContactUsSupportDriver,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsAddContactDriver: {
    screen: ContactUsAddContactDriver,
    navigationOptions: { header: null, title: '' },
  },
});

const driverSupportNavigation = createStackNavigator({
  ContactUsSupportDriver: {
    screen: ContactUsSupportDriver,
    navigationOptions: { header: null, title: '' },
  },
  ContactUsAddContactDriver: {
    screen: ContactUsAddContactDriver,
    navigationOptions: { header: null, title: '' },
  },
});


const stylistDashboardNavigation = createStackNavigator({
  stylistDashboard: {
    screen: StylistDashboard,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  stylistAsBuyer: {
    screen: DashboardAsBuyer,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  stylistWishlist: {
    screen: Wishlist2,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  Categories: {
    screen: Categories,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CategoriesSubCate: {
    screen: CategoriesSubCate,
    navigationOptions: { header: null, title: '' },
  },
  Catalogue: { screen: Catalogue, navigationOptions: { header: null, title: '' } },
  OrderManagementBuyerOrderView: {
    screen: OrderManagementBuyerOrderView,
    navigationOptions: { header: null, title: '' },
  },
  OrderManagementBuyerAllOrder: {
    screen: OrderManagementBuyerAllOrder,
    navigationOptions: { header: null, title: '' },
  },
  Refundmanagement: {
    screen: Refundmanagement,
    navigationOptions: { header: null, title: '' },
  },
  OrderManagementBuyerSummary: {
    screen: OrderManagementBuyerSummary,
    navigationOptions: { header: null, title: '' },
  },
  OrderReturnMode: {
    screen: OrderReturnMode,
    navigationOptions: { header: null, title: '' },
  },
  OrderReturnModeConfirm: {
    screen: OrderReturnModeConfirm,
    navigationOptions: { header: null, title: '' },
  },
  OrderReturnConfirm: {
    screen: OrderReturnConfirm,
    navigationOptions: { header: null, title: '' },
  },
  CategoriesCatalogue: {
    screen: CategoriesCatalogue,
    navigationOptions: { header: null, title: '' },
  },
  StoreProfile: {
    screen: StoreProfile,
    navigationOptions: { header: null, title: '' },
  },
  StoreDetailsScreen: {
    screen: StoreDetailsScreen,
    navigationOptions: { header: null, title: '' },
  },
  ProductDetails: {
    screen: Productdescription3,
    navigationOptions: { header: null, title: '' },
  },
});

const buyerWislistNavigation = createStackNavigator({
  Wishlist2: {
    screen: Wishlist2,
    navigationOptions: { header: null, title: '' },
  },
  ProductDetails: {
    screen: Productdescription3,
    navigationOptions: { header: null, title: '' },
  },
  StoreProfile: {
    screen: StoreProfile,
    navigationOptions: { header: null, title: '' },
  },
  StoreDetailsScreen: {
    screen: StoreDetailsScreen,
    navigationOptions: { header: null, title: '' },
  },
})

const buyerStylistNavigation = createStackNavigator({
  StylistProfile: {
    screen: StylistProfile,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  StylistList: {
    screen: StylistList,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
});

const StylistTab = createBottomTabNavigator(
  {
    StylistLanding: {
      screen: stylistDashboardNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t("dashBoardTab")}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? homeActive : homeInactive}
            style={styles.icon}
          />
        ),
      },
    },
    StylistCatalogue: {
      screen: categoriesNavigation1,
      navigationOptions: {
        header: null,
        title: 'Catalogue',
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t("catalogueTab")}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? categoryActive : categoryInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'CategoriesCatalogue' })],
            0,
          );
        },
      },
    },
    Orders: {
      screen: orderNavigationForStylist,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('orderTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? ordersActive : ordersInactive}
            style={styles.icon}
          />
        ),
      },
    },
    Clients: {
      screen: clientAndChatsNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('clientTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? clientActive : clientInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'ClientsAndChatTab' })],
            0,
          );
        },
      },
    },
    StylistProfile: {
      screen: stylistProfileNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('profileTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? profileActive : profileInactive}
            style={focused ? styles.pfpIcon : styles.icon}
          />
        ),
      },
    },
  },
  {
    navigationOptions: () => {
      return {
        initialRouteName: 'LandingPageDriver',
        tabBarOptions: {
          style: {
            backgroundColor: '#FFFFFF',
            height: Platform.OS === 'ios' ? windowWidth*21/100:72,
            elevation: 1,
            marginBottom: iphoneCondition()
          },
        },
        
      };
    },
  },
);

const TabNavigations = createBottomTabNavigator(
  {
    Home: {
      screen: landingPageNavigation,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('homeTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? homeActive : homeInactive}
            style={styles.icon}
          />
        ),
      },
    },
    Catalogue: {
      screen: categoriesNavigation,
      navigationOptions: {
        header: null,
        title: 'Catalogue',
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('catalogueTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? categoryActive : categoryInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'CategoriesCatalogue' })],
            0,
          );
        },
      },
    },
    Wishlist2: {
      screen: buyerWislistNavigation,
      navigationOptions: {
        header: null,
        title: 'Wishlist',
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('wishlistTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? wishlistActive : wishlistInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: async ({ navigation, defaultHandler }) => {
          if (await getStorageData('requireSignIn')) {
            showAlert({
              messsage: 'You need to sign in to access Wishlist',
              okButton: {
                text: 'Sign In',
                onPress: () =>
                  navigation.dispatch(
                    NavigationActions.navigate({
                      routeName: 'EmailAccountLoginBlock',
                    }),
                  ),
              },
              cancelButton: { text: 'Cancel' },
            });
            return;
          }
          defaultHandler();
        },
      },
    },
    UserProfileBasicBlock: {
      screen: buyerStylistNavigation,
      navigationOptions: {
        header: null,
        title: 'me',
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('stylistTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? stylistActive : stylishInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: async ({ navigation, defaultHandler }) => {
          if (await getStorageData('requireSignIn')) {
            showAlert({
              messsage: 'You need to sign in to access Stylist',
              okButton: {
                text: 'Sign In',
                onPress: () =>
                  navigation.dispatch(
                    NavigationActions.navigate({
                      routeName: 'EmailAccountLoginBlock',
                    }),
                  ),
              },
              cancelButton: { text: 'Cancel' },
            });
            return;
          }
          defaultHandler();
        },
      },
    },
    Profile: {
      screen: buyerProfileNavigation,
      navigationOptions: {
        header: null,
        title: 'My Space',
        gesturesEnabled: false,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('profileTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? profileActive : profileInactive}
            style={focused ? styles.pfpIcon : styles.icon}
          />
        ),
        tabBarOnPress: async ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'Settings2' })],
            0,
          );
        },
      },
    },
  },
  {
    navigationOptions: () => {
      return {
        initialRouteName: 'LandingPage',
        tabBarOptions: {
          style: {
            backgroundColor: '#FFFFFF',
            height: Platform.OS === 'ios' ? windowWidth*21/100:72,
            elevation: 1,
            marginBottom: iphoneCondition()
          }
        },
      };
    },
  },
);

const SellerTab = createBottomTabNavigator(
  {
    SellerDashboard: {
      screen: sellerDashboardNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('dashBoardTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? dashboardActive : dashboardInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'SellerDashboard' })],
            0,
          );
        },
      },
    },
    SellerCatalogue: {
      screen: cataloguesNavigationForSeller,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('catalogueTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? categoryActive : categoryInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'CatalogueSeller' })],
            0,
          );
        },
      },
    },
    SellerOrders: {
      screen: orderNavigationForSeller,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t("orderTab")}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? ordersActive : ordersInactive}
            style={styles.icon}
          />
        ),
      },
    },
    Stores: {
      screen: sellerStoresNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('storeTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? storesActive : storesInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'MyStoresList' })],
            0,
          );
        },
      },
    },
    SellerProfile: {
      screen: sellerProfileNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('profileTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? profileActive : profileInactive}
            style={focused ? styles.pfpIcon : styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [
              NavigationActions.navigate({
                routeName: 'Customisableuserprofiles2sellerprofile',
              }),
            ],
            0,
          );
        },
      },
    },
  },
  {
    navigationOptions: () => {
      return {
        initialRouteName: 'SellerDashboard',
        tabBarOptions: {
          style: {
            backgroundColor: '#FFFFFF',
            height: Platform.OS === 'ios' ? windowWidth*21/100:72,
            elevation: 1,
            marginBottom: iphoneCondition()
          },
        },
      };
    },
  },
);

const DriverTab = createBottomTabNavigator(
  {
    DriverLanding: {
      screen: landingPageDriverNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('homeTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? homeActive : homeInactive}
            style={styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'LandingPageDriver' })],
            0,
          );
        },
      },
    },
    DriverEarning: {
      screen: driverEarningNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('earningsTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? dollarCircleActive : dollarCircleInactive}
            style={styles.icon}
          />
        ),
      },
    },
    DriverSupport: {
      screen: driverSupportNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('supportTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? contactActive : contactInactive}
            style={styles.icon}
          />
        ),
      },
    },
    DriverProfile: {
      screen: driverProfileNavigation,
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.activeTabText : styles.inactiveTabText}>
            {i18n.t('profileTab')}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? profileActive : profileInactive}
            style={focused ? styles.pfpIcon : styles.icon}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.reset(
            [
              NavigationActions.navigate({
                routeName: 'Customisableuserprofiles2driverprofile',
              }),
            ],
            0,
          );
        },
      },
    },
  },
  {
    navigationOptions: () => {
      return {
        initialRouteName: 'LandingPageDriver',
        tabBarOptions: {
          style: {
            backgroundColor: '#FFFFFF',
            height: Platform.OS === 'ios' ? windowWidth*21/100:72,
            elevation: 1,
            marginBottom: iphoneCondition()
          },
        },
      };
    },
  },
);

const HomeStack = createStackNavigator({
  Splashscreen2: {
    screen: Splashscreen2,
    navigationOptions: { header: null, title: 'Splash', gesturesEnabled: false },
  },
  LoginOptionsScreen: {
    screen: LoginOptionsScreen,
    navigationOptions: { header: null, title: 'LoginOptions', gesturesEnabled: false },
  },
 OnboardingScreen: {
    screen: OnBoardingScreen,
    navigationOptions: { header: null, title: 'OnboardingScreen', gesturesEnabled: false },
  },
  TabNavigations: {
    screen: TabNavigations,
    navigationOptions: {
      header: null,
      title: 'TabNavigations',
      gesturesEnabled: false,
    },
  },
  DriverTab: {
    screen: DriverTab,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  Home: {
    screen: TermsConditions,
    navigationOptions: { header: null, title: 'Home' },
  },
  Cfvirtualmannequin3: {
    screen: Cfvirtualmannequin3,
    navigationOptions: { header: null, title: 'Cfvirtualmannequin3' },
  },
  BasicdetailsScreen: {
    screen: BasicdetailsScreen,
    navigationOptions: { header: null, title: 'BasicdetailsScreen' },
  },
  Measurements: {
    screen: Measurements,
    navigationOptions: { header: null, title: 'Measurements' },
  },
  LowerMesurements: {
    screen: LowerMesurements,
    navigationOptions: { header: null, title: 'LowerMesurements' },
  },
  Tryonit: {
    screen: Tryonit,
    navigationOptions: { header: null, title: 'Tryonit' },
  },
  ThreeDeeView: {
    screen: ThreeDeeView,
    navigationOptions: { header: null, title: 'ThreeDeeView' },
  },
  ExploreWishlist: {
    screen: ExploreWishlist,
    navigationOptions: { header: null, title: '' }
  },
  OrderManagementBuyerOrderStatus: {
    screen: OrderManagementBuyerOrderStatus,
    navigationOptions: { header: null, title: 'Splash', gesturesEnabled: false },
  },
  OrderManagementBuyerConfirmation: {
    screen: OrderManagementBuyerConfirmation,
    navigationOptions: { header: null, title: 'Splash', gesturesEnabled: false },
  },
  Customisableuserprofiles2: {
    screen: Customisableuserprofiles2,
    navigationOptions: { title: 'Customisableuserprofiles2' },
  },
  Creditdebitcardpayments: {
    screen: Creditdebitcardpayments,
    navigationOptions: { title: 'Creditdebitcardpayments' },
  },
  Tasks: { screen: Tasks, navigationOptions: { title: 'Tasks' } },
  TaskList: { screen: TaskList, navigationOptions: { title: 'TaskList' } },
  Task: { screen: Task, navigationOptions: { title: 'Task' } },
  Productdescription3: {
    screen: Productdescription3,
    navigationOptions: { title: 'Productdescription3' },
  },
  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: { header: null, title: 'Splash', gesturesEnabled: false },
  },
  OrderManagement: {
    screen: OrderManagement,
    navigationOptions: { title: 'OrderManagement' },
  },
  ShoppingCartOrders: {
    screen: ShoppingCartOrders,
    navigationOptions: { title: 'ShoppingCartOrders', header: null },
  },
  AddShoppingCartOrderItem: {
    screen: AddShoppingCartOrderItem,
    navigationOptions: { title: 'AddShoppingCartOrderItem' },
  },
  Pricing: {
    screen: Pricing,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  Notificationsettings: {
    screen: Notificationsettings,
    navigationOptions: { title: 'Notificationsettings' },
  },
  NavigationMenu: {
    screen: NavigationMenu,
    navigationOptions: { header: null, title: '' },
  },
  ProductSourcingOrderDetails : {
    screen: ProductSourcingOrderDetails,
    navigationOptions: { header: null, title: '' },
  },
  PhoneNumberInput: {
    screen: PhoneNumberInput,
    navigationOptions: { title: 'PhoneNumberInput' },
  },
  AdditionalDetailForm: {
    screen: AdditionalDetailForm,
    navigationOptions: { title: 'AdditionalDetailForm' },
  },
  Customform: { screen: Customform, navigationOptions: { title: 'Customform' } },
  CustomformCreateStoreUpload: {
    screen: CustomformCreateStoreUpload,
    navigationOptions: { header: null, title: '' },
  },
  CustomformCreateStoreAddress: {
    screen: CustomformCreateStoreAddress,
    navigationOptions: { header: null, title: '' },
  },
  CustomformCreateStoreTiming: {
    screen: CustomformCreateStoreTiming,
    navigationOptions: { header: null, title: '' },
  },
  CustomformMap: {
    screen: CustomformMap,
    navigationOptions: { header: null, title: '' },
  },
  CustomformStoreShow: {
    screen: CustomformStoreShow,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformCreateUploadDocument: {
    screen: CustomformCreateUploadDocument,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformConfirmation: {
    screen: CustomformConfirmation,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformCreateManageTiming: {
    screen: CustomformCreateManageTiming,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformEditStoreDetails: {
    screen: CustomformEditStoreDetails,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverProfilePhoto: {
    screen: CustomformDriverProfilePhoto,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AdvancedSearch: {
    screen: AdvancedSearch,
    navigationOptions: { title: 'AdvancedSearch' },
  },
  AdvancesSearchFilterBuyer: {
    screen: AdvancesSearchFilterBuyer,
    navigationOptions: { title: '', header: null },
  },
  Emailnotifications2: {
    screen: Emailnotifications2,
    navigationOptions: { title: 'Emailnotifications2' },
  },
  Settings2Language: {
    screen: Settings2Language,
    navigationOptions: { title: '', header: null },
  },
  PromocodeDetails: {
    screen: PromocodeDetails,
    navigationOptions: { title: 'PromocodeDetails' },
  },
  OTPInputAuth: {
    screen: OTPInputAuth,
    navigationOptions: { header: null, title: '' },
  },
  PhoneVerification: {
    screen: PhoneVerification,
    navigationOptions: { header: null, title: '' },
  },
  Applepayintegration2: {
    screen: Applepayintegration2,
    navigationOptions: { title: 'Applepayintegration2' },
  },
  Collecttransactionfees: {
    screen: Collecttransactionfees,
    navigationOptions: { title: 'Collecttransactionfees' },
  },
  Contentmanagement3: {
    screen: Contentmanagement3,
    navigationOptions: { title: 'Contentmanagement3' },
  },
  Admanager: { screen: Admanager, navigationOptions: { title: 'Admanager' } },
  Googleadsenseintegration: {
    screen: Googleadsenseintegration,
    navigationOptions: { title: 'Googleadsenseintegration' },
  },
  VisualAnalytics: {
    screen: VisualAnalytics,
    navigationOptions: { title: 'VisualAnalytics' },
  },
  Savedcards: {
    screen: Savedcards,
    navigationOptions: { title: 'Savedcards', header: null },
  },
  Adminconsole2: {
    screen: Adminconsole2,
    navigationOptions: { title: 'Adminconsole2' },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: { title: 'Notifications' },
  },
  Cfchatbot2: { screen: Cfchatbot2, navigationOptions: { title: 'Cfchatbot2' } },
  Storecredits2: {
    screen: Storecredits2,
    navigationOptions: { title: 'Storecredits2' },
  },
  Refundmanagement: {
    screen: Refundmanagement,
    navigationOptions: { title: 'Refundmanagement' },
  },
  Inapppurchasing: {
    screen: Inapppurchasing,
    navigationOptions: { title: 'Inapppurchasing' },
  },
  ApiIntegration: {
    screen: ApiIntegration,
    navigationOptions: { title: 'ApiIntegration' },
  },
  CountryCodeSelector: {
    screen: CountryCodeSelector,
    navigationOptions: { title: 'CountryCodeSelector' },
  },
  CountryCodeSelectorTable: {
    screen: CountryCodeSelectorTable,
    navigationOptions: { title: 'CountryCodeSelectorTable' },
  },
  Shippingaddressvalidation2: {
    screen: Shippingaddressvalidation2,
    navigationOptions: { title: 'Shippingaddressvalidation2' },
  },
  Pushnotifications: {
    screen: Pushnotifications,
    navigationOptions: { title: 'Pushnotifications' },
  },
  AccountGroups: {
    screen: AccountGroups,
    navigationOptions: { title: 'AccountGroups' },
  },
  MyRequest: {
    screen: MyRequest,
    navigationOptions: { header: null, title: 'MyRequest' },
  },
  CustomformProductSourceListing: {
    screen: CustomformProductSourceListing,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  Scheduling: { screen: Scheduling, navigationOptions: { title: 'Scheduling' } },
  AddContactus: {
    screen: AddContactus,
    navigationOptions: { title: 'AddContactus' },
  },
  Rolesandpermissions: {
    screen: Rolesandpermissions,
    navigationOptions: { title: 'Rolesandpermissions' },
  },
  Applelogin2: { screen: Applelogin2, navigationOptions: { title: 'Applelogin2' } },
  Linkshare: { screen: Linkshare, navigationOptions: { title: 'Linkshare' } },
  Addresses: {
    screen: Addresses,
    navigationOptions: { title: 'Addresses', header: null },
  },
  AddAddress: {
    screen: AddAddress,
    navigationOptions: { title: 'AddAddress', header: null },
  },
  SocialMediaAccountPhoneScreen: {
    screen: SocialMediaAccountPhoneScreen,
    navigationOptions: { title: 'SocialMediaAccountPhoneScreen', header: null },
  },
  Deliveryestimator: {
    screen: Deliveryestimator,
    navigationOptions: { title: 'Deliveryestimator' },
  },
  Reviews: { screen: Reviews, navigationOptions: { title: 'Reviews' } },
  AddReview: { screen: AddReview, navigationOptions: { title: 'AddReview' } },
  Promocodes: {
    screen: Promocodes,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  // SocialMediaAccountRegistrationScreen: { screen: SocialMediaAccountRegistrationScreen, navigationOptions: { title: "SocialMediaAccountRegistrationScreen" } },
  SocialMediaAccountOtpVerification: {
    screen: SocialMediaAccountOtpVerification,
    navigationOptions: { title: '', header: null },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { title: 'ForgotPassword' },
  },
  ForgotPasswordOTP: {
    screen: ForgotPasswordOTP,
    navigationOptions: { title: 'ForgotPasswordOTP' },
  },
  NewPassword: { screen: NewPassword, navigationOptions: { title: 'NewPassword' } },
  Dashboard: { screen: Dashboard, navigationOptions: { title: 'Dashboard' } },
  DashboardSelectStore: {
    screen: DashboardSelectStore,
    navigationOptions: { title: '', header: null },
  },
  Chat: { screen: Chat, navigationOptions: { title: 'Chat', header: null } },
  ChatCart: { screen: ChatCart, navigationOptions: { title: 'ChatCart', header: null } },
  ChatCheckout : { screen: ChatCheckout, navigationOptions: { title: 'ChatCheckout', header: null } },
  ChatView: { screen: ChatView, navigationOptions: { title: 'ChatView', header: null } },
  PaymentRequest: { screen: PaymentRequest, navigationOptions: { title: 'PaymentRequest', header: null } },
  SendNewOrder: { screen: SendNewOrder, navigationOptions: { title: 'SendNewOrder', header: null } },
  ReportPerson: { screen: ReportPerson, navigationOptions: { title: 'ReportPerson', header: null } },
  StripePayments: {
    screen: StripePayments,
    navigationOptions: { title: 'StripePayments' },
  },
  Expressdelivery: {
    screen: Expressdelivery,
    navigationOptions: { title: 'Expressdelivery' },
  },
  TermsConditions: {
    screen: TermsConditions,
    navigationOptions: { title: 'TermsConditions' },
  },
  BulkUploading: {
    screen: BulkUploading,
    navigationOptions: { title: 'BulkUploading' },
  },
  Trending2: { screen: Trending2, navigationOptions: { title: 'Trending2' } },
  Uploadmedia3: {
    screen: Uploadmedia3,
    navigationOptions: { title: 'Uploadmedia3' },
  },
  Upvotedownvote: {
    screen: Upvotedownvote,
    navigationOptions: { title: 'Upvotedownvote' },
  },
  EmailAccountRegistration: {
    screen: EmailAccountRegistration,
    navigationOptions: { header: null, title: 'EmailAccountRegistration' },
  },
  Analytics: { screen: Analytics, navigationOptions: { title: 'Analytics' } },
  AnalyticsFilter: { screen: AnalyticsFilter, navigationOptions: { title: 'ProductAnalytics', header: null } },
  ProductAnalytics: { screen: ProductAnalytics, navigationOptions: { title: 'ProductAnalytics', header: null } },
  PhotoLibrary: {
    screen: PhotoLibrary,
    navigationOptions: { title: 'PhotoLibrary', header: null },
  },
  PhotoLibraryEditPortfolioDetails: {
    screen: PhotoLibraryEditPortfolioDetails,
    navigationOptions: { title: 'PhotoLibraryEditPortfolioDetails', header: null },
  },
  Loyaltysystem: {
    screen: Loyaltysystem,
    navigationOptions: { title: 'Loyaltysystem',header: null },
  },
  RedeemScreen: {
    screen: RedeemScreen,
    navigationOptions: { title: 'RedeemScreen',header: null },
  },
  LoyaltyConfirmation: {
    screen: LoyaltyConfirmation,
    navigationOptions: { title: 'LoyaltyConfirmation',header: null },
  },
  Categoriessubcategories: {
    screen: Categoriessubcategories,
    navigationOptions: { title: 'Categoriessubcategories' },
  },
  SignupScreen: {
    screen: SignupScreen,
    navigationOptions: { header: null, title: 'Signup' },
  },
  VeriftAccount: {
    screen: VeriftAccount,
    navigationOptions: { header: null, title: 'Signup' },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: { header: null, title: 'Signup' },
  },
  ResetPasswordOTP: {
    screen: ResetPasswordOTP,
    navigationOptions: { header: null, title: 'Signup' },
  },
  ResetNewPasswoord: {
    screen: ResetNewPasswoord,
    navigationOptions: { header: null, title: 'Signup' },
  },
  EmailAccountLoginBlock: {
    screen: EmailAccountLoginBlock,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  MobileAccountLoginBlock: {
    screen: MobileAccountLoginBlock,
    navigationOptions: { header: null, title: '' },
  },
  InfoPage: { screen: InfoPage, navigationOptions: { title: 'Info' } },
  ProductDetails1: {
    screen: Productdescription3,
    navigationOptions: { header: null, title: '' },
  },
  VariantImages: {
    screen: VariantImages,
    navigationOptions: { header: null, title: '' },
  },
  Varients: { screen: Varients, navigationOptions: { header: null, title: '' } },
  YetToBeDeveloped: {
    screen: YetToBeDeveloped,
    navigationOptions: { header: null },
  },
  AddProduct: {
    screen: AddProduct,
    navigationOptions: { header: null, title: '' },
  },
  CatalogueSeller: {
    screen: CatalogueSeller,
    navigationOptions: { header: null, title: '' },
  },
  DetailedProductSourcingOrder: {
    screen : DetailedProductSourcingOrder,
    navigationOptions: { header: null, title: '' },
  },
  PairedProducts: {
    screen: PairedProducts,
    navigationOptions: { header: null, title: 'PairedProducts' },
  },
  SellerTab: {
    screen: SellerTab,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  FiltersOrders: {
    screen: FiltersOrders,
    navigationOptions: { header: null, title: '' },
  },
  AssignStore: {
    screen: AssignStore,
    navigationOptions: { header: null, title: '' },
  },
  ProductSourcingOrders : {
    screen: ProductSourcingOrders,
    navigationOptions: { header: null, title: '' },
  },
  ProductdescriptionSeller: {
    screen: ProductdescriptionSeller,
    navigationOptions: { header: null, title: '' },
  },
  UploadCSV: { screen: UploadCSV, navigationOptions: { header: null, title: '' } },
  AssignStores: {
    screen: AssignStores,
    navigationOptions: { header: null, title: '' },
  },
  EditProduct: {
    screen: EditProduct,
    navigationOptions: { header: null, title: '' },
  },
  DownloadTemplates: {
    screen: DownloadTemplates,
    navigationOptions: { header: null, title: '' },
  },
  Checkout: { screen: Checkout, navigationOptions: { header: null, title: '' } },
  AddCard: { screen: AddCard, navigationOptions: { header: null, title: '' } },
  PaymentMethods: {
    screen: PaymentMethods,
    navigationOptions: { header: null, title: '' },
  },
  PaymentSuccess: {
    screen: PaymentSuccess,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AcceptOrder: {
    screen: AcceptOrder,
    navigationOptions: { header: null, title: '' },
  },
  RejectOrder: {
    screen: RejectOrder,
    navigationOptions: { header: null, title: '' },
  },
  TapPayments: {
    screen: TapPaymentsIntegration,
    navigationOptions: { header: null, title: '' },
  },
  OrderDetailsSeller: {
    screen: OrderDetailsSeller,
    navigationOptions: { header: null, title: '' },
  },
  TapPaymentsWebview: {
    screen: TapPaymentsWebview,
    navigationOptions: { header: null, title: '' },
  },
  TapPaymentView : {
    screen: TapPaymentView,
    navigationOptions: { header: null, title: '' },
  },
  TapWebViewForStylistPlan: {
    screen: TapWebViewForStylistPlan,
    navigationOptions: { header: null, title: '' },
  },
  StylistPlanSuccess: {
    screen: StylistPlanSuccess,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  InventoryFilter: {
    screen: InventoryFilter,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  DriverRegistrationType: {
    screen: DriverRegistrationType,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  RequestCall: {
    screen: RequestCall,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  SeeAllStylistPortfolioImage: {
    screen: SeeAllStylistPortfolioImage,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  SelectVehicle: {
    screen: SelectVehicle,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  SearchCity: {
    screen: SearchCity,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  DriverPersonalDetails: {
    screen: DriverPersonalDetails,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverDocument: {
    screen: CustomformDriverDocument,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverDocumentUpload: {
    screen: CustomformDriverDocumentUpload,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  LandingPageDriverOrder: {
    screen: LandingPageDriverOrder,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformAddVehicle: {
    screen: CustomformAddVehicle,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverShowVehicle: {
    screen: CustomformDriverShowVehicle,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CatalogueFilter: {
    screen: CatalogueFilter,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverAgencyInfo: {
    screen: CustomformDriverAgencyInfo,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverAgencyDocument: {
    screen: CustomformDriverAgencyDocument,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformSourceProduct: {
    screen: CustomformSourceProduct,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  SeeAllProductSourcing: {
    screen: SeeAllProductSourcing,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  StylistViewProductSourcingPage: {
    screen: StylistViewProductSourcingPage,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  BuyerProductSourcingView: {
    screen: BuyerProductSourcingDetailed,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AccountActivation: {
    screen: AccountActivation,
    navigationOptions: { header: null, title: '',gesturesEnabled: false },
  },
  StylistTab: {
    screen: StylistTab,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  ProductByStylist: {
    screen: ProductByStylist,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformDriverCivilPassport: {
    screen: CustomformDriverCivilPassport,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  StylistCreateProfile: {
    screen: StylistCreateProfile,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  StylistPortfolioSingleImage: {
    screen: StylistPortfolioSingleImage,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  StylistVerification: {
    screen: StylistVerification,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  StylistConfirmation: {
    screen: StylistConfirmation,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CatalogueHomeSearch: {
    screen: CatalogueHomeSearch,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  TappaymentsBuyerHistory: {
    screen: TappaymentsBuyerHistory,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  TappaymentsPaymentDetail: {
    screen: TappaymentsPaymentDetail,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AddressEditDriver: {
    screen: AddressEditDriver,
    navigationOptions: { header: null, title: '', gesturesEnabled: false }
  },
  StylishProfileDetails: {
    screen: StylishProfileDetails,
    navigationOptions: { header: null, title: 'StylishProfileDetails', gesturesEnabled: false },
  },
  StylistDetailedProfile: {
    screen: StylistDetailedProfile,
    navigationOptions: { header: null, title: 'StylistDetailedProfile', gesturesEnabled: false },
  },
  RequirementForm: {
    screen: RequirementForm,
    navigationOptions: { header: null, title: 'RequirementForm', gesturesEnabled: false },
  },
  Confirmation: {
    screen: Confirmation,
    navigationOptions: { header: null, title: 'Confirmation', gesturesEnabled: false },
  },
  StylishProfileDashboard: {
    screen: StylishProfileDashboard,
    navigationOptions: { header: null, title: 'StylishProfileDashboard', gesturesEnabled: false },
  },
  TappaymentsAddBank: {
    screen: TappaymentsAddBank,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CsvFileUpload: {
    screen: CsvFileUpload,
    navigationOptions: { header: null, title: 'CsvFileUpload', gesturesEnabled: false },
  },
  TappaymentsDriverBankDetail: {
    screen: TappaymentsDriverBankDetail,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  InitiateRefund: {
    screen: InitiateRefund,
    navigationOptions: { header: null, title: 'InitiateRefund', gesturesEnabled: false },
  },
  RejectRefund: {
    screen: RejectRefund,
    navigationOptions: { header: null, title: 'RejectRefund', gesturesEnabled: false },
  },
  TappaymentDEarningActivity: {
    screen: TappaymentDEarningActivity,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  BidYourQuote: {
    screen: BidYourQuote,
    navigationOptions: { header: null, title: 'BidYourQuote', gesturesEnabled: false },
  },
  TermsAndConditionStylistPricing: {
    screen: TermsAndConditionStylistPricing,
    navigationOptions: { header: null, title: 'TermsAndConditionStylistPricing', gesturesEnabled: false },
  },
  TappaymentSellerEarning: {
    screen: TappaymentSellerEarning,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  CustomformBuyerfavStylist: {
    screen: CustomformBuyerfavStylist,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  MyBids: {
    screen: MyBids,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  NotificationsBuyer: {
    screen: NotificationsBuyer,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  RejectOrderStatus: {
    screen: RejectOrderStatus,
    navigationOptions: { header: null, title: '', },
  },
  TrackReturn: {
    screen: TrackReturn,
    navigationOptions: { header: null, title: '' },
  },
  AnalyticsInsightsSeller: {
    screen: AnalyticsInsightsSeller,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AnalyticsSalesRevenueSeller: {
    screen: AnalyticsSalesRevenueSeller,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AnalyticsSalesGrowthReportSeller: {
    screen: AnalyticsSalesGrowthReportSeller,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AnalyticsSelectStore: {
    screen: AnalyticsSelectStore,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AnalyticsSelectProduct: {
    screen: AnalyticsSelectProduct,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  TermsAndConditionsPrivacy: {
    screen: TermsAndConditionsPrivacy,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  AnalyticsSalesVolume: {
    screen: AnalyticsSalesVolume,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  LoyaltyPoint: {
    screen: LoyaltyPoint,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
  LoyaltyRedeem: {
    screen: LoyaltyRedeem,
    navigationOptions: { header: null, title: '', gesturesEnabled: false },
  },
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [loading, setLoading] = useState(false);

const {
  sendBlockMessage,
} = useRunEngine();
const navRef: any = useRef()
const [appState, setAppState] = useState(AppState.currentState);

useEffect(() => {
  const handleAppStateChange = async(nextAppState) => {
    console.log('App State changed to:', nextAppState);
    await setStorageData('Appstate',JSON.stringify(nextAppState))
    setAppState(nextAppState);
  };

  // Add an event listener for app state changes
  const subscription = AppState.addEventListener('change', handleAppStateChange);

  const handleDeepLink = async (event: any) => {
    if (event?.url) {
      const navigation = navRef?.current?._navigation;
      const props = { ...navRef, navigation: navigation };
      const url = await parseDeepLink(event.url);
      
      const AppstateData =  await getStorageData('Appstate',true)

      if(AppstateData==='background'){
        const message: Message = new Message(
          getName(MessageEnum.NavigationProductDetailsMessage)
        );
        message.addData(getName(MessageEnum.productIDMessage), url.id);
        message.addData(getName(MessageEnum.ShowByStoreId), false);
        message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        message.addData(getName(MessageEnum.NavigationPropsMessage), props);
        const raiseMessage: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), {
          cid: url.id,
          forScreenData: "ContentManagementList",
        });
        message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
            sendBlockMessage(message);
        this.send(message);
    return true;
      }else{
        await setStorageData('DeepLinkingNavigation',JSON.stringify(url))
      }   
    }
  };
  const parseDeepLink = (url: string) => {
    let screenName = '';
    let id = '';

    // Check if the URL starts with 'FashionAggregator://'
    if (url.startsWith('fashionaggregator://')) {
      const [, path] = url.split('://');
      [screenName, id] = path.split('/');
    }
    // Check if the URL starts with 'https://fashionaggregator/'
    else if (url.startsWith('https://fashionaggregator/')) {
      const path = url.replace('https://fashionaggregator/', '');
      [screenName, id] = path.split('/');
    }

    return { screenName, id };
};
  Linking.addEventListener('url', handleDeepLink);
  (async () => {
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      handleDeepLink({ url: initialUrl });
    }
  })();
  return () => {
    Linking.removeEventListener('url', handleDeepLink);
    subscription.remove();
  };
}, []);

  const handleChangeLanguage = async () => {
    let lang = await getStorageData('FA_LANGUAGE_ST')
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    handleChangeLanguage()
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Unsubscribe on cleanup
    return () => {
      unsubscribe();
    }
  }, [])

  const onRetry = () => {
    setLoading(true)
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      setLoading(false)
    });
  };
  return (
   isConnected == false ? 
    <InternetStatus onRetry={onRetry} isLoading={loading}/>
    :
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={'#fff'}
        hidden={true}
        translucent={false}
        networkActivityIndicatorVisible={false}
      />
      <HomeStack ref={navRef} /> 
      <FlashMessage
        position="top"
        hideStatusBar={false}
        duration={3000}
        hideOnPress={true}
        style={{
          backgroundColor: '#CCBEB1',
          borderRadius: 26,
          marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
          alignSelf: 'center',
          justifyContent: 'center',
          width: '90%',
        }}
        textStyle={{ color: '#ffffff' }}
        titleStyle={{
          textAlign: 'center',

          color: '#ffffff',
          fontSize: (windowWidth * 4.5) / 100,
          fontFamily: 'Lato-Bold',
        }}
      />
      <CustomAlert />
    </View>
  );
}
const styles = StyleSheet.create({
  activeTabText: {
    fontSize: 12,
    color: '#375280',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    paddingBottom: Platform.OS === 'ios' ? windowWidth*8/100:12,
  },
  inactiveTabText: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    paddingBottom: Platform.OS === 'ios' ? windowWidth*8/100:12,
  },
  icon: {
    height: 24,
    width: 24,
    margin: 0,
    padding: 0,
    resizeMode: 'contain',
  },
  pfpIcon: {
    height: 26,
    width: 26,
  },
});