import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import StylistDashboardWeb from "../../blocks/dashboard/src/StylistDashboard.web";
import DashboardWeb from "../../blocks/dashboard/src/Dashboard.web";
import StylistCreateProfileWeb from "../../blocks/customform/src/StylistCreateProfile.web";
import StylistVerificationWeb from "../../blocks/customform/src/StylistVerification.web";
import StylistConfirmationWeb from "../../blocks/customform/src/StylistConfirmation.web";
import NotificationsBuyerWeb from "../../blocks/notifications/src/NotificationsBuyer.web";
import AnalyticsInsightsSellerWeb from "../../blocks/analytics/src/AnalyticsInsightsSeller.web";


import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import PhoneVerificationAdapter from "../../blocks/adapters/src/PhoneVerificationAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import MobilePhoneLogInAdapter from "../../blocks/adapters/src/MobilePhoneLogInAdapter";
import MobilePhoneToAdditionalDetailsAdapter from "../../blocks/adapters/src/MobilePhoneToAdditionalDetailsAdapter";
import SignupScreenAdapter from "../../blocks/adapters/src/SignupScreenAdapter"
import ResetPasswordAdapter from "../../blocks/adapters/src/ResetPasswordAdapter"
import CatalogueAdapter from "../../blocks/adapters/src/CatalogueAdapter";
import CategoriesAdapter from "../../blocks/adapters/src/CategoriesAdapter";
import ContactUsSupportAdapter from "../../blocks/adapters/src/ContactUsSupportAdapter";
import ContactUsAddContactAdapter from "../../blocks/adapters/src/ContactUsAddContactAdapter";
import CategoriesSubCateAdapter from "../../blocks/adapters/src/CategoriesSubCateAdapter";
import AddressesAdapter from "../../blocks/adapters/src/AddressAdapter"
import AddAddressAdapter from "../../blocks/adapters/src/AddAddressAdapter"
import LoginOptionsAdapter from "../../blocks/adapters/src/LoginOptionsAdapter";
import ProductDetailsAdapter from "../../blocks/adapters/src/ProductDetailsAdapter";
import StoreProfileAdapter from '../../blocks/adapters/src/StoreProfileAdapter'
import StoreProfileDetailsAdapter  from "../../blocks/adapters/src/StoreProfileDetailsAdapter";
import LandingPageAdapter from "../../blocks/adapters/src/LandingPageAdapter";
import CategoriesCatalogueAdapter from "../../blocks/adapters/src/CategoriesCatalogueAdapter";
import CustomformCreateStoreUploadAdapter from "../../blocks/adapters/src/CustomformCreateStoreUploadAdapter";
import CustomformCreateStoreAddressAdapter from "../../blocks/adapters/src/CustomformCreateStoreAddressAdapter";
import CustomformCreateStoreTimingAdapter from "../../blocks/adapters/src/CustomformCreateStoreTimingAdapter";
import SocialMediaAccountOtpVerificationAdapter from "../../blocks/adapters/src/SocialMediaAccountOtpVerificationAdapter";
import SocialMediaAccountPhoneScreenAdapter from "../../blocks/adapters/src/SocialMediaAccountPhoneScreenAdapter";
import ShoppingCartOrdersAdapter from "../../blocks/adapters/src/ShoppingCartOrdersAdapter";
import YetToBeDeveloepdAdapter from "../../blocks/adapters/src/YetToBeDeveloped";
import CustomformMapAdapter from "../../blocks/adapters/src/CustomformMapAdapter";
import CustomformStoreShowAdapter from "../../blocks/adapters/src/CustomformStoreShowAdapter";
import CatalogueSellerAdapter from "../../blocks/adapters/src/CatalogueSellerAdapter";
import CustomformCreateUploadDocumentAdapter from "../../blocks/adapters/src/CustomformCreateUploadDocumentAdapter";
import PairedProductsAdapter from "../../blocks/adapters/src/PairedProductsAdapter";
import VarientsAdapter from "../../blocks/adapters/src/VarientsAdapter";
import VarientsImageAdapter from "../../blocks/adapters/src/VarientsImageAdapter";
import CustomformConfirmationAdapter from "../../blocks/adapters/src/CustomformConfirmationAdapter";
import SellerDashboardAdapter from "../../blocks/adapters/src/SellerDashboardAdapter";
import TermsConditionsUsersAdapter from "../../blocks/adapters/src/TermsConditionsUsersAdapter";
import ReturnPolicyAdapter from "../../blocks/adapters/src/ReturnPolicyAdapter";
import SavedCardsAdapter from "../../blocks/adapters/src/SavedCardAdapters";
import ShippingPolicyAdapter from "../../blocks/adapters/src/ShippingPolicyAdapter";
import Customisableuserprofiles2FaqAdapter from "../../blocks/adapters/src/Customisableuserprofiles2FaqAdapter";
import TermsConditionsDetailAdapter from "../../blocks/adapters/src/TermsConditionsDetailAdapter";
import ContactUsAdapter from "../../blocks/adapters/src/ContactUsAdapter";
import ProfileScreenAdapter from "../../blocks/adapters/src/ProfileScreenAdapter";
import ProductdescriptionSellerAdapter from "../../blocks/adapters/src/ProductdescriptionSellerAdapter";
import Customisableuserprofiles2selleradminrequestAdapter from "../../blocks/adapters/src/Customisableuserprofiles2selleradminrequestAdapter";
import MyStoreDetailsAdapter from "../../blocks/adapters/src/MyStoreDetailsAdapter";
import AssignstoreAdapter from "../../blocks/adapters/src/AssignstoreAdapter";
import Customisableuserprofiles2sellerprofilenotificationAdapter from "../../blocks/adapters/src/Customisableuserprofiles2sellerprofilenotificationAdapter";
import InventoryManagementAdapter from "../../blocks/adapters/src/InventoryManagementAdapter";
import UpdateInventoryAdapter from "../../blocks/adapters/src/UpdateInventoryAdapter";
import UpdateInventoryFilterAdapter from "../../blocks/adapters/src/UpdateInventoryFilterAdapter";
import SetPricesAdapter from "../../blocks/adapters/src/SetPricesAdapter";
import CustomformCreateManageTimingAdapter from "../../blocks/adapters/src/CustomformCreateManageTimingAdapter";
import EditProductAdapter from "../../blocks/adapters/src/EditProductAdapter";
import CustomformEditStoreDetailsAdapter from "../../blocks/adapters/src/CustomformEditStoreDetailsAdapter";
import NavigationMenuAdapter from "../../blocks/adapters/src/NavigationMenuAdapter";
import Settings2LanguageAdapter from "../../blocks/adapters/src/Settings2LanguageAdapter";
import OrderManagementBuyerOrderViewAdapter from "../../blocks/adapters/src/OrderManagementBuyerOrderViewAdapter";
import OrderManagementBuyerAllOrderAdapter from "../../blocks/adapters/src/OrderManagementBuyerAllOrderAdapter";
import PairItWithAdapter from "../../blocks/adapters/src/PairItWithAdapter";
import PairItWithDescriptionAdapter from "../../blocks/adapters/src/PairItWithDescriptionAdapter";
import DashboardSelectStoreAdapter from "../../blocks/adapters/src/DashboardSelectStoreAdapter";
import DashboardSpecificStoreAdapter from "../../blocks/adapters/src/DashboardSpecificStoreAdapter";
import CheckoutAdapter from "../../blocks/adapters/src/CheckoutAdapter";
import AddCardAdapter from "../../blocks/adapters/src/AddCardAdapter";
import PaymentMethodsAdapter from "../../blocks/adapters/src/PaymentMethodsAdapter";
import PaymentSuccessAdapter from "../../blocks/adapters/src/PaymentSuccessAdapter";
import AcceptOrderAdapter from "../../blocks/adapters/src/AcceptOrderAdapter";
import RejectOrderAdapter from "../../blocks/adapters/src/RejectOrderAdapter";
import TapPaymentsAdapter from "../../blocks/adapters/src/TapPaymentsAdapter";
import OrderManagementBuyerSummaryAdapter from "../../blocks/adapters/src/OrderManagementBuyerSummaryAdapter";
import OrderManagementBuyerOrderStatusAdapter from "../../blocks/adapters/src/OrderManagementBuyerOrderStatusAdapter";
import OrderManagementBuyerConfirmationAdapter from "../../blocks/adapters/src/OrderManagementBuyerConfirmationAdapter";
import OrderDetailsSellerAdapter from "../../blocks/adapters/src/OrderDetailsSellerAdapter";
import OrdersummaryAdapter from "../../blocks/adapters/src/OrdersummaryAdapter";
import CustomformDriverProfilePhotoAdapter from "../../blocks/adapters/src/CustomformDriverProfilePhotoAdapter";
import CustomformDriverDocumentUploadAdapter from "../../blocks/adapters/src/CustomformDriverDocumentUploadAdapter";
import LandingPageDriverAdapter from "../../blocks/adapters/src/LandingPageDriverAdapter";
import TapPaymentWebviewAdapter from "../../blocks/adapters/src/TapPaymentWebviewAdapter";
import DriverRegistrationTypeAdapter from "../../blocks/adapters/src/DriverRegTypeAdapter";
import SelectVehicleAdapter from "../../blocks/adapters/src/SelectVehicleAdapter";
import SearchCityAdapter from "../../blocks/adapters/src/SearchCityAdapter";
import DriverPersonalDetailsAdapter from "../../blocks/adapters/src/DriverPersonalDetailsAdapter";
import CustomformDriverDocumentAdapter from "../../blocks/adapters/src/CustomformDriverDocumentAdapter";
import TermsConditionsDriverPolicyAdapter from "../../blocks/adapters/src/TermsConditionsDriverPolicyAdapter";
import ContactUsSupportDriverAdapter from "../../blocks/adapters/src/ContactUsSupportDriverAdapter";
import ContactUsAddContactDriverAdapter from "../../blocks/adapters/src/ContactUsAddContactDriverAdapter";
import ContactusDriverAdapter from "../../blocks/adapters/src/ContactusDriverAdapter";
import DriverNewOrderAdapter from "../../blocks/adapters/src/DriverNewOrderAdapter";
import CustomformAddVehicleAdapter from "../../blocks/adapters/src/CustomformAddVehicleAdapter";
import CustomformDriverShowVehicleAdapter from "../../blocks/adapters/src/CustomformDriverShowVehicleAdapter";
import CatalogueFilterAdapter from "../../blocks/adapters/src/CatalogueFilterAdapter";
import StylistCreateProfileAdapter from "../../blocks/adapters/src/StylistCreateProfileAdapter";
import StylistVerificationAdapter from "../../blocks/adapters/src/StylistVerificationAdapter";
import StylistConfirmationAdapter from "../../blocks/adapters/src/StylistConfirmationAdapter";
import StylistDashboardAdapter from "../../blocks/adapters/src/StylistDashboardAdapter";
import AccountActivationAdapter from "../../blocks/adapters/src/AccountActivationAdapter";
import CustomformDriverAgencyDocumentAdapter from "../../blocks/adapters/src/CustomformDriverAgencyDocumentAdapter";
import CustomformDriverAgencyInfoAdapter from "../../blocks/adapters/src/CustomformDriverAgencyInfoAdapter";
import CustomformDriverCivilPassportAdapter from "../../blocks/adapters/src/CustomformDriverCivilPassportAdapter";
import NotificationsettingsStylistAdapter from "../../blocks/adapters/src/NotificationsettingsStylistAdapter";
import StylistEditProfileAdapter from "../../blocks/adapters/src/StylistEditProfileAdapter";
import CatalogueHomeSearchAdapter from "../../blocks/adapters/src/CatalogueHomeSearchAdapter";
import TappaymentsBuyerHistoryAdapter from "../../blocks/adapters/src/TappaymentsBuyerHistoryAdapter";
import TappaymentsPaymentDetailAdapter from "../../blocks/adapters/src/TappaymentsPaymentDetailAdapter";
import AddressEditDriverAdapter from "../../blocks/adapters/src/AddressEditDriverAdapter";
import TappaymentsAddBankAdapter from "../../blocks/adapters/src/TappaymentsAddBankAdapter";
import CustomformSourceProductAdapter from "../../blocks/adapters/src/CustomformCreateSourceProductAdapter";
import AnalyticsDriverEarningAdapter from "../../blocks/adapters/src/AnalyticsDriverEarningAdapter";
import TappaymentsDriverBankDetailAdapter from "../../blocks/adapters/src/TappaymentsDriverBankDetailAdapter";
import TappaymentDEarningActivityAdapter from "../../blocks/adapters/src/TappaymentDEarningActivityAdapter";
import SeeAllProductSourcingAdapter from "../../blocks/adapters/src/SeeAllProductSourcingAdapter";
import StylistViewProductSourcingPageAdapter from "../../blocks/adapters/src/StylistViewProductSourcingPageAdapter";
import RefundmanagementAdapter from "../../blocks/adapters/src/RefundmanagementAdapter";
import BuyerProductSourcingViewAdapter from "../../blocks/adapters/src/BuyerProductSourcingViewAdapter";
import BidYourQuoteAdapter from "../../blocks/adapters/src/BidYourQuoteAdapter";
import TappaymentSellerEarningAdapter from "../../blocks/adapters/src/TappaymentSellerEarningAdapter";
import CustomformBuyerfavStylistAdapter from "../../blocks/adapters/src/CustomformBuyerfavStylistAdapter";
import MyBidsAdapter from "../../blocks/adapters/src/MyBidsAdapter";
import StylistDetailedProfileAdapter from "../../blocks/adapters/src/StylistDetailedProfileAdapter";
import Settings2Adapter from "../../blocks/adapters/src/Settings2Adapter";
import NotificationsBuyerAdapter from "../../blocks/adapters/src/NotificationsBuyerAdapter";
import SeeAllStylistPortfolioImageAdapter from "../../blocks/adapters/src/SeeAllStylistPortfolioImageAdapter";
import RequestCallAdapter from "../../blocks/adapters/src/RequestCallAdapter";
import StylistPortfolioSingleImageAdapter from "../../blocks/adapters/src/StylistPortfolioSingleImageAdapter";
import ProductByStylistAdapter from "../../blocks/adapters/src/ProductByStylistAdapter";
import PricingAdapter from "../../blocks/adapters/src/PricingAdapter";
import InventoryFilterAdapter from "../../blocks/adapters/src/InventoryFilterAdapter";
import TermsAndConditionStylistPricingAdapter from "../../blocks/adapters/src/TermsAndConditionStylistPricingAdapter";
import OrderReturnModeAdapter from "../../blocks/adapters/src/OrderReturnModeAdapter";
import OrderReturnModeConfirmAdapter from "../../blocks/adapters/src/OrderReturnModeConfirmAdapter";
import OrderReturnConfirmAdapter from "../../blocks/adapters/src/OrderReturnConfirmAdapter";
import AnalyticsInsightsSellerAdapter from "../../blocks/adapters/src/AnalyticsInsightsSellerAdapter";
import AnalyticsSelectStoreAdapter from "../../blocks/adapters/src/AnalyticsSelectStoreAdapter";
import AnalyticsSalesRevenueSellerAdapter from "../../blocks/adapters/src/AnalyticsSalesRevenueSellerAdapter";
import AnalyticsSalesGrowthReportSellerAdapter from "../../blocks/adapters/src/AnalyticsSalesGrowthReportSellerAdapter";
import AnalyticsSelectProductAdapter from "../../blocks/adapters/src/AnalyticsSelectProductAdapter";
import TermsAndConditionsPrivacyAdapter from "../../blocks/adapters/src/TermsAndConditionsPrivacyAdapter";
import TapWebViewForStylistPlanAdapter from "../../blocks/adapters/src/TapWebViewForStylistPlanAdapter";
import AnalyticsSalesVolumeAdapter from "../../blocks/adapters/src/AnalyticsSalesVolumeAdapter";
import Wishlist2Adapter from "../../blocks/adapters/src/Wishlist2Adapter";
import ExploreWishlistAdapter from "../../blocks/adapters/src/ExploreWishlistAdapter";
import MyClientsDetailsAdapter from "../../blocks/adapters/src/MyClientsDetailsAdapter";
import PhotoLibraryAdapter from "../../blocks/adapters/src/PhotoLibraryAdapter";
import ProductSourcingOrdersAdapter from "../../blocks/adapters/src/ProductSourcingOrdersAdapter";
import VirtualAdapter from "../../blocks/adapters/src/VirtualAdapter";
import LoyaltyRedeemAdapter from "../../blocks/adapters/src/LoyaltyRedeemAdapter";
import LoyaltyConfirmationAdapter from "../../blocks/adapters/src/LoyaltyConfirmationAdapter";
import LoyaltyPointAdapter from "../../blocks/adapters/src/LoyaltyPointAdapter";
import ChatCartAdapter from "../../blocks/adapters/src/ChatCartAdapter";
import DetailedProductSourcingOrderAdapter from "../../blocks/adapters/src/DetailedProductSourcingOrderAdapter";
import ProductSourcingOrderDetailsAdapter from "../../blocks/adapters/src/ProductSourcingOrderDetailsAdapter";
import ChatCheckoutAdapter from "../../blocks/adapters/src/ChatCheckoutAdapter";
import TapPaymentsViewAdapter from "../../blocks/adapters/src/TapPaymentsViewAdapter";

//Assembler generated adapters start
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const mobilePhoneLogInAdapter = new MobilePhoneLogInAdapter();
const mobilePhoneToAdditionalDetailsAdapter = new MobilePhoneToAdditionalDetailsAdapter();
const signupAdapter = new SignupScreenAdapter()
const resetPasswordFAdapter = new ResetPasswordAdapter()
const catelogueAdapter = new CatalogueAdapter();
const productDetailsAdapter = new ProductDetailsAdapter();
const storeProfileAdapter = new StoreProfileAdapter();
const storeProfileDetailsAdapter = new StoreProfileDetailsAdapter();
const varientsImageAdapter=new VarientsImageAdapter();
const virtualAdapter = new VirtualAdapter()
//Assembler generated adapters end


const categoriesAdapter = new CategoriesAdapter();
const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
const phoneScreenVerificationAdapter = new PhoneVerificationAdapter();
const contactUsSupportAdapter = new ContactUsSupportAdapter();
const contactUsAddContactAdapter = new ContactUsAddContactAdapter();
const categoriesSubCateAdapter = new CategoriesSubCateAdapter();
const addressesAdapter = new AddressesAdapter();
const addAddressAdapter = new AddAddressAdapter()
const tapPaymentsViewAdapter = new TapPaymentsViewAdapter();
const loginOptionsAdater = new LoginOptionsAdapter();
const landingPageAdapter = new LandingPageAdapter();
const categoriesCatalogueAdapter = new CategoriesCatalogueAdapter();
const customformCreateStoreUploadAdapter = new CustomformCreateStoreUploadAdapter();
const customformCreateStoreAddressAdapter = new CustomformCreateStoreAddressAdapter();
const customformCreateStoreTimingAdapter = new CustomformCreateStoreTimingAdapter();
const socialMediaAccountOtpVerificationAdapter = new SocialMediaAccountOtpVerificationAdapter();
const socialMediaAccountPhoneScreenAdapter = new SocialMediaAccountPhoneScreenAdapter();
const shoppingCartOrdersAdapter = new ShoppingCartOrdersAdapter();
const yetToBeDevelopedAdapter = new YetToBeDeveloepdAdapter();
const customformMapAdapter = new CustomformMapAdapter();
const customformStoreShowAdapter = new CustomformStoreShowAdapter();
const catalogueSellerAdapter = new CatalogueSellerAdapter();
const customformCreateUploadDocumentAdapter = new CustomformCreateUploadDocumentAdapter();
const pairedProductsAdapter = new PairedProductsAdapter();
const varientsAdapter=new VarientsAdapter();
const customformConfirmationAdapter = new CustomformConfirmationAdapter();
const sellerDashboardAdapter = new SellerDashboardAdapter();
const termsConditionsUsersAdapter = new TermsConditionsUsersAdapter();
const savedCardsAdapter = new SavedCardsAdapter();
const returnPolicyAdapter = new ReturnPolicyAdapter();
const shippingPolicyAdapter = new ShippingPolicyAdapter();
const customisableuserprofiles2FaqAdapter = new Customisableuserprofiles2FaqAdapter();
const termsConditionsDetailAdapter = new TermsConditionsDetailAdapter();
const contactUsAdapter = new ContactUsAdapter();
const profileScreenAdapter = new ProfileScreenAdapter();
const productdescriptionSellerAdapter = new ProductdescriptionSellerAdapter();
const customisableuserprofiles2selleradminrequestAdapter = new Customisableuserprofiles2selleradminrequestAdapter();
const myStoreDetailsAdapter = new MyStoreDetailsAdapter();
const assignStoreAdapter = new AssignstoreAdapter();
const customisableuserprofiles2sellerprofilenotificationAdapter = new Customisableuserprofiles2sellerprofilenotificationAdapter();
const inventorymanagement = new InventoryManagementAdapter();
const updateInventoryAdapter = new UpdateInventoryAdapter();
const updateInventoryFilterAdapter = new UpdateInventoryFilterAdapter();
const setPricesAdapter = new SetPricesAdapter();
const customformCreateManageTimingAdapter = new CustomformCreateManageTimingAdapter();
const editProductAdapter= new EditProductAdapter;
const customformEditStoreDetailsAdapter = new CustomformEditStoreDetailsAdapter();
const navigationMenuAdapter= new NavigationMenuAdapter()
const chatCartAdapter = new ChatCartAdapter();
const chatCheckAdapter = new ChatCheckoutAdapter();
const settings2LanguageAdapter = new Settings2LanguageAdapter();
const orderManagementBuyerOrderViewAdapter = new OrderManagementBuyerOrderViewAdapter();
const orderManagementBuyerAllOrderAdapter = new OrderManagementBuyerAllOrderAdapter();
const pairItWithAdapter= new PairItWithAdapter();
const pairItWithDescriptionAdapter=new PairItWithDescriptionAdapter()
const dashboardSelectStoreAdapter= new DashboardSelectStoreAdapter();
const dashboardSpecificStoreAdapter= new DashboardSpecificStoreAdapter()
const checkoutAdapter = new CheckoutAdapter();
const addCardAdapter = new AddCardAdapter();
const paymentMethodsAdapter = new PaymentMethodsAdapter();
const paymentSuccessAdapter = new PaymentSuccessAdapter();
const acceptOrderAdapter=new AcceptOrderAdapter();
const rejectOrderAdapter=new RejectOrderAdapter();
const tapPaymentsAdapter = new TapPaymentsAdapter();
const orderManagementBuyerSummaryAdapter = new OrderManagementBuyerSummaryAdapter();
const orderManagementBuyerOrderStatusAdapter = new OrderManagementBuyerOrderStatusAdapter();
const orderManagementBuyerConfirmationAdapter = new OrderManagementBuyerConfirmationAdapter();
const orderDetailsSellerAdapter=new OrderDetailsSellerAdapter();
const ordersummaryAdapter=new OrdersummaryAdapter();
const customformDriverProfilePhotoAdapter=new CustomformDriverProfilePhotoAdapter();
const driverNewOrderAdapter = new DriverNewOrderAdapter();
const customformDriverDocumentUploadAdapter=new CustomformDriverDocumentUploadAdapter();
const landingPageDriverAdapter=new LandingPageDriverAdapter();
const tapWebviewAdapter = new TapPaymentWebviewAdapter();
const driverRegTypeAdapter = new DriverRegistrationTypeAdapter();
const selectVehicleAdapter = new SelectVehicleAdapter();
const searchCityAdapter = new SearchCityAdapter();
const driverPersonalDetailsAdapter = new DriverPersonalDetailsAdapter();
const driverDocumentAdapter = new CustomformDriverDocumentAdapter();
const termsConditionsDriverPolicyAdapter = new TermsConditionsDriverPolicyAdapter();
const contactUsSupportDriverAdapter = new ContactUsSupportDriverAdapter();
const contactUsAddContactDriverAdapter = new ContactUsAddContactDriverAdapter();
const contactusDriverAdapter = new ContactusDriverAdapter();
const customformAddVehicleAdapter = new CustomformAddVehicleAdapter();
const customformDriverShowVehicleAdapter = new CustomformDriverShowVehicleAdapter();
const catalogueFilterAdapter = new CatalogueFilterAdapter();
const accountActivation=new AccountActivationAdapter();
const customformDriverAgencyDocumentAdapter=new CustomformDriverAgencyDocumentAdapter();
const customformDriverAgencyInfoAdapter=new CustomformDriverAgencyInfoAdapter();
const customformDriverCivilPassportAdapter = new CustomformDriverCivilPassportAdapter();
const stylistCreateProfileAdapter = new StylistCreateProfileAdapter();
const stylistVerificationAdapter = new StylistVerificationAdapter();
const stylistDashboardAdapter = new StylistDashboardAdapter();
const stylistConfirmationAdapter = new StylistConfirmationAdapter();
const notificationsettingsStylistAdapter = new NotificationsettingsStylistAdapter();
const stylistEditProfileAdapter = new StylistEditProfileAdapter();
const refundmanagementAdapter = new RefundmanagementAdapter();
const catalogueHomeSearchAdapter = new CatalogueHomeSearchAdapter();
const tappaymentsBuyerHistoryAdapter = new TappaymentsBuyerHistoryAdapter();
const tappaymentsPaymentDetailAdapter = new TappaymentsPaymentDetailAdapter();
const addressEditDriverAdapter = new AddressEditDriverAdapter();
const tappaymentsAddBankAdapter = new TappaymentsAddBankAdapter();
const customformSourceProductAdapter = new CustomformSourceProductAdapter();
const analyticsDriverEarningAdapter = new AnalyticsDriverEarningAdapter();
const tappaymentsDriverBankDetailAdapter = new TappaymentsDriverBankDetailAdapter();
const tappaymentDEarningActivityAdapter = new TappaymentDEarningActivityAdapter();
const seeAllProductSourcingAdapter = new SeeAllProductSourcingAdapter();
const stylistViewProductSourcingPageAdapter = new StylistViewProductSourcingPageAdapter();
const buyerProductSourcingViewAdapter = new BuyerProductSourcingViewAdapter();
const bidYourQuoteAdapter = new BidYourQuoteAdapter();
const tappaymentSellerEarningAdapter = new TappaymentSellerEarningAdapter();
const customformBuyerfavStylistAdapter = new CustomformBuyerfavStylistAdapter();
const myBidsAdapter = new MyBidsAdapter();
const stylistDetailedProfileAdapter = new StylistDetailedProfileAdapter();
const settings2Adapter = new Settings2Adapter();
const notificationsBuyerAdapter = new NotificationsBuyerAdapter();
const requestCallAdapter = new RequestCallAdapter();
const seeAllStylistPortfolioImageAdapter = new SeeAllStylistPortfolioImageAdapter();
const stylistPortfolioSingleImageAdapter = new StylistPortfolioSingleImageAdapter();
const productByStylistAdapter = new ProductByStylistAdapter();
const pricingAdapter = new PricingAdapter();
const termsAndConditionStylistPricingAdapter = new TermsAndConditionStylistPricingAdapter();
const orderReturnModeConfirmAdapter=new OrderReturnModeConfirmAdapter()
const orderReturnConfirmAdapter=new OrderReturnConfirmAdapter()
const orderReturnModeAdapter=new OrderReturnModeAdapter()
const analyticsInsightsSellerAdapter = new AnalyticsInsightsSellerAdapter();
const inventoryFilterAdapter = new InventoryFilterAdapter();
const analyticsSelectStoreAdapter = new AnalyticsSelectStoreAdapter();
const analyticsSalesRevenueSellerAdapter = new AnalyticsSalesRevenueSellerAdapter();
const analyticsSalesGrowthReportSellerAdapter = new AnalyticsSalesGrowthReportSellerAdapter();
const analyticsSelectProductAdapter = new AnalyticsSelectProductAdapter();
const termsAndConditionsPrivacyAdapter = new TermsAndConditionsPrivacyAdapter();
const tapWebViewForStylistPlanAdapter = new TapWebViewForStylistPlanAdapter();
const analyticsSalesVolumeAdapter = new AnalyticsSalesVolumeAdapter();
const wishlist2Adapter=new Wishlist2Adapter()
const exploreWishlistAdapter=new ExploreWishlistAdapter()
const myClientsDetailsAdapter=new MyClientsDetailsAdapter()
const productSourcingOrdersAdapter = new ProductSourcingOrdersAdapter();
const photoLibraryAdapter = new PhotoLibraryAdapter()
const loyaltyRedeemAdapter = new LoyaltyRedeemAdapter()
const loyaltyConfirmationAdapter = new LoyaltyConfirmationAdapter()
const loyaltyPointAdapter = new LoyaltyPointAdapter()
const detailedProductSourcingOrderAdapter = new DetailedProductSourcingOrderAdapter();
const productSourcingOrderDetailsAdapter = new ProductSourcingOrderDetailsAdapter()
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to FashionAggregator!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'PhotoLibrary'}  onPress={() => navigation.navigate("PhotoLibrary")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Upvotedownvote'}  onPress={() => navigation.navigate("Upvotedownvote")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'BulkUploading'}  onPress={() => navigation.navigate("BulkUploading")} />
<CustomTextItem content={'Tasks'}  onPress={() => navigation.navigate("Tasks")} />
<CustomTextItem content={'AccountGroups'}  onPress={() => navigation.navigate("AccountGroups")} />
<CustomTextItem content={'AdvancedSearch'}  onPress={() => navigation.navigate("AdvancedSearch")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'Contactus'}  onPress={() => navigation.navigate("Contactus")} />
<CustomTextItem content={'PhoneNumberInput'}  onPress={() => navigation.navigate("PhoneNumberInput")} />
<CustomTextItem content={'Reviews'}  onPress={() => navigation.navigate("Reviews")} />
<CustomTextItem content={'promocodes'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ShoppingCartOrders'}  onPress={() => navigation.navigate("ShoppingCartOrders")} />
<CustomTextItem content={'OrderManagement'}  onPress={() => navigation.navigate("OrderManagement")} />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'VisualAnalytics'}  onPress={() => navigation.navigate("VisualAnalytics")} />
<CustomTextItem content={'ApiIntegration'}  onPress={() => navigation.navigate("ApiIntegration")} />
<CustomTextItem content={'Addresses'}  onPress={() => navigation.navigate("Addresses")} />
<CustomTextItem content={'Customform'}  onPress={() => navigation.navigate("Customform")} />
<CustomTextItem content={'LandingPage'}  onPress={() => navigation.navigate("LandingPage")} />
<CustomTextItem content={'NavigationMenu'}  onPress={() => navigation.navigate("NavigationMenu")} />
<CustomTextItem content={'StripePayments'}  onPress={() => navigation.navigate("StripePayments")} />
<CustomTextItem content={'Chat'}  onPress={() => navigation.navigate("Chat")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'Dashboard'}  onPress={() => navigation.navigate("Dashboard")} />
<CustomTextItem content={'MobileAccountLoginBlock'}  onPress={() => navigation.navigate("MobileAccountLoginBlock")} />
<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'Scheduling'}  onPress={() => navigation.navigate("Scheduling")} />
<CustomTextItem content={'Splashscreen'}  onPress={() => navigation.navigate("Splashscreen")} />
<CustomTextItem content={'Notificationsettings'}  onPress={() => navigation.navigate("Notificationsettings")} />
<CustomTextItem content={'Notifications'}  onPress={() => navigation.navigate("Notifications")} />
<CustomTextItem content={'TermsConditions'}  onPress={() => navigation.navigate("TermsConditions")} />
<CustomTextItem content={'Savedcards'}  onPress={() => navigation.navigate("Savedcards")} />
<CustomTextItem content={'Shippingaddressvalidation2'}  onPress={() => navigation.navigate("Shippingaddressvalidation2")} />
<CustomTextItem content={'Refundmanagement'}  onPress={() => navigation.navigate("Refundmanagement")} />
<CustomTextItem content={'Applepayintegration2'}  onPress={() => navigation.navigate("Applepayintegration2")} />
<CustomTextItem content={'Loyaltysystem'}  onPress={() => navigation.navigate("Loyaltysystem")} />
<CustomTextItem content={'Rolesandpermissions'}  onPress={() => navigation.navigate("Rolesandpermissions")} />
<CustomTextItem content={'Uploadmedia3'}  onPress={() => navigation.navigate("Uploadmedia3")} />
<CustomTextItem content={'Productdescription3'}  onPress={() => navigation.navigate("Productdescription3")} />
<CustomTextItem content={'Wishlist2'}  onPress={() => navigation.navigate("Wishlist2")} />
<CustomTextItem content={'Deliveryestimator'}  onPress={() => navigation.navigate("Deliveryestimator")} />
<CustomTextItem content={'Googleadsenseintegration'}  onPress={() => navigation.navigate("Googleadsenseintegration")} />
<CustomTextItem content={'Expressdelivery'}  onPress={() => navigation.navigate("Expressdelivery")} />
<CustomTextItem content={'Trending2'}  onPress={() => navigation.navigate("Trending2")} />
<CustomTextItem content={'Storecredits2'}  onPress={() => navigation.navigate("Storecredits2")} />
<CustomTextItem content={'Admanager'}  onPress={() => navigation.navigate("Admanager")} />
<CustomTextItem content={'Creditdebitcardpayments'}  onPress={() => navigation.navigate("Creditdebitcardpayments")} />
<CustomTextItem content={'Inapppurchasing'}  onPress={() => navigation.navigate("Inapppurchasing")} />
<CustomTextItem content={'Collecttransactionfees'}  onPress={() => navigation.navigate("Collecttransactionfees")} />
<CustomTextItem content={'Contentmanagement3'}  onPress={() => navigation.navigate("Contentmanagement3")} />
<CustomTextItem content={'Linkshare'}  onPress={() => navigation.navigate("Linkshare")} />
<CustomTextItem content={'Emailnotifications2'}  onPress={() => navigation.navigate("Emailnotifications2")} />
<CustomTextItem content={'Applelogin2'}  onPress={() => navigation.navigate("Applelogin2")} />
<CustomTextItem content={'Inventorymanagement2'}  onPress={() => navigation.navigate("Inventorymanagement2")} />
<CustomTextItem content={'Customisableuserprofiles2'}  onPress={() => navigation.navigate("Customisableuserprofiles2")} />
<CustomTextItem content={'Adminconsole2'}  onPress={() => navigation.navigate("Adminconsole2")} />
<CustomTextItem content={'Settings2'}  onPress={() => navigation.navigate("Settings2")} />
<CustomTextItem content={'Cfchatbot2'}  onPress={() => navigation.navigate("Cfchatbot2")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;