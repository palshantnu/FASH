export interface MobileLoginSuccessResponse {
  data: {
    id: string;
    type: string;
  };
  meta: {
    token: string;
    account: Account;
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
  date_of_birth: string;
  age: null;
  stripe_id: null;
  stripe_subscription_id: null;
  stripe_subscription_date: null;
  role: string;
  full_name: string;
  is_verified: null;
  share_token: null;
  approve_status: string;
  seller_status: string;
}
