export interface SuccessfulLoginResponse {
  meta: {
    token: string;
    refresh_token: string;
    id: number;
    account: Account;
    custom_account: {
      account_type: "Agency" | "Driver";
    };
  };
}

export interface Account {
  id: number;
  first_name: null;
  last_name: null;
  full_phone_number: string;
  country_code: number;
  phone_number: number;
  email: string;
  activated: boolean;
  device_id: null;
  unique_auth_id: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  user_name: null;
  platform: null;
  user_type: null;
  app_language_id: null;
  last_visit_at: null;
  is_blacklisted: boolean;
  suspend_until: null;
  status: string;
  gender: null;
  date_of_birth: null;
  age: null;
  stripe_id: null;
  stripe_subscription_id: null;
  stripe_subscription_date: null;
  role: string;
  full_name: string;
  is_verified: null;
  share_token: null;
  approve_status: string;
  seller_status:
    | "Signup"
    | "Account_activation"
    | "Store_created"
    | "Document_uploaded";
  driver_redirect_flag:
    | "driver_document_submission_page"
    | "driver_landing_page";
  stylist_redirect_flag:
    | "stylist_document_submission_page"
    | "stylist_landing_page"
    | "stylist_confirmation_page";
}

export interface SocialLoginResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      first_name: null;
      last_name: null;
      full_phone_number: null;
      country_code: null;
      phone_number: null;
      email: string;
      activated: boolean;
    };
  };
  meta: {
    token: string;
  };
  errors?: Array<{
    first_name: null | string;
    last_name: null | string;
    full_phone_number: null | string;
    country_code: null | string;
    phone_number: null | string;
    email: string;
    activated: boolean;
    account_id: string;
  }>;
}
